import NextLink from "next/link";
import { Category, Todo } from "@/lib/definitions";
import { Button, Heading, Text, VStack, HStack, ColorSwatch, IconButton } from "@chakra-ui/react";
import { FiChevronLeft, FiEdit, FiTrash } from "react-icons/fi";

// Todo 詳細ページコンポーネント
export default function TodoDetail({ todo, category }: { todo: Todo; category?: Category }) {
  return (
    <VStack align="start" p={6} h="100vh" w="full">
      <IconButton size="xl" variant="ghost" asChild>
        <NextLink href=".">
          <FiChevronLeft />
        </NextLink>
      </IconButton>
      <Heading size="3xl">Detail:</Heading>
      <VStack w="full" p={4} align="start" borderRadius="md" borderWidth="1px">
        <Heading>{todo.title}</Heading>
        <HStack>
          <Text>Category: </Text>
          {category ? (
            <HStack borderWidth="medium" p="1" borderRadius="md" borderColor={category.color}>
              <Text fontWeight="bold">{category.name}</Text>
              <ColorSwatch value={category.color} />
            </HStack>
          ) : (
            "なし"
          )}
        </HStack>
        <Text mt={2}>{todo.text}</Text>
        <HStack mt={4}>
          <Text>開始: {new Date(todo.start).toLocaleString("ja-JP").slice(0, -3)}</Text>
        </HStack>
        <HStack mt={2}>
          <Text>期限: {new Date(todo.due).toLocaleString("ja-JP").slice(0, -3)}</Text>
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
