// import { Course } from "@/model/course-model";
// import { Category } from "@/model/category-model";
// import { User } from "@/model/user-model";
// import { Testimonial } from "@/model/testimonial-model";
// import { Module } from "@/model/module.model";

// import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

// import { getEnrollmentsForCourse } from "./enrollments";
// import { getTestimonialsForCourse } from "./testimonials";

// export async function getCourseList() {
//     const courses = await Course.find({}).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor"]).populate({
//         path: "category",
//         model: Category
//     }).populate({
//         path: "instructor",
//         model: User
//     }).populate({
//         path: "testimonials",
//         model: Testimonial
//     }).populate({
//         path: "modules",
//         model: Module
//     }).lean();
//     return replaceMongoIdInArray(courses);
// }

// export async function getCourseDetails(id) {
//     const course = await Course.findById(id)
//     .populate({
//         path: "category",
//         model: Category
//     }).populate({
//         path: "instructor",
//         model: User
//     }).populate({
//         path: "testimonials",
//         model: Testimonial,
//         populate: {
//             path: "user",
//             model: User
//         }
//     }).populate({
//         path: "modules",
//         model: Module
//     }).lean();

//     return replaceMongoIdInObject(course)
// }

// export async function getCourseDetailsByInstructor(instructorId) {
//     const courses = await Course.find({instructor: instructorId}).lean();

//     const enrollments = await Promise.all(
//         courses.map(async (course) => {
//           const enrollment = await getEnrollmentsForCourse(course._id.toString());
//           return enrollment;
//         })
//     );

//     const totalEnrollments = enrollments.reduce((item, currentValue) => {
//         return item.length + currentValue.length;
//     });

//     const testimonials = await Promise.all(
//         courses.map(async (course) => {
//           const testimonial = await getTestimonialsForCourse(course._id.toString());
//           return testimonial;
//         })
//       );

//       const totalTestimonials = testimonials.flat();
//       const avgRating = (totalTestimonials.reduce(function (acc, obj) {
//             return acc + obj.rating;
//         }, 0)) / totalTestimonials.length;

//     //console.log("testimonials", totalTestimonials, avgRating);

//     return {
//         "courses": courses.length,
//         "enrollments": totalEnrollments,
//         "reviews": totalTestimonials.length,
//         "ratings": avgRating.toPrecision(2)
//     }
// }import { Course } from "@/model/course-model";
import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module.model";

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";

import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList(): Promise<any[]> {
     await dbConnect(); 
  const courses = await Course.find({})
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();

  return replaceMongoIdInArray(courses);
}


export async function getCourseDetails(id: string): Promise<any> {
  await dbConnect();

  // Guard: invalid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
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
    .populate({ path: "modules", model: Module })
    .lean();

  // Guard: not found
  if (!course) return null; // or throw new Error("Course not found");

  return replaceMongoIdInObject(course);
}


// export async function getCourseDetailsByInstructor(
//   instructorId: string
// ): Promise<{
//   courses: number;
//   enrollments: number;
//   reviews: number;
//   ratings: string;
// }> {
//   const courses = await Course.find({
//     instructor: instructorId,
//   }).lean();

//   const enrollments = await Promise.all(
//     courses.map(async (course: any) => {
//       const enrollment = await getEnrollmentsForCourse(
//         course._id.toString()
//       );
//       return enrollment;
//     })
//   );

//   const totalEnrollments = enrollments.reduce(
//     (item: any, currentValue: any) => {
//       return item.length + currentValue.length;
//     }
//   );

//   const testimonials = await Promise.all(
//     courses.map(async (course: any) => {
//       const testimonial = await getTestimonialsForCourse(
//         course._id.toString()
//       );
//       return testimonial;
//     })
//   );

//   const totalTestimonials = testimonials.flat();

//   const avgRating =
//     totalTestimonials.reduce((acc: number, obj: any) => {
//       return acc + obj.rating;
//     }, 0) / totalTestimonials.length;

//   return {
//     courses: courses.length,
//     enrollments: totalEnrollments,
//     reviews: totalTestimonials.length,
//     ratings: avgRating.toPrecision(2),
//   };
// }

// export async function getCourseDetailsByInstructor(
//   instructorId: string
// ): Promise<{
//   courses: number;
//   enrollments: number;
//   reviews: number;
//   ratings: string;
// }> {
//   const courses = await Course.find({
//     instructor: instructorId,
//   }).lean();

//   const enrollments = await Promise.all(
//     courses.map(async (course: any) => {
//       const enrollment = await getEnrollmentsForCourse(
//         course._id.toString()
//       );
//       return enrollment.length; // ✅ convert to number
//     })
//   );

//   const totalEnrollments = enrollments.reduce(
//     (sum: number, current: number) => sum + current,
//     0
//   );

//   const testimonials = await Promise.all(
//     courses.map(async (course: any) => {
//       const testimonial = await getTestimonialsForCourse(
//         course._id.toString()
//       );
//       return testimonial.map((t: any) => ({
//         rating: Number(t.rating), // ✅ keep only primitive
//       }));
//     })
//   );

//   const totalTestimonials = testimonials.flat();

//   const avgRating =
//     totalTestimonials.reduce((acc: number, obj: any) => {
//       return acc + obj.rating;
//     }, 0) / (totalTestimonials.length || 1);

//   return {
//     courses: Number(courses.length),
//     enrollments: Number(totalEnrollments),
//     reviews: Number(totalTestimonials.length),
//     ratings: avgRating.toPrecision(2),
//   };
// }
export async function getCourseDetailsByInstructor(instructorId) {
    const courses = await Course.find({instructor: instructorId}).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
          const enrollment = await getEnrollmentsForCourse(course._id.toString());
          return enrollment;
        })
    );

    const groupedByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);

    const totalRevenue = courses.reduce((acc, course) => {
        return (acc + groupedByCourses[course._id].length * course.price)
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

    return {
        "courses": courses.length,
        "enrollments": totalEnrollments,
        "reviews": totalTestimonials.length,
        "ratings": avgRating.toPrecision(2),
        "revenue": totalRevenue
    }
}