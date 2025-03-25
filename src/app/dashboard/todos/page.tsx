import LatestTodos from "@/components/ui/dashboard/latest-todos";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <Suspense>
        <LatestTodos />
      </Suspense>
    </main>
  );
}
