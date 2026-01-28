"use client";

import { CourseProgress } from "@/components/course-progress";
import { GiveReview } from "./give-review";
import { DownloadCertificate } from "./download-certificate";
import { SidebarModules } from "./sidebar-modules";

type CourseSidebarViewProps = {
  courseId: string;
  modules: any[];
};

export const CourseSidebarView = ({ courseId, modules }: CourseSidebarViewProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">Reactive Accelerator</h1>
        <div className="mt-10">
          <CourseProgress variant="success" value={80} />
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
