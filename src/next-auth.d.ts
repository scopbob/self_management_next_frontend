import NextAuth, { type User } from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}
