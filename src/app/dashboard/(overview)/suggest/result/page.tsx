import NextLink from "next/link";
import { Metadata } from "next";
import { fetchCategories } from "@/lib/actions";
import { For, Heading, Box, Center, Text, Link, VStack } from "@chakra-ui/react";
import { Category, Todo } from "@/lib/definitions";
import TodoGenerateForms from "@/components/ui/dashboard/todos/generate_forms";
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
  const text = searchParams?.text || "";
  const categories: Category[] = await fetchCategories();
  const session = await auth();

  return (
    <Box>
      <Heading size="4xl" className={lusitana.className} px="3" pt="5">
        Results
      </Heading>
      <TodoGenerateForms text={text} categories={categories} />

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
