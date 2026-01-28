"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ReactPlayer = dynamic(
  () => import("react-player").then((m) => m.default),
  { ssr: false }
);

type Lesson = {
  id?: string;
  video_url?: string;
};

type LessonVideoProps = {
  courseId: string;
  lesson: Lesson;
  module: string;
};

export const LessonVideo = ({ courseId, lesson, module }: LessonVideoProps) => {
  const playerRef = useRef<any>(null);

  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);

  const router = useRouter();
  const videoUrl = (lesson?.video_url || "").trim();

  // ▶️ when video starts
  useEffect(() => {
    if (!started) return;

    fetch("/api/lesson-watch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        state: "started",
        lastTime: 0,
      }),
    }).finally(() => setStarted(false));
  }, [started, courseId, lesson?.id, module]);

  // ✅ when video ends (use ref to get duration)
  useEffect(() => {
    if (!ended) return;

    const videoDuration =
      playerRef.current?.getDuration?.() ?? duration;

    fetch("/api/lesson-watch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        state: "completed",
        lastTime: videoDuration,
      }),
    }).finally(() => {
      setEnded(false);
      router.refresh();
    });
  }, [ended, courseId, lesson?.id, module, duration, router]);

  if (!videoUrl) return null;

  return (
    <div style={{ minHeight: 470 }}>
      <ReactPlayer
        ref={playerRef}                 // ✅ IMPORTANT
        url={videoUrl}
        width="100%"
        height="470px"
        controls
        onStart={() => setStarted(true)}
        onReady={() => {
          const d = playerRef.current?.getDuration?.();
          if (typeof d === "number") setDuration(d);
        }}
        onEnded={() => setEnded(true)}
      />
    </div>
  );
};
