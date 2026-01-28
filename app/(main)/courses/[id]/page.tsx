// app/(main)/courses/[id]/page.tsx
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import Testimonials from "./_components/Testimonials";
// import RelatedCourses from "./_components/RelatedCourses";
import CourseDetails from "./_components/CourseDetails";

import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

interface SingleCoursePageProps {
  params: Promise<{ id: string }>;
}

const SingleCoursePage = async (props: SingleCoursePageProps) => {
  // unwrap the params promise
  const { id } = await props.params;

  const course = await getCourseDetails(id);

  // console.log(course, "===");

  return (
    <>
    <CourseDetailsIntro course={course} />


      <CourseDetails course={course} />

      {course?.testimonials?.length > 0 && (
        <Testimonials testimonials={replaceMongoIdInArray(course.testimonials)} />
      )}

      {/* <RelatedCourses /> */}
    </>
  );
};

export default SingleCoursePage;

