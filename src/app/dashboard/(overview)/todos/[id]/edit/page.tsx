import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategories, fetchTodo } from "@/lib/actions";
import { Box, Text } from "@chakra-ui/react";
import TodoEdit from "@/components/ui/dashboard/todos/edit_form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const params = await props.params;
  const [todo, categories] = await Promise.all([fetchTodo(Number(params.id)), fetchCategories()]);
  return (
    <Box>
      <TodoEdit todo={todo} categories={categories} />
      {session?.isGuest && <Text>※ ログインすると、実際に編集することができます</Text>}
    </Box>
  );
}
