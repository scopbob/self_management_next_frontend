import { VStack, For } from "@chakra-ui/react";
import { Category } from "@/lib/definitions";
import { fetchFilteredCategories } from "@/lib/actions";
import CategoryCard from "./category_card";

export default async function CategoriesTable({ search, currentPage, items_per_page }: { search: string; currentPage: number; items_per_page: number }) {
  const categories = await fetchFilteredCategories(search, currentPage, items_per_page); // Fetch data inside the component
  return (
    <VStack spaceY="0.5" w="full">
      <For each={categories}>{(category: Category, i: number) => <CategoryCard category={category} key={category.id} />}</For>
    </VStack>
  );
}
