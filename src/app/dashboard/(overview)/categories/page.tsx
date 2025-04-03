import TodosTable from "@/components/ui/dashboard/todos/table";
import Pagination from "@/components/ui/dashboard/todos/pagination";
import { Suspense } from "react";
import { Metadata } from "next";
import { Button, Heading, HStack, VStack, ButtonGroup, IconButton, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import Search from "@/components/ui/dashboard/todos/search";
import { lusitana } from "@/components/ui/fonts";
import { fetchCategoriesCount } from "@/lib/actions";
import CategoriesTable from "@/components/ui/dashboard/categories/table";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 8;
  const count = (await fetchCategoriesCount()) || 1;

  return (
    <VStack h="full" p={2}>
      <Heading size="4xl" alignSelf="start" className={lusitana.className} px="3" pt="5">
        Category
      </Heading>
      <HStack px="2" pb="2" spaceX="1" w="full">
        <Search placeholder="Search categories..." />
        <Button colorPalette="blue" variant="solid" size="lg" asChild>
          <NextLink href="categories/create">Create</NextLink>
        </Button>
      </HStack>
      <CategoriesTable search={search} currentPage={currentPage} items_per_page={ITEMS_PER_PAGE} />
      <Box flexGrow="1" display={{ base: "none", md: "block" }} />
      <VStack mt="auto" py="4" w="full">
        <Pagination count={count} pageSize={ITEMS_PER_PAGE} />
      </VStack>
    </VStack>
  );
}
