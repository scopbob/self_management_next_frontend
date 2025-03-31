"use client";

import { Controller, useForm } from "react-hook-form";
import { Category } from "@/lib/definitions";
import { Button, VStack, Field, Fieldset, Textarea } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateTodayTodo } from "@/lib/generative_ai";

export default function PromptForm() {
  const promptSchema = z.object({
    text: z.string(),
  });

  type FormValues = z.infer<typeof promptSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(promptSchema),
  });
  const onSubmit = handleSubmit((data) => generateTodayTodo(data.text));
  return (
    <VStack w="full" p={4} spaceY={2} align="start" borderRadius="md" borderWidth="1px">
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Fieldset.Root invalid={!!errors}>
          <Field.Root invalid={!!errors?.text}>
            <Field.Label>Text</Field.Label>
            <Textarea {...register("text")}></Textarea>
            <Field.ErrorText>{errors.text?.message}</Field.ErrorText>
          </Field.Root>
          <Button type="submit" colorPalette="green">
            <FiSave />
            保存
          </Button>
          <Fieldset.ErrorText>{errors.root?.message}</Fieldset.ErrorText>
        </Fieldset.Root>
      </form>
    </VStack>
  );
}
