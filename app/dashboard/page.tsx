// app/dashboard/page.tsx
import { auth } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";
import DashboardPage from "./DashboardPage";

export default async function Dashboard() {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");

  return <DashboardPage session={session} />;
}
