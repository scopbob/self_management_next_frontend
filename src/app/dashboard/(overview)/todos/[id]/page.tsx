import { Suspense } from "react";
import { Metadata } from "next";
import { fetchTodo } from "@/lib/actions";
import TodoDetail from "@/components/ui/dashboard/todos/detail";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const Todo = await fetchTodo(Number(params.id)); // Fetch data inside the component
  return (
    <main>
      <TodoDetail {...Todo} />
    </main>
  );
}
