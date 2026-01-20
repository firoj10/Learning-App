// import mongoose, { Schema } from "mongoose";

// const moduleSchema = new Schema({
//   title: {
//     required: true,
//     type: String,
//   },
//   description: {
//     required: true,
//     type: String,
//   },
//   status: {
//     required: true,
//     type: String,
//   },
//   slug: {
//     required: true,
//     type: String,
//   },
//   course: {
//     required: true,
//     type: String,
//   },
//   lessonIds: {
//     required: true,
//     type: [String],
//   },
// });

// export const Module = mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ModuleDocument extends Document {
  title: string;
  description: string;
  status: string;
  slug: string;
  course: string; // could also be Types.ObjectId if referencing Course
  lessonIds: string[];
  duration: number;

  createdAt?: Date;
  updatedAt?: Date;
}

const moduleSchema = new Schema<ModuleDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    duration: {
    required: false,
    type: Number,
    default: 0, // default duration
  },
    slug: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    lessonIds: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Module =
  models.Module || model<ModuleDocument>("Module", moduleSchema);
