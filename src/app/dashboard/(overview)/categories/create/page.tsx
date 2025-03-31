import { Metadata } from "next";
import CreateCategory from "@/components/ui/dashboard/categories/create_form";
import { VStack, Heading } from "@chakra-ui/react";
import { lusitana } from "@/components/ui/fonts";
import { fetchCategories } from "@/lib/actions";
import { Category } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <VStack p={2} w="full">
      <Heading alignSelf="start" size="4xl" className={lusitana.className} px="3" pt="5">
        Create Category
      </Heading>
      <CreateCategory />
    </VStack>
  );
}
