import { VStack, Text } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { generateTodayTodo } from "@/lib/generative_ai";
import TodoCard from "../todos/todo_card";

export default async function SuggestTodayTodos({ todo }: { todo: Todo }) {
  return (
    <VStack spaceY="0.5">
      <TodoCard todo={{ ...todo, category: { id: 1, name: "ai", color: "#000000" } }} />
    </VStack>
  );
}
