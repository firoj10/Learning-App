"use client";

export const Editor = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full min-h-[200px] border rounded p-3"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write here..."
    />
  );
};
