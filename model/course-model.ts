
// import mongoose, {
//   Schema,
//   model,
//   models,
//   Types,
//   Document,
// } from "mongoose";

// export interface CourseDocument extends Document {
//   title: string;
//   description: string;
//   thumbnail: string;

//   modules: Types.ObjectId[];

//   price: number;
//   active: boolean;

//   category: Types.ObjectId;
//   instructor: Types.ObjectId;

//   quizzes?: Types.ObjectId;

//   testimonials: Types.ObjectId[];

//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const courseSchema = new Schema<CourseDocument>(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     thumbnail: {
//       type: String,
//       required: true,
//     },

//     modules: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Module",
//       },
//     ],

//     price: {
//       type: Number,
//       required: true,
//     },
//     active: {
//       type: Boolean,
//       required: true,
//     },

//     category: {
//       type: Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },

//     instructor: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     quizzes: {
//       type: Schema.Types.ObjectId,
//       required: false,
//     },

//     testimonials: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Testimonial",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Course =
//   models.Course || model<CourseDocument>("Course", courseSchema);


import mongoose, { Schema, model, models, Types } from "mongoose";

export interface CourseDocument extends mongoose.Document {
  title: string;
  subtitle?: string;
  description: string;
  thumbnail?: string;

  modules: Types.ObjectId[];

  price: number;
  active: boolean;

  category?: Types.ObjectId;
  instructor?: Types.ObjectId;

  quizSet?: Types.ObjectId;
  quizzes?: Types.ObjectId;

  testimonials: Types.ObjectId[];
  learning?: string[];

  createdAt: Date;
  updatedAt: Date;
}


// thumbnail: { type: String, default: "" },          // ✅ not required
// category: { type: Schema.Types.ObjectId, ref: "Category", required: false }, // ✅ optional
// price: { type: Number, default: 0, required: false }, // ✅ default
// active: { type: Boolean, default: false, required: false }, // ✅ default







const courseSchema = new Schema<CourseDocument>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },

    description: { type: String, required: true },
    // thumbnail: { type: String },
    thumbnail: { type: String, default: "" },          // ✅ not required


    modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],

    // price: { type: Number, required: true, default: 0, min: 0 },
    // active: { type: Boolean, required: true, default: false },
    price: { type: Number, default: 0, required: false }, // ✅ default

    active: { type: Boolean, default: false, required: false }, // ✅ default


    // category: { type: Schema.Types.ObjectId, ref: "Category" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: false }, // ✅ optional

    instructor: { type: Schema.Types.ObjectId, ref: "User" },

    quizSet: { type: Schema.Types.ObjectId, ref: "Quizset" },
    quizzes: { type: Schema.Types.ObjectId },

    testimonials: [{ type: Schema.Types.ObjectId, ref: "Testimonial" }],

    learning: { type: [String], default: [] },
  },
  {
    timestamps: true, // ✅ adds createdAt + updatedAt automatically
  }
);

export const Course = models.Course || model<CourseDocument>("Course", courseSchema);
