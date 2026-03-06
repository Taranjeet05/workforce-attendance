import { auth } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  } else {
    redirect("/dashboard");
  }
}
