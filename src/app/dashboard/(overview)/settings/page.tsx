import { Metadata } from "next";
import NextLink from "next/link";
import { auth } from "@/auth";
import { VStack, Heading, Card, Avatar, Text, HStack, Button } from "@chakra-ui/react";
import { lusitana } from "@/components/ui/fonts";
import PasswordForm from "@/components/ui/auth/password-form";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  const email = session?.user?.email;
  const avatarSrc = session?.user?.image ? process.env.NEXT_PUBLIC_MEDIA_URL + session.user.image : undefined;
  return (
    <VStack h="full" align="center">
      <Heading alignSelf="start" size="4xl" className={lusitana.className} px="3" pt="5">
        Settings
      </Heading>
      <VStack w="full" p={4}>
        <Card.Root w="full" bg={{ base: "gray.100", _dark: "gray.400" }} p={4} borderRadius="md">
          <Card.Header>アバター</Card.Header>
          <Card.Body>
            <HStack>
              <Avatar.Root size="2xl">
                <Avatar.Fallback />
                <Avatar.Image src={avatarSrc} />
              </Avatar.Root>
              <Text display="block">{email}</Text>
            </HStack>
            <Button mt={2} asChild>
              <NextLink href="settings/avatar/chat">アバターを変更する</NextLink>
            </Button>
          </Card.Body>
        </Card.Root>
        <Card.Root w="full" bg={{ base: "gray.100", _dark: "gray.400" }} p={4} borderRadius="md">
          <Card.Header>パスワード変更</Card.Header>
          <Card.Body>
            <PasswordForm />
          </Card.Body>
        </Card.Root>
      </VStack>
    </VStack>
  );
}
