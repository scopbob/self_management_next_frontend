"use client";

import { useActionState } from "react";
import { TodoState } from "@/lib/definitions";
import { Button, Heading, Text, VStack, HStack, Box, Input, IconButton } from "@chakra-ui/react";
import { FiSave, FiTrash } from "react-icons/fi";
import { editTodo } from "@/lib/actions";

export default function EditTodo(todo: TodoState) {
  const [errorMessage, formAction, isPending] = useActionState(editTodo, undefined);
  return (
    <VStack align="start" p={6} w="full">
      <Box w="full" p={4} borderRadius="md" borderWidth="1px">
        <form action={formAction}>
          <Heading>編集: {todo.title}</Heading>
          <Text mt={2}>{todo.text}</Text>

          <HStack mt={4} w="full">
            <Text>開始: </Text>
            <Input defaultValue={new Date(todo.start).toLocaleString()} type="datetime-local" />
          </HStack>

          <HStack mt={2} w="full">
            <Text>期限: </Text>
            <Input defaultValue={new Date(todo.due).toLocaleString()} type="datetime-local" />
          </HStack>

          <HStack mt={4} w="full">
            <Text>進捗: </Text>
            <Input type="number" defaultValue={todo.progress} />
          </HStack>

          <HStack mt={4} w="full">
            <Text>優先度: </Text>
            <Input type="number" defaultValue={todo.priority} />
          </HStack>

          <HStack mt={6}>
            <Button colorScheme="green">
              <FiSave />
              保存
            </Button>
            <IconButton colorScheme="red" aria-label="delete">
              <FiTrash />
            </IconButton>
          </HStack>
        </form>
      </Box>
    </VStack>
  );
}
