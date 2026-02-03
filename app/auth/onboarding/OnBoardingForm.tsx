"use client";

import React, { useState, useTransition } from "react";
import { completeProfile } from "@/lib/auth/authActions";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  placeholderImage: string;
}
export default function OnboardingForm({ placeholderImage }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await completeProfile(formData);

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      } catch {
        setError(`An unexpected error occurred. Please try again.`);
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl lg:max-w-4xl p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-8"
    >
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold">Setup Profile</h1>
        <p className="text-zinc-500 text-medium md:text-lg mt-1">
          Confirm your identity to continue
        </p>
      </div>

      {/* Profile Pic Section */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-emerald-500 overflow-hidden bg-zinc-800">
          <Image
            src={placeholderImage}
            alt="Default Avatar"
            fill
            className="object-cover rounded-full"
            unoptimized
          />
        </div>
        <p className="text-sm md:text-lg text-zinc-500 italic">
          Unique avatar generated for your email
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="name"
          className="text-lg font-medium text-zinc-400 block ml-1 italic"
        >
          Full Name <span className="text-emerald-700 font-extrabold">*</span>
        </label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="name"
          required
          placeholder="Alex Smith"
          className={`w-full p-3 bg-zinc-950 border rounded-xl outline-none transition-all ${error ? "border-red-500" : "border-zinc-700 focus:ring-2 focus:ring-emerald-600"}`}
        />
        {error && (
          <p className="text-red-500 text-xs md:text-sm mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
      >
        {isPending ? "Saving Profile..." : "Enter Dashboard"}
      </button>
    </form>
  );
}
