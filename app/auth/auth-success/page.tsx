// todo. Here we will design the success page for Auth

import Link from "next/link";
// import { MailCheck } from "lucide-react"; // Optional: install lucide-react or use an SVG

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-900/20 rounded-full">
            <div className="w-12 h-12 text-blue-500 flex items-center justify-center text-3xl">
              ✉️
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Check your email</h1>
          <p className="text-zinc-400">
            We sent a magic link to your inbox. Click the link to sign in securely.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="/auth/sign-in" 
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            &larr; Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}