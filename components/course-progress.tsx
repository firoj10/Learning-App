"use client";

import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

const colorByVariant: Record<string, string> = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant: Record<string, string> = {
  default: "text-sm",
  sm: "text-xs",
};

type Props = {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

export const CourseProgress = ({ value, variant = "default", size = "default" }: Props) => {
  return (
    <div>
      <Progress value={value} variant={variant} className={cn("h-2")} />
      <p
        className={cn(
          "font-medium mt-2",
          colorByVariant[variant],
          sizeByVariant[size]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
