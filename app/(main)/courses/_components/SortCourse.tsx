"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCourseFilters } from "./useCourseFilters";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SortCourse = () => {
  const { sort, setParam } = useCourseFilters();

  return (
    <Select value={sort} onValueChange={(v) => setParam("sort", v)}>
      <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0 overflow-hidden">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortCourse;
