"use client";

import { Button, Container, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { guestLogin } from "@/lib/actions";

export default function IntroductionPage() {
  const handleGuestLogin = async () => {
    // ゲストとしてログイン
    await guestLogin();
  };
  return (
    <VStack minH="100vh" justify="center">
      <Heading size="2xl" fontWeight="bold" mb={4}>
        Todo管理アプリ
      </Heading>
      <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto" mb={6} whiteSpace="pre-line">
        こちらはTodo管理アプリです。 あなたの現在の進行度と残り時間を記録することができます。 いつもやらなければいけないことを後回しにしてしまう人もこのアプリを使えば、後回し癖を解消できるかも。
      </Text>
      <HStack p="3" spaceX="5">
        <Button size="lg" fontWeight="700" asChild>
          <NextLink href="/login">
            <FiLogIn />
            Login
          </NextLink>
        </Button>

        <Button colorPalette="blue" fontWeight="700" size="lg" asChild>
          <NextLink href="/signup">
            <FaUserPlus />
            Signup
          </NextLink>
        </Button>
      </HStack>
      <Button variant="surface" fontWeight="700" size="lg" onClick={handleGuestLogin}>
        <FaUser />
        Guest Login
      </Button>
    </VStack>
  );
}
