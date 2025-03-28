"use client";

import { Controller, useForm } from "react-hook-form";
import { TodoForm } from "@/lib/definitions";
import { Button, Heading, VStack, HStack, Input, Field, Fieldset, Select, Textarea, NumberInput, Portal, createListCollection, FieldsetErrorText, VisuallyHidden } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { editTodo } from "@/lib/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormSchema } from "@/lib/definitions";

function convetDateToIso(d: Date) {
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

const priority_choices = createListCollection({
  items: [
    { label: "high", value: "Hi" },
    { label: "middle", value: "Md" },
    { label: "low", value: "Lo" },
  ],
});

export default function EditTodo(todo: TodoForm) {
  type FormValues = z.infer<typeof TodoFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(TodoFormSchema),
    defaultValues: { ...todo, start: convetDateToIso(new Date(todo.start)), due: convetDateToIso(new Date(todo.due + "")), priority: [todo.priority] },
  });

  const onSubmit = handleSubmit((data) => editTodo({ ...data, due: new Date(todo.due).toISOString(), priority: data.priority[0] }));
  return (
    <VStack align="start" p={6} w="full">
      <Heading size="3xl">Edit:</Heading>
      <VStack w="full" p={4} spaceY={2} align="start" borderRadius="md" borderWidth="1px">
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Fieldset.Root invalid={!!errors}>
            <VisuallyHidden asChild>
              <input {...register("id")} />
            </VisuallyHidden>
            <Field.Root w="1/2" invalid={!!errors?.title}>
              <Field.Label>Title</Field.Label>
              <Input {...register("title")}></Input>
              <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors?.text}>
              <Field.Label>Text</Field.Label>
              <Textarea {...register("text")}></Textarea>
              <Field.ErrorText>{errors.text?.message}</Field.ErrorText>
            </Field.Root>

            <HStack mt={4} w={{ base: "full", md: "1/2", lg: "1/4" }}>
              <Field.Root invalid={!!errors?.start}>
                <Field.Label>開始</Field.Label>
                <Input {...register("start")} type="datetime-local" />
                <Field.ErrorText>{errors.start?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.due}>
                <Field.Label>期限</Field.Label>
                <Input {...register("due")} type="datetime-local" />
                <Field.ErrorText>{errors.due?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>
            <Field.Root invalid={!!errors?.progress}>
              <Field.Label>進捗</Field.Label>
              <Controller
                name="progress"
                control={control}
                render={({ field }) => (
                  <NumberInput.Root
                    disabled={field.disabled}
                    name={field.name}
                    value={String(field.value)}
                    onValueChange={({ value }) => {
                      field.onChange(Number(value));
                    }}
                    step={1}
                    min={0}
                    max={100}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input onBlur={field.onBlur} />
                  </NumberInput.Root>
                )}
              />
              <Field.ErrorText>{errors.progress?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root w={{ base: "full", md: "1/2", lg: "1/4" }} invalid={!!errors?.priority}>
              <Field.Label>優先度</Field.Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select.Root name={field.name} value={field.value} onValueChange={({ value }) => field.onChange(value)} onInteractOutside={() => field.onBlur()} collection={priority_choices}>
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="select priority" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {priority_choices.items.map((priority_choice) => (
                            <Select.Item item={priority_choice} key={priority_choice.value}>
                              {priority_choice.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.ErrorText>{errors.priority?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" colorPalette="green">
              <FiSave />
              保存
            </Button>
            <FieldsetErrorText>{errors.root?.message}</FieldsetErrorText>
          </Fieldset.Root>
        </form>
      </VStack>
    </VStack>
  );
}
