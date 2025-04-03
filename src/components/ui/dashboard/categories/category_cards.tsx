"use client";

import { VStack, For, HStack, Button, Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { Category } from "@/lib/definitions";
import { MdDelete } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { deleteCategories } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import CategoryCard from "./category_card";

const formSchema = z.object({
  id: z.array(z.string()).min(1, {
    message: "You must select at least one todo.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function TodosCards({ categories }: { categories: Category[] }) {
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
      <form onSubmit={handleSubmit((data) => deleteCategories(data.id.map((x) => Number(x))))}>
        <Fieldset.Root invalid={invalid}>
          <Button type="submit" size="sm" alignSelf="start" mb="1" mx="2" colorPalette="red">
            <MdDelete />
            delete
          </Button>
          <VStack spaceY="0.5">
            <CheckboxGroup invalid={invalid} value={id.field.value.map((x) => String(x))} onValueChange={id.field.onChange} name={id.field.name} w="full">
              <For each={categories}>
                {(category: Category, i: number) => (
                  <HStack key={i} w="full">
                    <Checkbox.Root value={String(category.id)} variant="outline">
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label />
                    </Checkbox.Root>
                    <CategoryCard category={category} key={category.id} />
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
