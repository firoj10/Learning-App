// import mongoose, {Schema} from "mongoose";

// const enrollmentSchema = new Schema({
//   enrollment_date: {
//     required: true,
//     type: Date
//   },

//   status: {
//     required: true,
//     type: String
//   },

//   completion_date: {
//     required: true,
//     type: Date
//   },

//   method: {
//     required: true,
//     type: String
//   },

//   course: { type: Schema.ObjectId, ref: "Course" },

//   student: { type: Schema.ObjectId, ref: "User" },
// });

// export const Enrollment = mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);

import mongoose, { Schema, Model, Document } from "mongoose";

export interface IEnrollment extends Document {
  enrollment_date: Date;
  status: string;
  completion_date: Date;
  method: string;
  course?: Schema.Types.ObjectId;
  student?: Schema.Types.ObjectId;
}

const enrollmentSchema = new Schema<IEnrollment>({
  enrollment_date: {
    required: true,
    type: Date,
  },

  status: {
    required: true,
    type: String,
  },

  completion_date: {
    required: false,
    type: Date,
  },

  method: {
    required: true,
    type: String,
  },

  course: {
    type: Schema.ObjectId,
    ref: "Course",
  },

  student: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

export const Enrollment: Model<IEnrollment> =
  mongoose.models.Enrollment ??
  mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);
