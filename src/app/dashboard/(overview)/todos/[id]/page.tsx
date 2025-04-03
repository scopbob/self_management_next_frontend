import { Metadata } from "next";
import { fetchTodo, fetchCategory } from "@/lib/actions";
import TodoDetail from "@/components/ui/dashboard/todos/detail";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const todo = await fetchTodo(Number(params.id));
  let category = undefined;
  if (todo.category) {
    category = await fetchCategory(todo.category);
  }
  return (
    <main>
      <TodoDetail todo={todo} category={category} />
    </main>
  );
}
