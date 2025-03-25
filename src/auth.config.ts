import type { NextAuthConfig } from "next-auth";
import { getIsTokenValid } from "./lib/auth-helpers";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // セッションをJWTベースにする
    maxAge: 60 * 60 * 24 * 1, // セッションの有効期限（1日）
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (account?.provider === "Credentials") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
