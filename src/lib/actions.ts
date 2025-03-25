"use server";

import { redirect } from "next/navigation";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema, FormState, ApiErrorDetail } from "@/lib/definitions";

export async function fetchTodos() {
  const session = await auth();
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + "/todo/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 型エラー防止
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      throw Error;
    }
    return data;
  } catch (error) {}
}

export async function createAccount(State: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password1: formData.get("password1"),
    password2: formData.get("password2"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create an Account.",
    };
  }

  const { email, password1, password2 } = validatedFields.data;
  if (password1 !== password2) {
    return { errors: { password2: ["Passwords do not match"] } };
  }
  try {
    const response = await fetch(process.env.API_URL + "/account/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password1 }),
    });
    if (!response.ok) {
      const data = await response.json();
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      return { errors: error_details };
    }
  } catch (error) {}
  redirect("/signup/complete");
}

export async function handleLogout() {
  const session = await auth();
  if (session?.refreshToken) {
    await fetch(process.env.API_URL + "/account/auth/blacklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: session.refreshToken }),
    });
  }
  await signOut(); // NextAuthのセッションを削除
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
