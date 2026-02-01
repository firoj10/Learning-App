"use client";

import { CourseProgress } from "@/components/course-progress";
import { GiveReview } from "./give-review";
import { DownloadCertificate } from "./download-certificate";
import { SidebarModules } from "./sidebar-modules";

type PlainLesson = {
  _id: string;
  title?: string;
  slug?: string;
  access?: unknown;
  order?: number;
  active?: boolean;
  state?: string;
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

type CourseSidebarViewProps = {
  courseId: string;
  modules: PlainModule[];
  totalProgress: number;
};

export const CourseSidebarView = ({ courseId, modules, totalProgress }: CourseSidebarViewProps) => {
  return (
    <div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">Reactive Accelerator</h1>
        <div className="mt-10">
          <CourseProgress variant="success" value={totalProgress} />
        </div>
      </div>

      <SidebarModules courseId={courseId} modules={modules} />

      <div className="w-full px-6">
        <DownloadCertificate courseId={courseId} />
        <GiveReview courseId={courseId} />
      </div>
    </div>
  );
};
