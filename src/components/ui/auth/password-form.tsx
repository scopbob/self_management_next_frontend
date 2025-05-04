"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { Button, Field, Fieldset, For, List } from "@chakra-ui/react";
import { useActionState } from "react";
import { changePassword } from "@/lib/actions";
import { FormState } from "@/lib/definitions";

export default function PasswordForm() {
  const initialState: FormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(changePassword, initialState);
  return (
    <form action={formAction}>
      <Fieldset.Root invalid={!!state?.errors}>
        <Field.Root invalid={!!state?.errors?.password1}>
          <Field.Label>Password</Field.Label>
          <PasswordInput id="password1" name="password1" placeholder="Enter your password" />
          <Field.ErrorText>
            <List.Root>
              <For each={state?.errors?.password1}>{(item, index) => <List.Item key={index}>{item}</List.Item>}</For>
            </List.Root>
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!state?.errors?.password2}>
          <Field.Label>Confirm Password</Field.Label>
          <PasswordInput id="password2" name="password2" placeholder="Enter your password again" />
          <Field.ErrorText>
            <List.Root>
              <For each={state?.errors?.password2}>{(item, index) => <List.Item key={index}>{item}</List.Item>}</For>
            </List.Root>
          </Field.ErrorText>
        </Field.Root>
        <Button type="submit" w="full">
          Save
        </Button>
        <Fieldset.ErrorText>{state?.message}</Fieldset.ErrorText>
      </Fieldset.Root>
    </form>
  );
}
