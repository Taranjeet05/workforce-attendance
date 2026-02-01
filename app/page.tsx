// app/page.tsx
import { signIn, auth } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black text-zinc-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-8">Attendance System</h1>

      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p>
            Logged in as:{" "}
            <span className="font-mono text-blue-500">
              {session.user?.email}
            </span>
          </p>
          <p className="text-sm text-zinc-500">Mongo ID: {session.user?.id}</p>
          <a
            href="/dashboard"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </a>
        </div>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-300 rounded-full shadow-sm hover:bg-zinc-50 transition text-zinc-700"
          >
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              width="20"
              height="20"
              alt="Google"
            />
            Sign in with Google
          </button>
        </form>
      )}
    </div>
  );
}
