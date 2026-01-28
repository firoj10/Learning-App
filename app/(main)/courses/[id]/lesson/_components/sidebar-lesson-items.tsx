import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

type Lesson = {
  slug?: string;
  title?: string;
  access?: "private" | "public" | string;
  state?: "completed" | "incomplete" | string;
};

type SidebarLessonItemProps = {
  courseId: string;
  module: string;
  lesson?: Lesson; // ✅ lesson can be undefined in real data
};

export const SidebarLessonItem = ({ courseId, lesson, module }: SidebarLessonItemProps) => {
  const isPrivate = (lesson?: Lesson) => {
    return lesson?.access === "private";
  };

  const isComplete = (lesson?: Lesson) => {
    return lesson?.state === "completed";
  };
console.log("lesson item:", lesson);

  return (
    <Link
      href={
        isPrivate(lesson)
          ? "#"
          : `/courses/${courseId}/lesson?name=${lesson?.slug ?? ""}&module=${module}`
      }
      className={cn(
        "flex items-center gap-x-2 text-slate-700 text-sm font-[500]  transition-all hover:text-slate-600 ",
        isPrivate(lesson)
          ? "text-slate-700  hover:text-slate-700 cursor-default"
          : isComplete(lesson) && "text-emerald-700 hover:text-emerald-700"
      )}
    >
      <div className="flex items-center gap-x-2">
        {isPrivate(lesson) ? (
          <Lock size={16} className={cn("text-slate-700")} />
        ) : isComplete(lesson) ? (
          <CheckCircle size={16} className={cn("text-emerald-700")} />
        ) : (
          <PlayCircle size={16} className={cn("text-slate-700")} />
        )}
        {lesson?.title ?? ""}
      </div>
    </Link>
  );
};
