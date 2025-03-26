import { Button, Container, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function IntroductionPage() {
  return (
    <VStack minH="100vh" justify="center">
      <Heading size="2xl" fontWeight="bold" mb={4}>
        Todo管理アプリ
      </Heading>
      <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto" mb={6} whiteSpace="pre-line">
        こちらはTodo管理アプリです。 あなたの現在の進行度と残り時間を記録することができます。 いつもやらなければいけないことを後回しにしてしまう人もこのアプリを使えば、後回し癖を解消できるかも。
      </Text>
      <HStack>
        <Button size="lg" asChild>
          <NextLink href="/login">Login</NextLink>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <NextLink href="/signup">Signup</NextLink>
        </Button>
      </HStack>
    </VStack>
  );
}
