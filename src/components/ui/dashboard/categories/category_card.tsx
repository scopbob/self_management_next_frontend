"use client";

import NextLink from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, IconButton, Checkbox, Card, Heading, Progress, HStack, Input, Text, VStack, Field, Fieldset, Link } from "@chakra-ui/react";
import { BsPersonWalking } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { Category } from "@/lib/definitions";

export default function TodoCard({ category }: { category: Category }) {
  return (
    <Card.Root w="full" px="6" py="3" size="sm" boxShadow="xl" borderRadius="lg" borderColor={category.color} borderWidth="2px">
      <Card.Header w="full" px="0" py="2">
        <HStack w="full" justify="start">
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label />
          </Checkbox.Root>
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
        </HStack>
      </Card.Header>
      <VStack w="full"></VStack>
    </Card.Root>
  );
}
