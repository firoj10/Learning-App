"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CourseSidebarView } from "./course-sidebar-view";

type CourseSidebarMobileProps = {
  courseId: string;
  modules: any[];
};

export const CourseSidebarMobile = ({ courseId, modules }: CourseSidebarMobileProps) => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebarView courseId={courseId} modules={modules} />
      </SheetContent>
    </Sheet>
  );
};
