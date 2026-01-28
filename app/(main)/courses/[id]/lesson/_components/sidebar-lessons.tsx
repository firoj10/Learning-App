import { AccordionContent } from "@/components/ui/accordion";
import { SidebarLessonItem } from "./sidebar-lesson-items";

type Lesson = {
  id?: string;
  _id?: any;
  slug?: string;
  title?: string;
  access?: string;
  state?: string;
  video_url?:string;
};

type SidebarLessonsProps = {
  courseId: string;
  lessons: Lesson[];
  module: string;
};

export const SidebarLessons = ({ courseId, lessons, module }: SidebarLessonsProps) => {
  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        {(lessons ?? []).map((lesson) => {
          const key =
            lesson?.id ??
            lesson?._id?.toString?.() ??
            lesson?.slug ??
            Math.random().toString();

          return (
            <SidebarLessonItem
              key={key}
              courseId={courseId}
              lesson={lesson}
              module={module}
            />
          );
        })}
      </div>
    </AccordionContent>
  );
};
