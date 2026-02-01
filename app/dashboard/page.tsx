// app/dashboard/page.tsx
import { auth, signOut } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="mt-4 p-4 bg-zinc-100 rounded dark:bg-zinc-800 overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
        className="mt-8"
      >
        <button className="text-red-500 hover:underline">Sign Out</button>
      </form>
    </div>
  );
}
