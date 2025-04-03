import NextLink from "next/link";
import { Category } from "@/lib/definitions";
import { Button, Heading, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FiChevronLeft, FiEdit, FiTrash } from "react-icons/fi";

// Todo 詳細ページコンポーネント
export default function CategoryDetail({ category }: { category: Category }) {
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
          <Heading>{category?.name}</Heading>
        </HStack>
        <HStack mt={6}>
          <NextLink href={`${category?.id}/edit`}>
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
