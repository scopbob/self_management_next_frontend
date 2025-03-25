import clsx from "clsx";
import { TodoState } from "@/lib/definitions";
import { fetchTodos } from "@/lib/actions";

export default async function LatestTodos() {
  const Todos = await fetchTodos(); // Fetch data inside the component
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className=" mb-4 text-xl md:text-2xl">Latest Todos</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {Todos?.map((todo: TodoState, i: number) => {
            return (
              <div
                key={todo.id}
                className={clsx("flex flex-row items-center justify-between py-4", {
                  "border-t": i !== 0,
                })}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">{todo.title}</p>
                  </div>
                </div>
                <p className="truncate text-sm font-medium md:text-base">{todo.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
