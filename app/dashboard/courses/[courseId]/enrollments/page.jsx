// import { columns } from "./_components/columns";
// import { DataTable } from "./_components/data-table";

// import { getInstructorDashboardData, ENROLLMENT_DATA } from "@/lib/dashboard-helper";
// import { getCourseDetails } from "@/queries/courses";

// const EnrollmentsPage = async ({ params }) => {
//   const { courseId } = await params; // ✅ unwrap promise

//   const course = await getCourseDetails(courseId);

//   const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);

//   const enrollmentForCourse = allEnrollments.filter(
//     (enrollment) => String(enrollment?.course) === String(courseId)
//   );

//   return (
//     <div className="p-6">
//       <h2>{course?.title}</h2>
//       <DataTable columns={columns} data={enrollmentForCourse} />
//     </div>
//   );
// };

// export default EnrollmentsPage;
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { getInstructorDashboardData, ENROLLMENT_DATA } from "@/lib/dashboard-helper";
import { getCourseDetails } from "@/queries/courses";

const EnrollmentsPage = async ({ params }) => {
  const { courseId } = await params; // ✅ unwrap promise

  const course = await getCourseDetails(courseId);
  const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);

  const enrollmentForCourse = allEnrollments.filter(
    (enrollment) => String(enrollment?.course) === String(courseId)
  );

  // ✅ FIX: make it plain/serializable for Client Component
  const safeEnrollmentForCourse = enrollmentForCourse.map((enrollment) => ({
    ...enrollment,
    course: enrollment?.course ? String(enrollment.course) : null,     // ✅ ObjectId -> string
    student: enrollment?.student ? String(enrollment.student) : null,  // ✅ if ObjectId -> string

    // ✅ Dates -> string (prevents Date / special objects issues)
    enrollment_date: enrollment?.enrollment_date
      ? new Date(enrollment.enrollment_date).toISOString()
      : null,
    completion_date: enrollment?.completion_date
      ? new Date(enrollment.completion_date).toISOString()
      : null,
  }));

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={safeEnrollmentForCourse} />
    </div>
  );
};

export default EnrollmentsPage;


