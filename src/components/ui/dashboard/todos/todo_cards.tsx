"use client";

import { VStack, For, HStack, Button, Checkbox, CheckboxGroup, Fieldset, Text } from "@chakra-ui/react";
import { Category, Todo } from "@/lib/definitions";
import { MdDelete } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { deleteTodos } from "@/lib/actions";
import TodoCard from "./todo_card";
import CategoryFilter from "./filteres";
import Order from "./orderes";

const formSchema = z.object({
  id: z.array(z.string()).min(1, {
    message: "You must select at least one todo.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function TodosCards({ todos, categories, reverse }: { todos: Todo[]; categories: Category[]; reverse: boolean }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const id = useController({
    control,
    name: "id",
    defaultValue: [],
  });
  const invalid = !!errors.id;

  const categories_ids = categories.map((category) => category.id);

  return (
    <VStack alignItems="stretch" w="full">
      <form onSubmit={handleSubmit((data) => deleteTodos(data.id.map((x) => Number(x))))}>
        <Fieldset.Root invalid={invalid}>
          <HStack>
            <Button type="submit" size="sm" alignSelf="start" mb="1" mx="2" colorPalette="red">
              <MdDelete />
              delete
            </Button>
            <Text>Filter: </Text>
            <CategoryFilter categories={categories} />
            <Order reverse={reverse} />
          </HStack>

          <VStack spaceY="0.5">
            <CheckboxGroup invalid={invalid} value={id.field.value.map((x) => String(x))} onValueChange={id.field.onChange} name={id.field.name} w="full">
              <For each={todos}>
                {(todo: Todo, i: number) => (
                  <HStack key={i} w="full">
                    <Checkbox.Root value={String(todo.id)} variant="outline">
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label />
                    </Checkbox.Root>
                    <TodoCard todo={todo} key={todo.id} category={categories[categories_ids.indexOf(todo.category)]} />
                  </HStack>
                )}
              </For>
            </CheckboxGroup>
          </VStack>
        </Fieldset.Root>
      </form>
    </VStack>
  );
}
