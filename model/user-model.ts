// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//     firstName: {
//         required: true,
//         type: String,
//     },
//     lastName: {
//         required: true,
//         type: String,
//     },
//     password: {
//         required: true,
//         type: String,
//     },
//     email: {
//         required: true,
//         type: String,
//     },
//     phone: {
//         required: true,
//         type: String,
//     },
//     role: {
//         required: true,
//         type: String,
//     },
//     bio: {
//         required: false,
//         type: String,
//     },
//     socialMedia: {
//         required: false,
//         type: Object,
//     },
//     profilePicture: {
//         required: false,
//         type: String,
//     },
// });

// export const User = mongoose.models.User ?? mongoose.model("User", userSchema);


import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  [key: string]: any; // flexible for other platforms
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  bio?: string;
  designation?:string;
  socialMedia?: SocialMedia;
  profilePicture?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    socialMedia: {
      type: Object,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    designation: {
        required: false,
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

export const User =
  models.User || model<UserDocument>("User", userSchema);


  