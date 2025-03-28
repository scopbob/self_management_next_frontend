import NextLink from "next/link";
import { TodoState } from "@/lib/definitions";
import { Button, Heading, Text, VStack, HStack, Box, Progress, IconButton } from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";

// Todo 詳細ページコンポーネント
export default function TodoDetail(todo: TodoState) {
  return (
    <VStack align="start" p={6} h="100vh" w="full">
      <Heading size="3xl">Detail:</Heading>
      <Box w="full" p={4} borderRadius="md" borderWidth="1px">
        <Heading>{todo.title}</Heading>
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
      </Box>
    </VStack>
  );
}
