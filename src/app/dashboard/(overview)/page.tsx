import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await redirect("/dashboard/session_out");
  }
  return <h1>Dashboard</h1>;
}
