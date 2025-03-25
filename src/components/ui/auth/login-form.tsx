"use client";

import { Button, Card, Heading, Input, Text, VStack, Field, Fieldset, Link } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  return (
    <VStack minH="100vh" justify="center">
      <Card.Root w="sm" p={6} boxShadow="xl" borderRadius="lg">
        <Card.Header>
          <Heading size="lg" textAlign="center">
            Welcome Back!
          </Heading>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Sign in to continue
          </Text>
        </Card.Header>
        <Card.Body>
          <form action={formAction}>
            <Fieldset.Root invalid={!!errorMessage}>
              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput id="password" name="password" type="password" placeholder="Enter your password" />
              </Field.Root>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <Button type="submit" w="full">
                Sign In
              </Button>
              <Fieldset.ErrorText>{errorMessage}</Fieldset.ErrorText>
              <Text>
                または
                <Link variant="underline" href="signup" colorPalette="teal">
                  登録
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
