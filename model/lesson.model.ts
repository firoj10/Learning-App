
import mongoose, { Schema, Model, Document } from "mongoose";

export interface ILesson extends Document {
  title: string;
  description?: string;
  duration: number;
  video_url: string;
  published: boolean;
  slug: string;
  access: string;
  active: boolean;
  order:number;
}

const lessonSchema = new Schema<ILesson>({
 title: {
    required: true,
    type: String
  },
  description: {
    required: false,
    type: String
  },
  duration: {
    required: true,
    default: 0,
    type: Number
  },
  video_url: {
    required: false,
    type: String
  },
  active: {
    required: true,
    default: false,
    type: Boolean
  },
  slug: {
    required: true,
    type: String
  },
  access: {
    required: true,
    default: "private",
    type: String
  },
  order: {
    required: true,
    type: Number,
  },
});

export const Lesson: Model<ILesson> =
  mongoose.models.Lesson ?? mongoose.model<ILesson>("Lesson", lessonSchema);
