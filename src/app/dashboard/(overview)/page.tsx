import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LatestTodos from "@/components/ui/dashboard/latest-todos";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await redirect("/dashboard/session_out");
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <LatestTodos number={5} />
    </main>
  );
}
