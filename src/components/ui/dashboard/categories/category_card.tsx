"use client";

import NextLink from "next/link";

import { IconButton, Card, Heading, HStack, VStack, ColorSwatch, Link } from "@chakra-ui/react";

import { MdEdit } from "react-icons/md";
import { Category } from "@/lib/definitions";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card.Root w="full" px="6" py="3" size="sm" boxShadow="xl" borderRadius="lg" borderColor={category.color} borderWidth="2px">
      <Card.Header w="full" px="0" py="2">
        <HStack w="full">
          <Link asChild>
            <NextLink href={`categories/${String(category.id)}`}>
              <Heading>{category.name}</Heading>
            </NextLink>
          </Link>
          <NextLink href={`categories/${String(category.id)}/edit`}>
            <IconButton aria-label="edit" colorPalette="gray" rounded="full" size="xs">
              <MdEdit />
            </IconButton>
          </NextLink>
          <ColorSwatch marginLeft="auto" value={category.color} size="xl" />
        </HStack>
      </Card.Header>
      <VStack w="full"></VStack>
    </Card.Root>
  );
}
