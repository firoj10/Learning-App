import { User } from "@/model/user-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
export async function getUserByEmail(email) {
      await dbConnect(); // ⚠️ Must connect first

    const user = await User.findOne({ email: email }).lean();
    return replaceMongoIdInObject(user);
}

export async function validatePassword(email, password) {
      await dbConnect(); // ⚠️ Must connect first

    const user = await getUserByEmail(email);
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    return isMatch;
 }
