"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCourseFilters } from "./useCourseFilters";

const ActiveFilters = () => {
  const { categories, price, sort, search, clearOne, setParam, clearAll } = useCourseFilters();

  const hasAny = categories.length || price.length || sort || search;

  if (!hasAny) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((c) => (
        <Button
          key={`cat-${c}`}
          variant="ghost"
          className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          onClick={() => clearOne("categories", c)}
        >
          {c} <X className="w-3" />
        </Button>
      ))}

      {price.map((p) => (
        <Button
          key={`price-${p}`}
          variant="ghost"
          className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          onClick={() => clearOne("price", p)}
        >
          {p} <X className="w-3" />
        </Button>
      ))}

      {sort ? (
        <Button
          variant="ghost"
          className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          onClick={() => setParam("sort", "")}
        >
          {sort} <X className="w-3" />
        </Button>
      ) : null}

      {search ? (
        <Button
          variant="ghost"
          className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          onClick={() => setParam("search", "")}
        >
          {search} <X className="w-3" />
        </Button>
      ) : null}

      <Button
        variant="outline"
        className="text-xs h-7 rounded-full"
        onClick={clearAll}
      >
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;
