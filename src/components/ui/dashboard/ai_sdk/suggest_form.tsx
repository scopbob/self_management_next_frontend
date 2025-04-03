"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, IconButton, VStack, Field, Fieldset, Input, HStack } from "@chakra-ui/react";
import { RiAiGenerate } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function PromptForm() {
  const router = useRouter();
  const promptSchema = z.object({
    texts: z.array(
      z.object({
        text: z.string().min(1, "required"),
      })
    ),
  });

  type FormValues = z.infer<typeof promptSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      texts: [{ text: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "texts",
    control,
  });
  const onSubmit = handleSubmit((data) => {
    router.push(`suggest/result?text=${data.texts.map((obj) => obj.text)}`);
  });
  return (
    <VStack m={4} p={4} spaceY={2} align="start" borderRadius="md" borderWidth="1px">
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Fieldset.Root invalid={!!errors}>
          <Fieldset.Legend>今日の予定を入力してください</Fieldset.Legend>
          <Fieldset.HelperText color="red.500">※ プライベート情報、機密情報、または個人情報を送信しないでください。</Fieldset.HelperText>
          <Fieldset.Content>
            <VStack align="center">
              {fields.map((field, index) => {
                return (
                  <Field.Root key={field.id} invalid={!!errors?.texts?.[index]}>
                    <HStack w="full" key={field.id}>
                      <Input
                        placeholder="request"
                        {...register(`texts.${index}.text` as const, {
                          required: true,
                        })}
                      />
                      <IconButton colorPalette="red" onClick={() => remove(index)}>
                        <MdDelete />
                      </IconButton>
                    </HStack>
                    <Field.ErrorText>{errors.texts?.[index]?.text?.message}</Field.ErrorText>
                  </Field.Root>
                );
              })}
              <IconButton size="sm" onClick={() => append({ text: "" })}>
                <FaPlus />
              </IconButton>
            </VStack>
          </Fieldset.Content>
          <Button type="submit" alignSelf="center" maxWidth="30" size="lg" colorPalette="green">
            <RiAiGenerate />
            生成
          </Button>
          <Fieldset.ErrorText>{errors.root?.message}</Fieldset.ErrorText>
        </Fieldset.Root>
      </form>
    </VStack>
  );
}
