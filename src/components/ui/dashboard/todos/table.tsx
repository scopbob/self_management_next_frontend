import { VStack, For } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredTodos } from "@/lib/actions";
import TodoCard from "./todo_card";

export default async function TodosTable({ search, currentPage, items_per_page }: { search: string; currentPage: number; items_per_page: number }) {
  const todos = await fetchFilteredTodos(search, currentPage, items_per_page); // Fetch data inside the component
  return (
    <VStack spaceY="0.5" w="full">
      <For each={todos}>{(todo: Todo, i: number) => <TodoCard todo={todo} key={todo.id} />}</For>
    </VStack>
  );
}
