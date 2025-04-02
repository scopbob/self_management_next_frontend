import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategories } from "@/lib/actions";
import { For, Heading, Box } from "@chakra-ui/react";
import TodoGenerateForm from "@/components/ui/dashboard/todos/generate_form";
import { generateTodayTodo } from "@/lib/generative_ai";
import { lusitana } from "@/components/ui/fonts";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    text?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const [todos, categories] = await Promise.all([generateTodayTodo(searchParams?.text), fetchCategories()]);

  return (
    <Box>
      <Heading size="4xl" className={lusitana.className} px="3" pt="5">
        Results
      </Heading>
      <For each={todos}>
        {(todo, i) => (
          <Box key={i} px="2">
            <Heading>{i + 1}</Heading>
            <TodoGenerateForm key={i} todo={todo} categories={categories} />
          </Box>
        )}
      </For>
    </Box>
  );
}
