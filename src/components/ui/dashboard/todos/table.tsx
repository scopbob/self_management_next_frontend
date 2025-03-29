import { VStack, Text } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchTodos } from "@/lib/actions";
import TodoCard from "./todo_card";

export default async function TodosTable() {
  const Todos = await fetchTodos(); // Fetch data inside the component
  return (
    <VStack
      spaceY="0.5
    "
    >
      {Todos?.map((todo: Todo, i: number) => {
        return <TodoCard {...todo} key={todo.id} />;
      })}
    </VStack>
  );
}
