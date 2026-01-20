// import mongoose, { Schema } from "mongoose";

// const courseSchema = new Schema({
//     title: {
//         required: true,
//         type: String,
//     },
//     description: {
//         required: true,
//         type: String,
//     },
//     thumbnail: {
//         required: true,
//         type: String,
//     },
//     modules: [
//         { type: Schema.ObjectId, ref: "Module" }
//     ],
//     price: {
//         required: true,
//         type: Number,
//     },
//     active: {
//         required: true,
//         type: Boolean,
//     },

//     category: {
//         type: Schema.ObjectId, ref: "Category"
//     },

//     instructor: {
//         type: Schema.ObjectId, ref: "User"
//     },

//     quizzes: {
//         required: false,
//         type: Schema.ObjectId,
//     },

//     testimonials: [{
//         type: Schema.ObjectId, ref: "Testimonial"
//     }],
// });

// export const Course =
//     mongoose.models.Course ?? mongoose.model("Course", courseSchema);

import mongoose, {
  Schema,
  model,
  models,
  Types,
  Document,
} from "mongoose";

export interface CourseDocument extends Document {
  title: string;
  description: string;
  thumbnail: string;

  modules: Types.ObjectId[];

  price: number;
  active: boolean;

  category: Types.ObjectId;
  instructor: Types.ObjectId;

  quizzes?: Types.ObjectId;

  testimonials: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

const courseSchema = new Schema<CourseDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },

    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],

    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizzes: {
      type: Schema.Types.ObjectId,
      required: false,
    },

    testimonials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Course =
  models.Course || model<CourseDocument>("Course", courseSchema);
