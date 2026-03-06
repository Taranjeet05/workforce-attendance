import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../db";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/auth-error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      //! Force account selection to avoid "auto-login" loops during testing
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<string | boolean> {
      if (account?.provider !== "google") return false;

      try {
        await connectToDatabase();
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          const defaultImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email ?? "default")}`;
          dbUser = await User.create({
            email: user.email,
            name: profile?.name ?? user.name,
            image: (profile as { picture?: string })?.picture ?? defaultImage,
          });
        }

        user.id = dbUser._id.toString();

        return true;
      } catch (error) {
        console.error("[AUTH] Database error:", error);
        return "/auth/auth-error?error=DatabaseError";
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
