import { VStack, For } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredTodos } from "@/lib/actions";
import TodoCards from "./todo_cards";

export default async function TodosTable({ search, currentPage, items_per_page }: { search: string; currentPage: number; items_per_page: number }) {
  const todos = await fetchFilteredTodos(search, currentPage, items_per_page, "id", false); // Fetch data inside the component
  return <TodoCards todos={todos} />;
}
