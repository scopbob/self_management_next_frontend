"use client";

import NextLink from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Menu, Button, Portal, HStack, Text, ColorSwatch } from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import { Category } from "@/lib/definitions";

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete("category");

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" variant="outline">
          Category
          <FaCaretDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item key={-1} asChild value={"-1"}>
              <NextLink href={`${pathname}?${params.toString()}`}>なし</NextLink>
            </Menu.Item>
            {categories.map((category) => {
              params.set("category", String(category.id));
              return (
                <Menu.Item key={category.id} asChild value={category.name}>
                  <NextLink href={`${pathname}?${params.toString()}`}>
                    <HStack w="full">
                      <Text>{category.name}</Text>
                      <ColorSwatch value={category.color} alignSelf="end" />
                    </HStack>
                  </NextLink>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
