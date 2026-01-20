// import mongoose, { Schema } from "mongoose";

// const categorySchema = new Schema({
//     title: {
//         required: true,

//         type: String,
//     },

//     description: {
//         required: false,

//         type: String,
//     },

//     thumbnail: {
//         required: true,

//         type: String,
//     },
// });

// export const Category =
//     mongoose.models.Category ?? mongoose.model("Category", categorySchema);
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
