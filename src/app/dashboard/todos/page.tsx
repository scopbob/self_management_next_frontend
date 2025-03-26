import LatestTodos from "@/components/ui/dashboard/latest-todos";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <Suspense>
        <LatestTodos />
      </Suspense>
    </main>
  );
}
