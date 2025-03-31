import { VStack, For, Box } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredTodos } from "@/lib/actions";

export default async function LatestTodos({ number }: { number: number }) {
  const todos = await fetchFilteredTodos("", 1, number);
  return (
    <VStack spaceY="0.5" w="full">
      <For each={todos}>{(todo: Todo, i: number) => <Box key={todo.id}>{todo.title}</Box>}</For>
    </VStack>
  );
}
