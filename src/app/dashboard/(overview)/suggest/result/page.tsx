import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategories } from "@/lib/actions";
import { For, Heading } from "@chakra-ui/react";
import TodoGenerateForm from "@/components/ui/dashboard/todos/generate_form";
import { generateTodayTodo } from "@/lib/generative_ai";

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
    <main>
      <Heading size="4xl">Here is Results</Heading>
      <For each={todos}>{(todo, i) => <TodoGenerateForm key={i} todo={todo} categories={categories} />}</For>
    </main>
  );
}
