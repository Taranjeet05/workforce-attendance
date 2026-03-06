"use client";

import { loginWithGoogle } from "@/lib/auth/authActions";
import Image from "next/image";

export default function GoogleSignIn() {
  return (
    <button
      className="flex items-center justify-center w-full gap-2 p-3 border rounded-lg hover:bg-blue-900  bg-blue-800 text-xl font-bold transition-colors"
      onClick={() => loginWithGoogle()}
    >
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        height={20}
        width={20}
        alt="Google"
      />
      Sign In with Google
    </button>
  );
}
