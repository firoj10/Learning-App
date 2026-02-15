
"use server";

import { signIn } from "@/auth";
import type { AuthError } from "next-auth";

export async function credentialLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    return response;
  } catch (error) {
    // Optional: better error handling for NextAuth/Auth.js
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Login failed");
  }
}
export async function doSocialLogin(formData: FormData) {
    const action = formData.get("action");
    await signIn(action, { redirectTo: "/courses"})
}