import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { CourseSidebarView } from "./course-sidebar-view";

type CourseSidebarProps = { courseId: any };

export const CourseSidebar = async ({ courseId }: CourseSidebarProps) => {
  const course: any = await getCourseDetails(courseId);
  const loggedinUser: any = await getLoggedInUser();

  const updatedModules = await Promise.all(
    (course?.modules ?? []).map(async (module: any) => {
      const moduleId = module?._id?.toString?.() ?? "";
      const lessons = module?.lessonIds ?? [];

      const updatedLessons = await Promise.all(
        lessons.map(async (lesson: any) => {
          const lessonId = lesson?._id?.toString?.() ?? "";

          const watch: any = await Watch.findOne({
            lesson: lessonId,
            module: moduleId,
            user: loggedinUser?.id,
          }).lean();

          if (watch?.state === "completed") {
            lesson.state = "completed";
          }

          // plain
          return {
            _id: lessonId,
            title: lesson?.title,
            slug: lesson?.slug,
            access: lesson?.access,
            order: lesson?.order,
            active: lesson?.active,
            state: lesson?.state,
            video_url:lesson?.video_url,
          };
        })
      );

      // plain
      return {
        _id: moduleId,
        title: module?.title,
        active: module?.active,
        slug: module?.slug,
        course: module?.course?.toString?.(),
        order: module?.order,
        lessonIds: updatedLessons,
      };
    })
  );

  return (
    <CourseSidebarView
      courseId={courseId?.toString?.()}
      modules={updatedModules}
    />
  );
};
