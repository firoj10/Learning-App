import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { getCourseDetails } from "@/queries/courses";
import { getInstructorDashboardData, REVIEW_DATA } from "@/lib/dashboard-helper";

type Props = {
  params: Promise<{ courseId: string }>;
};

type ReviewRow = {
  studentName: string;
  rating: number;
  content: string;
  courseId: string; // ✅ plain string now
};

export default async function ReviewsPage({ params }: Props) {
  const { courseId } = await params;

  const course = await getCourseDetails(courseId);
  const reviewData = await getInstructorDashboardData(REVIEW_DATA);

  // ✅ filter first (still server-side)
  const reviewDataForCourse = reviewData.filter(
    (review: any) => review?.courseId?.toString?.() === courseId
  );

  // ✅ IMPORTANT: convert to plain objects (string/number/boolean/null/array/plain object)
  const safeData: ReviewRow[] = reviewDataForCourse.map((r: any) => ({
    studentName: String(r?.studentName ?? ""),
    rating: Number(r?.rating ?? 0),
    content: String(r?.content ?? ""),
    courseId: String(r?.courseId?.toString?.() ?? ""),
  }));

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={safeData} />
    </div>
  );
}
