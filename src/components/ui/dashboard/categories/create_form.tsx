"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Heading, VStack, HStack, Input, Field, Fieldset, Select, Textarea, NumberInput, Portal, createListCollection, FieldsetErrorText, VisuallyHidden, Stack, ColorPicker, parseColor } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { createCategory } from "@/lib/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryCreateSchema } from "@/lib/definitions";

export default function CreateCategory() {
  type FormValues = z.infer<typeof CategoryCreateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(CategoryCreateSchema),
    defaultValues: { color: "#000000" },
  });

  const onSubmit = handleSubmit((data) => createCategory({ ...data }));
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
