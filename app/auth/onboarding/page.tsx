import { auth } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";
import OnboardingForm from "./OnBoardingForm";

const OnboardingPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  if (!session || !session.user.email) redirect("/auth/sign-in");
  if (session.user.name) redirect("/dashboard");

  const placeholderImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(session.user?.email || "default")}`;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <OnboardingForm placeholderImage={placeholderImage} />
    </main>
  );
};

export default OnboardingPage;
