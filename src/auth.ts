import NextAuth, { CredentialsSignin } from "next-auth";
import { ZodError } from "zod";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { SigninFormSchema } from "@/lib/definitions";
import { getIsTokenValid } from "./lib/auth-helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await SigninFormSchema.parseAsync(credentials);

          // Django API にログインリクエストを送る
          const response = await fetch(process.env.API_URL + "/account/auth/token/pair", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (!response.ok) return null;

          const data = await response.json();
          return {
            email: data.email,
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            throw new CredentialsSignin("Invalid input format");
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //auth.jsを用いてtokenのrefreshを試みたが、token.access_tokenが固定されてしまい、何度もrefreshされてしまう。sessionで代入はされているようで、session.accessTokenは変更されているため、一応動作はする。
      if (user) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: user.accessToken,
          refresh_token: user.refreshToken,
        };
      } else if (getIsTokenValid(token.access_token as string)) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");

        try {
          const response = await fetch(process.env.API_URL + "/account/auth/token/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refresh_token }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            refresh?: string;
            access: string;
          };
          return {
            ...token,
            access_token: newTokens.access,
            refresh_token: newTokens.refresh ? newTokens.refresh : token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      session.refreshToken = token.refresh_token as string;
      session.error = token.error as "RefreshTokenError";
      if (token.email === "guest@example.com") session.isGuest = true;
      else session.isGuest = false;
      return session;
    },
  },
});
