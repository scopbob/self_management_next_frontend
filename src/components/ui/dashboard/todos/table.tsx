import { Todo } from "@/lib/definitions";
import { fetchFilteredCategories, fetchFilteredTodos } from "@/lib/actions";
import TodoCards from "./todo_cards";

export default async function TodoListView({ search, currentPage, items_per_page, category: category_filter, reverse }: { search: string; currentPage: number; items_per_page: number; category?: number; reverse: boolean }) {
  const todos = await fetchFilteredTodos(search, currentPage, items_per_page, "id", reverse, category_filter); // Fetch data inside the component

  const categories_ids: number[] = Array.from(new Set(todos.map((todo: Todo) => todo.category).filter((item: number) => item != null)));
  const categories = await fetchFilteredCategories({ ids: categories_ids });

  return <TodoCards todos={todos} categories={categories} reverse={reverse} />;
}
