// todo. Here we will design the error page for Auth
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Map Auth.js error codes to human-friendly messages
  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The magic link has expired or has already been used.",
    Default: "An unexpected authentication error occurred.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 bg-zinc-900 border border-red-900/30 rounded-2xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="text-4xl">⚠️</div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Authentication Error
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {errorMessage}
          </p>
        </div>

        <Link
          href="/auth/sign-in"
          className="block w-full p-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
