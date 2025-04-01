import { VStack, For, Box, Table, Heading } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { fetchFilteredTodos } from "@/lib/actions";

export default async function LatestTodos({ number }: { number: number }) {
  const todos = await fetchFilteredTodos("", 1, number);
  return (
    <Box spaceY="0.5" m="6" p="10" w="full">
      <Heading size="3xl">Latest Todos</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Todo</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Due</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map((todo: Todo) => (
            <Table.Row key={todo.id}>
              <Table.Cell>{todo.title}</Table.Cell>
              <Table.Cell>{todo.category?.name}</Table.Cell>
              <Table.Cell textAlign="end">{new Date(todo.due).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
