"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeLessonPublishState, deleteLesson } from "@/app/actions/lesson";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(lesson?.active);

  // ✅ ALWAYS convert to string (works for _id ObjectId, id string)
  const lessonId =
    lesson?.id?.toString?.() ||
    lesson?._id?.toString?.() ||
    "";

  const moduleIdStr = moduleId?.toString?.() || "";

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("lesson:", lesson);
    console.log("lessonId:", lessonId);

    if (!lessonId) {
      toast.error("Lesson ID is undefined.");
      return;
    }

    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeLessonPublishState(lessonId);
          setPublished(!activeState);
          toast.success("The lesson has been updated");
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published lesson can not be deleted. First unpublish it, then delete."
            );
          } else {
            // ✅ use lessonId, not lesson.id
            await deleteLesson(lessonId, moduleIdStr);
            onDelete();
          }
          break;
        }

        default: {
          throw new Error("Invalid Lesson Action");
        }
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          type="submit"
          variant="outline"
          size="sm"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          type="submit"
          size="sm"
          onClick={() => setAction("delete")}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
