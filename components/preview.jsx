"use client";

export const Preview = ({ value }) => {
  return (
    <div
      className="prose max-w-none bg-white border rounded p-4"
      dangerouslySetInnerHTML={{ __html: value || "" }}
    />
  );
};
