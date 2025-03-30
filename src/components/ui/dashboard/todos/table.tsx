import { VStack } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredTodos } from "@/lib/actions";
import TodoCard from "./todo_card";

export default async function TodosTable({ search, currentPage, items_per_page }: { search: string; currentPage: number; items_per_page: number }) {
  const Todos = await fetchFilteredTodos(search, currentPage, items_per_page); // Fetch data inside the component
  return (
    <VStack spaceY="0.5" w="full">
      {Todos?.map((todo: Todo, i: number) => {
        return <TodoCard {...todo} key={todo.id} />;
      })}
    </VStack>
  );
}
