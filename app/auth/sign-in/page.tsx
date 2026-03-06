import { auth } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";
import EmailSignIn from "./EmailSignIn";
import GoogleSignIn from "./GoogleSignIn";

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/dashboard");

  return (
    <main>
      <div className="min-h-screen flex item-center justify-center bg-black">
        <div className="w-full max-w-xl lg:max-w-4xl p-8 shadow-xl rounded-2xl flex items-center justify-center flex-col gap-7">
          <div className="text-center mb-8  space-y-3 lg:space-y-6 md:space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
              Qr-Attendance App
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl font-medium tracking-tight">
              Sign In to manage your time
            </p>
          </div>
          <EmailSignIn />
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
            OR
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <GoogleSignIn />
        </div>
      </div>
    </main>
  );
}
