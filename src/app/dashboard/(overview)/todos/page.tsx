import TodosTable from "@/components/ui/dashboard/todos/table";
import Pagination from "@/components/ui/dashboard/todos/pagination";
import { Suspense } from "react";
import { Metadata } from "next";
import { Button, Heading, HStack, VStack, ButtonGroup, IconButton, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import Search from "@/components/ui/dashboard/todos/search";
import { lusitana } from "@/components/ui/fonts";
import { fetchTodosCount } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    category?: number;
    reverse: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const category = searchParams?.category;
  const reverse = searchParams?.reverse === "true" || false;
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 5;
  const count = (await fetchTodosCount(search)) || 1;

  return (
    <VStack h="full" p={2}>
      <Heading size="4xl" alignSelf="start" className={lusitana.className} px="3" pt="5">
        Todo
      </Heading>
      <HStack px="2" mb="1" spaceX="1" w="full">
        <Search placeholder="Search todos..." />
        <Button colorPalette="blue" variant="solid" size="lg" asChild>
          <NextLink href="todos/create">Create</NextLink>
        </Button>
      </HStack>
      <TodosTable search={search} currentPage={currentPage} items_per_page={ITEMS_PER_PAGE} category={category} reverse={reverse} />
      <Box flexGrow="1" display={{ base: "none", md: "block" }} />
      <VStack py="2" w="full">
        <Pagination count={count} pageSize={ITEMS_PER_PAGE} />
      </VStack>
    </VStack>
  );
}
