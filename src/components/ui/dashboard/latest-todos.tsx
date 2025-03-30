import { VStack, Text } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredTodos } from "@/lib/actions";
import TodoCard from "./todos/todo_card";

export default async function LatestTodos() {
  //const Todos = await fetchFilteredTodos();
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
