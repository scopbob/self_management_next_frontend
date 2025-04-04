import { Box, Heading, Table, SkeletonText } from "@chakra-ui/react";

export default function UpcomingTodosSkeleton({ number }: { number: number }) {
  return (
    <Box spaceY="0.5" m="6" p="10" w="full">
      <Heading size="3xl">Upcoming Todos</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Todo</Table.ColumnHeader>
            <Table.ColumnHeader>Progress</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Due</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* Skeleton を使用して読み込み中の表示 */}
          {[...Array(number)].map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <SkeletonText noOfLines={1} />
              </Table.Cell>
              <Table.Cell>
                <SkeletonText noOfLines={1} />
              </Table.Cell>
              <Table.Cell textAlign="end">
                <SkeletonText noOfLines={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
