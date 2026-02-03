"use server";

import User from "@/models/User";
import { connectToDatabase } from "../db";
import { auth, signIn, signOut } from "./authConfig";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function loginWithEmail(formData: FormData) {
  const email = formData.get("email") as string;
  await signIn("resend", { email, redirectTo: "/dashboard" });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/auth/sign-in" });
}

export async function completeProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email || !session?.user.id)
    return { error: "Unauthorized. Please sign in again." };

  const name = formData.get("name") as string;
  if (!name || name.length < 2) {
    return { error: "Name is required and must be at least 2 characters." };
  }

  const defaultImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(session.user.email)}`;

  try {
    await connectToDatabase();
    const updateUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name,
        image: defaultImage,
      },
    );
    if (!updateUser) {
      return { error: "User not found in database." };
    }
    return { success: true };
  } catch (error) {
    console.error("Database update failed", error);
    return { error: "Failed to update profile. Please try again." };
  }
}
