import { handleSignOut } from "@/lib/auth/authActions";
import { Session } from "next-auth";

interface DashboardPageProps {
  session: Session;
}

const DashboardPage = async ({ session }: DashboardPageProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="mt-4 p-4 bg-zinc-100 rounded dark:bg-zinc-800 overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>

      <form action={handleSignOut} className="mt-8">
        <button className="text-red-500 hover:underline">Sign Out</button>
      </form>
    </div>
  );
};

export default DashboardPage;
