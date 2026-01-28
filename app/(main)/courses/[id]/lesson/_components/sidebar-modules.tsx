"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { SidebarLessons } from "./sidebar-lessons";
import { useSearchParams } from "next/navigation";

type Lesson = {
  _id?: any;
  id?: string;
  slug?: string;
  title?: string;
  access?: string;
  state?: string;
  order?: number;
  active?: boolean;
  [key: string]: any;
};

type ModuleItem = {
  _id?: any;
  id?: string;
  title?: string;
  slug?: string;
  order?: number;
  lessonIds: Lesson[];
  [key: string]: any;
};

type SidebarModulesProps = {
  courseId: string;
  modules: ModuleItem[];
};

export const SidebarModules = ({ courseId, modules }: SidebarModulesProps) => {
  const searchParams = useSearchParams();

  const allModules = replaceMongoIdInArray(modules).toSorted(
    (a: any, b: any) => a.order - b.order
  );

  const query = searchParams.get("name");

  const expandModule = allModules.find((module: any) => {
    return module.lessonIds.find((lesson: any) => {
      return lesson?.slug === query;
    });
  });

  const exapndModuleId = expandModule?.id ?? allModules[0]?.id;

  return (
    <Accordion
      defaultValue={exapndModuleId}
      type="single"
      collapsible
      className="w-full px-6"
    >
      {allModules.map((module: any) => (
        <AccordionItem key={module.id} className="border-0" value={module.id}>
          <AccordionTrigger>dh {module.title}</AccordionTrigger>

          {/* ✅ SHOW LESSONS */}
          <SidebarLessons
            courseId={courseId}
            lessons={module.lessonIds}
            module={module.slug}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
};
