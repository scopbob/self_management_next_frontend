import { auth } from "@/auth";
import { FiLogOut } from "react-icons/fi";
import NextLink from "next/link";
import NavLinks from "@/components/ui/dashboard/nav-links";
import { handleLogout } from "@/lib/actions";
import { Box, Stack, VStack, Button, Heading, Text, Avatar, HStack } from "@chakra-ui/react";

export default async function SideNav() {
  const session = await auth();
  const email = session?.user?.email;
  const avatarSrc = session?.user?.image ? process.env.NEXT_PUBLIC_MEDIA_URL + session.user.image : undefined;
  return (
    <VStack h="full" bg={{ base: "gray.100", _dark: "gray.400" }} p={4}>
      {/* ヘッダー部分 */}
      <NextLink className="w-full" href="/">
        <Box w="full" bg="gray.700" color="white" p={4} borderRadius="md">
          <Heading size="md">Self Manager</Heading>
        </Box>
      </NextLink>

      {/* ナビゲーション部分 */}
      <Stack display="flex" flexGrow="1" direction={{ base: "row", md: "column" }} justify={{ base: "space-between", md: "flex-start" }} w="full" padding={2} mt={2}>
        <NavLinks />

        {/* 余白のボックス */}
        <Box flexGrow="1" display={{ base: "none", md: "block" }} />

        {/* ユーザー情報部分 */}
        <HStack align="center" mb={{ base: "0", md: "2" }} justifyContent={{ base: "space-between", md: "flex-start" }}>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image src={avatarSrc} />
          </Avatar.Root>
          <Text display={{ base: "none", md: "block" }}>{email}</Text>
        </HStack>

        {/* ログアウトボタン */}
        <form
          action={async () => {
            "use server";
            await handleLogout();
          }}
        >
          <Button colorPalette="red" type="submit" w="full" textAlign="left">
            <FiLogOut />
            <Text display={{ base: "none", md: "block" }}>Sign Out</Text>
          </Button>
        </form>
      </Stack>
    </VStack>
  );
}
