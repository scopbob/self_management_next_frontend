// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    picture: string;
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    isGuest: boolean;
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
