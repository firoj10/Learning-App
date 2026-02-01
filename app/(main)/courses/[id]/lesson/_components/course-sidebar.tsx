import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { CourseSidebarView } from "./course-sidebar-view";

type CourseSidebarProps = { courseId: unknown };

type PlainLesson = {
  _id: string;
  title?: string;
  slug?: string;
  access?: unknown;
  order?: number;
  active?: boolean;
  state?: string; // "completed" | undefined
  video_url?: string;
};

type PlainModule = {
  _id: string;
  title?: string;
  active?: boolean;
  slug?: string;
  course?: string;
  order?: number;
  lessonIds: PlainLesson[];
};

function toStrId(v: any) {
  return v?._id?.toString?.() || v?.id?.toString?.() || v?.toString?.() || "";
}

export const CourseSidebar = async ({ courseId }: CourseSidebarProps) => {
  const course: any = await getCourseDetails(courseId as any);
  const loggedinUser: any = await getLoggedInUser();

  const modules = course?.modules ?? [];

  // ✅ Collect all moduleIds + lessonIds first (avoid N+1 queries)
  const pairs: Array<{ moduleId: string; lessonId: string }> = [];
  for (const m of modules) {
    const moduleId = toStrId(m);
    const lessons = m?.lessonIds ?? [];
    for (const l of lessons) {
      const lessonId = toStrId(l);
      if (moduleId && lessonId) pairs.push({ moduleId, lessonId });
    }
  }

  const moduleIds = [...new Set(pairs.map((p) => p.moduleId))];
  const lessonIds = [...new Set(pairs.map((p) => p.lessonId))];

  // ✅ Query all Watch rows in one DB call
  const watches = await Watch.find({
    user: loggedinUser?.id,
    module: { $in: moduleIds },
    lesson: { $in: lessonIds },
    state: "completed",
  })
    .select({ module: 1, lesson: 1, state: 1 })
    .lean();

  // ✅ Fast lookup set: "moduleId:lessonId"
  const completedSet = new Set<string>();
  for (const w of watches ?? []) {
    const mId = toStrId({ _id: (w as any)?.module });
    const lId = toStrId({ _id: (w as any)?.lesson });
    if (mId && lId) completedSet.add(`${mId}:${lId}`);
  }

  // ✅ Build plain modules + mark completed lessons
  const updatedModules: PlainModule[] = (modules ?? []).map((module: any) => {
    const moduleId = toStrId(module);
    const lessons = module?.lessonIds ?? [];

    const updatedLessons: PlainLesson[] = lessons.map((lesson: any) => {
      const lessonId = toStrId(lesson);
      const isCompleted = completedSet.has(`${moduleId}:${lessonId}`);

      return {
        _id: lessonId,
        title: lesson?.title,
        slug: lesson?.slug,
        access: lesson?.access,
        order: lesson?.order,
        active: lesson?.active,
        state: isCompleted ? "completed" : lesson?.state,
        video_url: lesson?.video_url,
      };
    });

    return {
      _id: moduleId,
      title: module?.title,
      active: module?.active,
      slug: module?.slug,
      course: module?.course?.toString?.(),
      order: module?.order,
      lessonIds: updatedLessons,
    };
  });

  // ✅ Progress from Watch (lesson-based)
  const totalLessons = updatedModules.reduce((acc, m) => acc + (m.lessonIds?.length ?? 0), 0);
  const completedLessons = updatedModules.reduce(
    (acc, m) => acc + (m.lessonIds?.filter((l) => l.state === "completed").length ?? 0),
    0
  );

  const totalProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <CourseSidebarView
      courseId={String((courseId as any)?.toString?.() ?? courseId ?? "")}
      modules={updatedModules}
      totalProgress={totalProgress}
    />
  );
};
