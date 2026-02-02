
import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface TestimonialDocument extends Document {
  content: string;
  user: Types.ObjectId;// could be Types.ObjectId if referencing User model
  courseId:Types.ObjectId; // could be Types.ObjectId if referencing Course model
  rating: number;

  createdAt?: Date;
  updatedAt?: Date;
}

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
     
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
     
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial =
  models.Testimonial ||
  model<TestimonialDocument>("Testimonial", testimonialSchema);
