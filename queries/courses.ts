
import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module.model";

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";
import { Lesson } from "@/model/lesson.model";

import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";
import mongoose from "mongoose";

// export async function getCourseList(): Promise<any[]> {
//      await dbConnect(); 
//   const courses = await Course.find({})
//     .select([
//       "title",
//       "subtitle",
//       "thumbnail",
//       "modules",
//       "price",
//       "category",
//       "instructor",
//     ])
//     .populate({
//       path: "category",
//       model: Category,
//     })
//     .populate({
//       path: "instructor",
//       model: User,
//     })
//     .populate({
//       path: "testimonials",
//       model: Testimonial,
//     })
//     .populate({
//       path: "modules",
//       model: Module,
//     })
//     .lean();

//   return replaceMongoIdInArray(courses);
// }
type CourseListFilter = {
  categories?: string[]; // e.g. ["development","design"] OR ["65f..."]
  price?: string[];      // ["free"] | ["paid"] | ["free","paid"]
  sort?: string;         // "price-asc" | "price-desc" | ""
  search?: string;       // text
};

function isObjectId(v: string) {
  return mongoose.Types.ObjectId.isValid(v);
}

export async function getCourseList(filter: CourseListFilter = {}): Promise<any[]> {
  await dbConnect();

  const categories = filter.categories ?? [];
  const price = filter.price ?? [];
  const sort = filter.sort ?? "";
  const search = (filter.search ?? "").trim();

  const query: any = {};

  // ✅ Search filter (title/subtitle)
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { subtitle: { $regex: search, $options: "i" } },
    ];
  }

  // ✅ Price filter (free/paid)
  // free => price == 0
  // paid => price > 0
  if (price.length > 0) {
    const wantsFree = price.includes("free");
    const wantsPaid = price.includes("paid");

    if (wantsFree && !wantsPaid) {
      query.price = 0;
    } else if (!wantsFree && wantsPaid) {
      query.price = { $gt: 0 };
    }
    // if both selected -> no price filter
  }

  // ✅ Category filter
  // UI sends slug like "development" OR could send ObjectId string
  if (categories.length > 0) {
    const objectIds = categories
      .filter((c) => isObjectId(c))
      .map((c) => new mongoose.Types.ObjectId(c));

    const slugs = categories.filter((c) => !isObjectId(c));

    let categoryIds: mongoose.Types.ObjectId[] = [...objectIds];

    if (slugs.length > 0) {
      // find categories by slug (or value) and map to _id
      const cats = await Category.find({
        $or: [{ slug: { $in: slugs } }, { title: { $in: slugs } }],
      })
        .select(["_id"])
        .lean();

      categoryIds.push(...cats.map((c: any) => c._id));
    }

    // apply if we found any ids
    if (categoryIds.length > 0) {
      query.category = { $in: categoryIds };
    }
  }

  // ✅ Sort
  const sortQuery: any = {};
  if (sort === "price-asc") sortQuery.price = 1;
  if (sort === "price-desc") sortQuery.price = -1;

  const courses = await Course.find(query)
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({ path: "category", model: Category })
    .populate({ path: "instructor", model: User })
    .populate({ path: "testimonials", model: Testimonial })
    .populate({ path: "modules", model: Module })
    .sort(sortQuery)
    .lean();

  return replaceMongoIdInArray(courses);

  }

export async function getCourseDetails(id: string): Promise<any> {
  // ✅ guard invalid id
  if (!id || id === "undefined" || !mongoose.Types.ObjectId.isValid(id)) {
    return null; // or throw new Error("Invalid course id");
  }

  const course = await Course.findById(id)
    .populate({ path: "category", model: Category })
    .populate({ path: "instructor", model: User })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: { path: "user", model: User },
    })
   .populate({
        path: "modules",
        model: Module,
        populate: {
            path: "lessonIds",
            model: Lesson
        }
    }).lean();

  if (!course) return null;

  return replaceMongoIdInObject(course);
}


export async function getCourseDetailsByInstructor(instructorId, expand) {
    const courses = await Course.find({instructor: instructorId}).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
          const enrollment = await getEnrollmentsForCourse(course._id.toString());
          return enrollment;
        })
    );

    const groupedByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);

    // const totalRevenue = courses.reduce((acc, course) => {
    //     return (acc + groupedByCourses[course._id].length * course.price)
    // }, 0);
const totalRevenue = courses.reduce((acc, course) => {
  const key = course._id.toString();                 // ✅ ensure string key
  const count = (groupedByCourses?.[key] ?? []).length; // ✅ fallback
  return acc + count * course.price;
}, 0);

    const totalEnrollments = enrollments.reduce(function (acc, obj) {
        return acc + obj.length;
    }, 0)

    const testimonials = await Promise.all(
        courses.map(async (course) => {
          const testimonial = await getTestimonialsForCourse(course._id.toString());
          return testimonial;
        })
      );

      const totalTestimonials = testimonials.flat();
      const avgRating = (totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0)) / totalTestimonials.length;

    //console.log("testimonials", totalTestimonials, avgRating);
    if (expand) {
        return {
            "courses": courses?.flat(),
            "enrollments": enrollments?.flat(),
            "reviews": totalTestimonials,
        }
    }
    return {
        "courses": courses.length,
        "enrollments": totalEnrollments,
        "reviews": totalTestimonials.length,
        "ratings": avgRating.toPrecision(2),
        "revenue": totalRevenue
    }
}


export async function create(courseData) {
    try{
        const course =  await Course.create(courseData);
        return JSON.parse(JSON.stringify(course));
    } catch(err) {
        throw new Error(err);
    }
}