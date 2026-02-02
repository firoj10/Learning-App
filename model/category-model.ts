
import mongoose, { Schema, model, models, Document } from "mongoose";

export interface CategoryDocument extends Document {
  title: string;
  description?: string;
  thumbnail: string;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category =
  models.Category || model<CategoryDocument>("Category", categorySchema);
