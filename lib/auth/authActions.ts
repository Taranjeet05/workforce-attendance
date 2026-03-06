"use server";

import { signIn, signOut } from "./authConfig";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginWithGoogle(): Promise<void> {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("[AUTH] Google sign-in failed:", error);
    throw new Error("Sign-in failed. Please try again.");
  }
}

export async function handleSignOut(): Promise<void> {
  try {
    await signOut({ redirectTo: "/auth/sign-in" });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("[AUTH] Sign-out failed:", error);
    throw new Error("Sign-out failed. Please try again.");
  }
}
