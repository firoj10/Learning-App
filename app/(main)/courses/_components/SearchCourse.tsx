"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCourseFilters } from "./useCourseFilters";

const SearchCourse = () => {
  const { search, setParam } = useCourseFilters();
  const [value, setValue] = useState(search);

  useEffect(() => setValue(search), [search]);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = value.trim();
      if (next === (search ?? "")) return; // ✅ same হলে update না
      setParam("search", next);
    }, 400);

    return () => clearTimeout(t);
  }, [value, search, setParam]);

  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
      <Input
        type="text"
        value={value}
        placeholder="Search courses..."
        onChange={(e) => setValue(e.target.value)}
        className="pl-8 pr-3 py-2 text-sm"
      />
    </div>
  );
};

export default SearchCourse;
