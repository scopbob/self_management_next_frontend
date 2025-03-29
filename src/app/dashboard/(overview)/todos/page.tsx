import TodosTable from "@/components/ui/dashboard/todos/table";
import { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import Search from "@/components/ui/dashboard/todos/search";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <Button variant="outline" size="lg" asChild>
        <NextLink href="todos/create">Create</NextLink>
      </Button>
      <Search placeholder="Search invoices..." />
      <TodosTable />
    </main>
  );
}
