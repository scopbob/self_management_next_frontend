import { VStack, For } from "@chakra-ui/react";
import { Category } from "@/lib/definitions";
import { fetchFilteredCategories } from "@/lib/actions";
import CategoryCards from "./category_cards";

export default async function CategoriesTable({ search, currentPage, items_per_page }: { search: string; currentPage: number; items_per_page: number }) {
  const categories = await fetchFilteredCategories(search, currentPage, items_per_page); // Fetch data inside the component
  return <CategoryCards categories={categories} />;
}
