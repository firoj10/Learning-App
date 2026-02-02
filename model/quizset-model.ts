// import mongoose, {Schema} from "mongoose";

// const quizesetSchema = new Schema({
//     title : {
//         required: true,
//         type: String,
//       },
//       description : {
//         type: String,
//       },
//       slug : {
//         type: String,
//       },
//       quizIds : [{ type: Schema.ObjectId, ref: "Quiz" }],
//       active : {
//         required: true,
//         default: false,
//         type: Boolean,
//       },
// })

// export const Quizset = mongoose.models.Quizset ?? mongoose.model("Quizset", quizesetSchema);
import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Quizset document interface
 */
export interface IQuizset extends Document {
  title: string;
  description?: string;
  slug?: string;
  quizIds: mongoose.Types.ObjectId[];
  active: boolean;
}

/**
 * Schema
 */
const quizsetSchema = new Schema<IQuizset>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
    quizIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // optional but recommended
  }
);

/**
 * Model
 */
export const Quizset: Model<IQuizset> =
  mongoose.models.Quizset ||
  mongoose.model<IQuizset>("Quizset", quizsetSchema);
