"use client";

import { VStack, For, HStack, Button, Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { Todo } from "@/lib/definitions";
import { MdDelete } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { deleteTodos } from "@/lib/actions";
import TodoCard from "./todo_card";

const formSchema = z.object({
  id: z.array(z.string()).min(1, {
    message: "You must select at least one todo.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function TodosCards({ todos }: { todos: Todo[] }) {
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

  return (
    <VStack alignItems="stretch" w="full">
      <form onSubmit={handleSubmit((data) => deleteTodos(data.id.map((x) => Number(x))))}>
        <Fieldset.Root invalid={invalid}>
          <Button type="submit" size="sm" mb="1" colorPalette="red">
            <MdDelete />
            delete
          </Button>
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
                    <TodoCard todo={todo} key={todo.id} />
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
