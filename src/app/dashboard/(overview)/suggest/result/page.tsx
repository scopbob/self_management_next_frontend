import NextLink from "next/link";
import { Metadata } from "next";
import { fetchCategories } from "@/lib/actions";
import { For, Heading, Box, Center, Text, Link } from "@chakra-ui/react";
import TodoGenerateForm from "@/components/ui/dashboard/todos/generate_form";
import { generateTodayTodo } from "@/lib/generative_ai";
import { lusitana, orbitron } from "@/components/ui/fonts";
import { auth } from "@/auth";

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
  const session = await auth();

  return (
    <Box>
      <Heading size="4xl" className={lusitana.className} px="3" pt="5">
        Results
      </Heading>
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
      <Center>
        {session?.isGuest ? (
          <Text>※ ログインすると、実際に作成することができます</Text>
        ) : (
          <Heading size="xl" px="3" py="5">
            保存したTodoを
            <Link colorPalette="teal" asChild>
              <NextLink href="/dashboard/todos">確認</NextLink>
            </Link>
            する
          </Heading>
        )}
      </Center>
    </Box>
  );
}
