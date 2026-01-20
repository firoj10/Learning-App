// "use server"

// import { User } from "@/model/user-model";
// import { revalidatePath } from "next/cache";
// import bcrypt from "bcryptjs";
// import { validatePassword } from "@/queries/users";

// export async function updateUserInfo(email, updatedData) {
//     try {
//         const filter = {email: email};
//         await User.findOneAndUpdate(filter, updatedData);
//         revalidatePath('/account');
//     } catch(error) {
//         throw new Error(error)
//     }
// }

// export async function changePassword(email, oldPassword, newPassword) {
//     const isMatch = await validatePassword(email, oldPassword);

//     if (!isMatch) {
//         throw new Error("Please enter a valid current password");
//     }
//     const filter = {email: email};
//     const hashedPassword = await bcrypt.hash(newPassword, 5);
//     const dataToUpdate = {
//         password: hashedPassword
//     }

//     try{
//         await User.findOneAndUpdate(filter, dataToUpdate);
//         revalidatePath('/account');
//     } catch(error) {
//         throw new Error(error);
//     }

// }

"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";

/**
 * Minimal safe types without changing logic.
 * If you have exact Mongoose/User types, you can replace these later.
 */
type Email = string;

/** Allow any shape of update payload (so logic stays same). */
type UpdatedData = Record<string, unknown>;

export async function updateUserInfo(
  email: Email,
  updatedData: UpdatedData
): Promise<void> {
  try {
    const filter = { email: email };
    await User.findOneAndUpdate(filter, updatedData);
    revalidatePath("/account");
  } catch (error: unknown) {
    // keep same behavior: throw Error(...)
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function changePassword(
  email: Email,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const isMatch: boolean = await validatePassword(email, oldPassword);

  if (!isMatch) {
    throw new Error("Please enter a valid current password");
  }

  const filter = { email: email };
  const hashedPassword: string = await bcrypt.hash(newPassword, 5);

  const dataToUpdate: { password: string } = {
    password: hashedPassword,
  };

  try {
    await User.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath("/account");
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
