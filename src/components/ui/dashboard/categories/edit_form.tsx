"use client";

import { Controller, useForm } from "react-hook-form";
import { Category } from "@/lib/definitions";
import { Button, Heading, VStack, HStack, Input, Field, Fieldset, Select, Textarea, NumberInput, Portal, createListCollection, FieldsetErrorText, VisuallyHidden, ColorPicker, parseColor } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { editCategory } from "@/lib/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from "@/lib/definitions";

export default function EditTodo({ category }: { category: Category }) {
  type FormValues = z.infer<typeof CategoryFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: { ...category },
  });

  const onSubmit = handleSubmit((data) => editCategory({ ...data, id: category.id }));
  return (
    <VStack w="full" p={4} spaceY={2} align="start" borderRadius="md" borderWidth="1px">
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Fieldset.Root invalid={!!errors}>
          <Field.Root w="1/2" invalid={!!errors?.name}>
            <Field.Label>Name</Field.Label>
            <Input {...register("name")}></Input>
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root w="1/2" invalid={!!errors?.color}>
            <Field.Label>Name</Field.Label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <ColorPicker.Root name={field.name} defaultValue={parseColor(field.value)} onValueChange={(e) => field.onChange(e.valueAsString)}>
                  <ColorPicker.HiddenInput />
                  <ColorPicker.Control>
                    <ColorPicker.Input />
                    <ColorPicker.Trigger />
                  </ColorPicker.Control>
                  <Portal>
                    <ColorPicker.Positioner>
                      <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                          <ColorPicker.EyeDropper size="sm" variant="outline" />
                          <ColorPicker.Sliders />
                        </HStack>
                      </ColorPicker.Content>
                    </ColorPicker.Positioner>
                  </Portal>
                </ColorPicker.Root>
              )}
            />
            <Field.ErrorText>{errors.color?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" colorPalette="green">
            <FiSave />
            保存
          </Button>
          <FieldsetErrorText>{errors.root?.message}</FieldsetErrorText>
        </Fieldset.Root>
      </form>
    </VStack>
  );
}
