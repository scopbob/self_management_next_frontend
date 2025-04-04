"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { For, Heading, Box, Center, VStack, ProgressCircle } from "@chakra-ui/react";
import { Category, Todo } from "@/lib/definitions";
import TodoGenerateForm from "@/components/ui/dashboard/todos/generate_form";
import { generateTodayTodo } from "@/lib/generative_ai";
import { orbitron } from "@/components/ui/fonts";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function GenerateTodoForms({ text, categories }: { text: string; categories: Category[] }) {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    (async () => {
      const fetchedTodos = await generateTodayTodo(text);
      setTodos(fetchedTodos);
    })();
  }, []);

  if (!todos) {
    return (
      <Center h="100vh">
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Center>
    );
  }

  return (
    <VStack align="stretch">
      <For each={todos}>
        {(todo, i) => (
          <Box key={i} p="2">
            <Center width="10" mb="1" borderWidth="medium" borderColor="black" borderRadius="md">
              <Heading size="2xl" className={orbitron.className}>
                {i + 1}
              </Heading>
            </Center>
            <TodoGenerateForm key={i} todo={todo} categories={categories} />
          </Box>
        )}
      </For>
    </VStack>
  );
}
