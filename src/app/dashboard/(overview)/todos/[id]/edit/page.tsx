import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategories, fetchTodo } from "@/lib/actions";
import TodoEdit from "@/components/ui/dashboard/todos/edit_form";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [todo, categories] = await Promise.all([fetchTodo(Number(params.id)), fetchCategories()]);
  return (
    <main>
      <TodoEdit todo={todo} categories={categories} />
    </main>
  );
}
