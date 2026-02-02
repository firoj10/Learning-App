
import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ModuleDocument extends Document {
  title: string;
  description: string;
  status: string;
  slug: string;
  course: Types.ObjectId;
  lessonIds: Types.ObjectId[];
  duration: number;
  order: number;
active:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const moduleSchema = new Schema<ModuleDocument>(
  {
   title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  active: {
    required: true,
    default: false,
    type: Boolean,
  },
  slug: {
    required: true,
    type: String,
  },
  course: {
    required: true,
    type: Schema.ObjectId,
  },
  lessonIds: {
    required: true,
    type: [Schema.ObjectId],
  },
  order: {
    required: true,
    type: Number,
  },
  },
  {
    timestamps: true,
  }
);

export const Module =
  models.Module || model<ModuleDocument>("Module", moduleSchema);
