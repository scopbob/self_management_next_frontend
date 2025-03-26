import { VStack } from "@chakra-ui/react";
import { TodoState } from "@/lib/definitions";
import { fetchTodos } from "@/lib/actions";
import TodoCard from "./todos/todo";

export default async function LatestTodos() {
  const Todos = await fetchTodos(); // Fetch data inside the component
  return (
    <VStack
      spaceY="0.5
    "
    >
      {Todos?.map((todo: TodoState, i: number) => {
        return <TodoCard {...todo} key={todo.id} />;
      })}
    </VStack>
  );
}
