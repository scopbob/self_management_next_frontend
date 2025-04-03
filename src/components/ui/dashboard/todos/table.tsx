import { VStack, For } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredCategories, fetchFilteredTodos } from "@/lib/actions";
import TodoCards from "./todo_cards";

export default async function TodosTable({ search, currentPage, items_per_page }: { search: string; currentPage: number; items_per_page: number }) {
  const todos = await fetchFilteredTodos(search, currentPage, items_per_page, "id", false); // Fetch data inside the component
  const categories_ids: number[] = Array.from(new Set(todos.map((todo: Todo) => todo.category).filter((item: number) => item != null)));
  const categories = await fetchFilteredCategories({ ids: categories_ids });
  return <TodoCards todos={todos} categories={categories} />;
}
