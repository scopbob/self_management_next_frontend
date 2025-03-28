import TodosTable from "@/components/ui/dashboard/todos/table";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <TodosTable />
    </main>
  );
}
