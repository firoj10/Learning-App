// import mongoose, {Schema} from "mongoose";


// const lessonSchema = new Schema({
//   title: {
//     required: true,
//     type: String
//   },
//   description: {
//     required: false,
//     type: String
//   },
//   duration: {
//     required: true,
//     type: Number
//   },
//   video_url: {
//     required: true,
//     type: String
//   },
//   published: {
//     required: true,
//     type: Boolean
//   },
//   slug: {
//     required: true,
//     type: String
//   },
//   access: {
//     required: true,
//     type: String
//   },
// });

// export const Lesson = mongoose.models.Lesson ?? mongoose.model("Lesson", lessonSchema);
import mongoose, { Schema, Model, Document } from "mongoose";

export interface ILesson extends Document {
  title: string;
  description?: string;
  duration: number;
  video_url: string;
  published: boolean;
  slug: string;
  access: string;
}

const lessonSchema = new Schema<ILesson>({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  video_url: {
    required: true,
    type: String,
  },
  published: {
    required: true,
    type: Boolean,
  },
  slug: {
    required: true,
    type: String,
  },
  access: {
    required: true,
    type: String,
  },
});

export const Lesson: Model<ILesson> =
  mongoose.models.Lesson ?? mongoose.model<ILesson>("Lesson", lessonSchema);
