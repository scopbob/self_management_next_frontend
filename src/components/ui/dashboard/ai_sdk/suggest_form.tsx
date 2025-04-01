"use client";

import { useForm } from "react-hook-form";
import { Button, VStack, Field, Fieldset, Textarea } from "@chakra-ui/react";
import { RiAiGenerate } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function PromptForm() {
  const router = useRouter();
  const promptSchema = z.object({
    text: z.string(),
  });

  type FormValues = z.infer<typeof promptSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(promptSchema),
  });
  const onSubmit = handleSubmit((data) => {
    router.push(`suggest/result?text=${data.text}`);
  });
  return (
    <VStack m={4} p={4} spaceY={2} align="start" borderRadius="md" borderWidth="1px">
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Fieldset.Root invalid={!!errors}>
          <Field.Root invalid={!!errors?.text}>
            <Field.Label>Request</Field.Label>
            <Textarea {...register("text")}></Textarea>
            <Field.ErrorText>{errors.text?.message}</Field.ErrorText>
          </Field.Root>
          <Button type="submit" colorPalette="green">
            <RiAiGenerate />
            生成
          </Button>
          <Fieldset.ErrorText>{errors.root?.message}</Fieldset.ErrorText>
        </Fieldset.Root>
      </form>
    </VStack>
  );
}
