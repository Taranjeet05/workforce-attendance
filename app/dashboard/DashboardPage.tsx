import { handleSignOut } from "@/lib/auth/authActions";
import { Session } from "next-auth";

interface DashboardPageProps {
  session: Session;
}

const DashboardPage = async ({ session }: DashboardPageProps) => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <pre className="mt-4 p-5 bg-zinc-100 rounded dark:bg-zinc-800 overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>

      <form action={handleSignOut} className="mt-8">
        <button className="text-white-500 bg-red-700 py-2 px-5 rounded-lg font-mono text-xl hover:bg-red-900 cursor-pointer">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;
