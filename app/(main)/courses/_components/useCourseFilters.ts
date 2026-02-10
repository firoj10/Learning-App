"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Convert comma separated string to array
 * Example:
 * "design,development" → ["design", "development"]
 */
function parseCSV(v: string | null) {
  if (!v) return [];
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * Convert array to comma separated string
 * Example:
 * ["design", "development"] → "design,development"
 */
function toCSV(arr: string[]) {
  return arr.join(",");
}

export function useCourseFilters() {
  // Next.js router to change URL
  const router = useRouter();

  // current path: /courses
  const pathname = usePathname();

  // current query params: ?search=react&categories=Design
  const sp = useSearchParams();

  /**
   * Read filters from URL
   * Example URL:
   * /courses?categories=Design&price=free&search=react
   */
  const categories = parseCSV(sp.get("categories") ?? sp.get("category")); // support both names
  const price = parseCSV(sp.get("price"));
  const sort = sp.get("sort") ?? "";
  const search = sp.get("search") ?? "";

  /**
   * Set single-value param (search, sort etc.)
   * Example:
   * setParam("search", "react")
   * → /courses?search=react
   */
  const setParam = useCallback(
    (key: string, value: string) => {
      // clone current query params
      const params = new URLSearchParams(sp.toString());

      // check current value to avoid infinite navigation loop
      const current = params.get(key) ?? "";
      if ((value ?? "") === current) return;

      // if value empty → remove param
      if (!value) params.delete(key);
      else params.set(key, value);

      // build new query string
      const qs = params.toString();

      // navigate to new URL
      // example: /courses?search=react
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, sp]
  );

  /**
   * Toggle multi-value params (categories, price)
   * Example:
   * current: categories=Design
   * toggleArrayParam("categories","Development")
   * → categories=Design,Development
   */
  const toggleArrayParam = useCallback(
    (key: "categories" | "price", value: string) => {
      const params = new URLSearchParams(sp.toString());

      // read current values as array
      const current = parseCSV(params.get(key));

      // check if already exists
      const exists = current.includes(value);

      // add or remove
      const next = exists
        ? current.filter((v) => v !== value) // remove
        : [...current, value]; // add

      // update URL param
      if (next.length === 0) params.delete(key);
      else params.set(key, toCSV(next));

      const qs = params.toString();

      // push new URL
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, sp]
  );

  /**
   * Clear all filters
   * Example:
   * /courses?search=react&price=free
   * → /courses
   */
  const clearAll = useCallback(() => router.push(pathname), [router, pathname]);

  /**
   * Return all filter values + actions
   * Components (SearchCourse, FilterCourse, SortCourse)
   * will use these.
   */
  return {
    categories,
    price,
    sort,
    search,
    setParam,
    toggleArrayParam,
    clearAll,
  };
}
