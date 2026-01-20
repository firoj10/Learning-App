// import mongoose from "mongoose";

// export async function dbConnect() {
//   try {
//     const conn = await mongoose.connect(
//       String(process.env.MONGODB_CONNECTION_STRING)
//     );
//     return conn;
//   } catch (err) {
//     console.error(err);
//   }
// }
import mongoose from "mongoose";

export async function dbConnect(): Promise<any> {
  if (!process.env.MONGODB_CONNECTION_STRING) {
    throw new Error("MONGODB_CONNECTION_STRING missing in .env.local");
  }

  try {
    const conn = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );
    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // important to throw so server knows
  }
}

