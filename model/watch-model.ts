// import mongoose, { Schema } from "mongoose";

// const watchSchema = new Schema({
//   state: {
//     required: true,
//     type: String,
//     default: "started",
//   },
//   created_at: {
//     required: true,
//     type: Date,
//     default: Date.now()
//   },
//   modified_at: {
//     required: true,
//     type: Date,
//     default: Date.now()
//   },
//   lesson: { type: Schema.ObjectId, ref: "Lesson" },
//   user: { type: Schema.ObjectId, ref: "User" },
//   module: { type: Schema.ObjectId, ref: "Module" },
//   lastTime: {
//     required: true,
//     type: Number,
//     default: 0,
//   },
// });

// export const Watch = mongoose.models.Watch ?? mongoose.model("Watch", watchSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWatch extends Document {
  state: string;
  created_at: Date;
  modified_at: Date;
  lesson?: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  module?: mongoose.Types.ObjectId;
  lastTime: number;
}

const watchSchema = new Schema<IWatch>({
  state: {
    required: true,
    type: String,
    default: "started",
  },
  created_at: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  modified_at: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  lesson: { type: Schema.ObjectId, ref: "Lesson" },
  user: { type: Schema.ObjectId, ref: "User" },
  module: { type: Schema.ObjectId, ref: "Module" },
  lastTime: {
    required: true,
    type: Number,
    default: 0,
  },
});

export const Watch: Model<IWatch> =
  mongoose.models.Watch ?? mongoose.model<IWatch>("Watch", watchSchema);
