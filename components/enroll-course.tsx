"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";

type EnrollCourseProps = {
  asLink?: boolean;
  courseId: string;
  courseName: string;
  coursePrice: number;
};

export const EnrollCourse = ({
  asLink,
  courseId,
  courseName,
  coursePrice,
}: EnrollCourseProps) => {
  const formAction = async (data: FormData) => {
    const { url } = await createCheckoutSession(data);
    if (url) window.location.assign(url);
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="courseName" value={courseName} />
      <input type="hidden" name="coursePrice" value={String(coursePrice)} />

      {asLink ? (
        <Button
          type="submit"
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1"
        >
          Enroll
          <ArrowRight className="w-3" />
        </Button>
      ) : (
        <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          Enroll Now
        </Button>
      )}
    </form>
  );
};
