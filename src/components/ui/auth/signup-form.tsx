"use client";

import NextLink from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, IconButton, Card, Heading, Input, Text, VStack, Field, Fieldset, Link } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useActionState } from "react";
import { createAccount } from "@/lib/actions";
import { FormState } from "@/lib/definitions";

export default function SignUpForm() {
  const initialState: FormState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createAccount, initialState);
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
            <Fieldset.Root invalid={!!state}>
              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput id="password1" name="password1" placeholder="Enter your password" />
                {state.errors?.password1 &&
                  state.errors.password1.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </Field.Root>
              <Field.Root>
                <Field.Label>Confirm Password</Field.Label>
                <PasswordInput id="password2" name="password2" placeholder="Enter your password again" />
                {state.errors?.password2 &&
                  state.errors.password2.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
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
