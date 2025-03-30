import { Metadata } from "next";
import CreateTodo from "@/components/ui/dashboard/todos/create_form";
import { VStack, Heading } from "@chakra-ui/react";
import { lusitana } from "@/components/ui/fonts";
import { fetchCategories } from "@/lib/actions";
import { Category } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const categories: Category[] = await fetchCategories();
  return (
    <VStack p={2} w="full">
      <Heading alignSelf="start" size="4xl" className={lusitana.className} px="3" pt="5">
        Create Todo
      </Heading>
      <CreateTodo categories={categories} />
    </VStack>
  );
}
