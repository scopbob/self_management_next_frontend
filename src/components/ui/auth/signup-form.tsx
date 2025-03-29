"use client";

import NextLink from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, IconButton, Card, Heading, Input, Text, VStack, Field, Fieldset, Link, For, List } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useActionState } from "react";
import { createAccount } from "@/lib/actions";
import { FormState } from "@/lib/definitions";

export default function SignUpForm() {
  const initialState: FormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAccount, initialState);
  return (
    <VStack minH="100vh" justify="center">
      <Card.Root w="sm" p={6} boxShadow="xl" borderRadius="lg">
        <IconButton position="absolute" top={6} left={4} variant="ghost">
          <NextLink href="/">
            <FiChevronLeft />
          </NextLink>
        </IconButton>
        <Card.Header>
          <Heading size="lg" textAlign="center">
            Create Account
          </Heading>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Please Sign up
          </Text>
        </Card.Header>
        <Card.Body>
          <form action={formAction}>
            <Fieldset.Root invalid={!!state?.errors}>
              <Field.Root invalid={!!state?.errors?.email}>
                <Field.Label>Email address</Field.Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" />
                <Field.ErrorText>
                  <List.Root>
                    <For each={state?.errors?.email}>{(item, index) => <List.Item key={index}>{item}</List.Item>}</For>
                  </List.Root>
                </Field.ErrorText>
              </Field.Root>
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
              <Button type="submit" colorPalette="blue" w="full">
                Sign Up
              </Button>
              <Fieldset.ErrorText>{state?.message}</Fieldset.ErrorText>
              <Text>
                または
                <Link asChild variant="underline" colorPalette="teal">
                  <NextLink href="login">ログイン</NextLink>
                </Link>
                する
              </Text>
            </Fieldset.Root>
          </form>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
}
