import TodosTable from "@/components/ui/dashboard/todos/table";
import { Suspense } from "react";
import { Metadata } from "next";
import { Button, Heading, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import Search from "@/components/ui/dashboard/todos/search";
import { lusitana } from "@/components/ui/fonts";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <Heading size="4xl" className={lusitana.className} px="3" pt="5">
        Todo
      </Heading>
      <HStack px="2" pb="2" spaceX="1">
        <Search placeholder="Search invoices..." />
        <Button colorPalette="blue" variant="solid" size="lg" asChild>
          <NextLink href="todos/create">Create</NextLink>
        </Button>
      </HStack>
      <TodosTable />
    </main>
  );
}
