import { Metadata } from "next";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignUpCompletePage() {
  return (
    <VStack h="100vh" justify="center">
      <Box textAlign="center">
        <Heading size="lg">ご登録ありがとうございます！</Heading>
        <Text mt={2} fontSize="md" color="gray.600">
          登録が完了しました。ログイン画面へ進んでください。
        </Text>
      </Box>
      <Button size="lg" asChild>
        <a href="/login">Login</a>
      </Button>
    </VStack>
  );
}
