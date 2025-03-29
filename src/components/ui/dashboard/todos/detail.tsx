import NextLink from "next/link";
import { Todo } from "@/lib/definitions";
import { Button, Heading, Text, VStack, HStack, Box, Progress, IconButton, For } from "@chakra-ui/react";
import { FiChevronLeft, FiEdit, FiTrash } from "react-icons/fi";

// Todo 詳細ページコンポーネント
export default function TodoDetail(todo: Todo) {
  return (
    <VStack align="start" p={6} h="100vh" w="full">
      <IconButton size="xl" variant="ghost" asChild>
        <NextLink href=".">
          <FiChevronLeft />
        </NextLink>
      </IconButton>
      <Heading size="3xl">Detail:</Heading>
      <VStack w="full" p={4} align="start" borderRadius="md" borderWidth="1px">
        <HStack>
          <Heading>{todo.title}</Heading>
          <For each={todo.category}>
            {(item, index) => (
              <Box borderWidth="1px" key={index} p="4">
                <Text fontWeight="bold">{item.name}</Text>
                <Text color="fg.muted">Powers: {item.color}</Text>
              </Box>
            )}
          </For>
        </HStack>
        <Text mt={2}>{todo.text}</Text>
        <HStack mt={4}>
          <Text>開始: {new Date(todo.start).toLocaleString()}</Text>
        </HStack>
        <HStack mt={2}>
          <Text>期限: {new Date(todo.due).toLocaleString()}</Text>
        </HStack>
        <HStack mt={4} w="full" spaceX="4">
          <Text fontSize="xl">進捗: {todo.progress} /100</Text>
          <Text fontSize="xl">優先度: {todo.priority}</Text>
        </HStack>
        <HStack mt={6}>
          <NextLink href={`${todo.id}/edit`}>
            <Button colorPalette="green">
              <FiEdit />
              編集
            </Button>
          </NextLink>

          <IconButton colorPalette="red" aria-label="delete">
            <FiTrash />
          </IconButton>
        </HStack>
      </VStack>
    </VStack>
  );
}
