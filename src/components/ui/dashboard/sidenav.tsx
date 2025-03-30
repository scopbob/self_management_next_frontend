import { FiLogOut } from "react-icons/fi";
import NextLink from "next/link";
import NavLinks from "@/components/ui/dashboard/nav-links";
import { handleLogout } from "@/lib/actions";
import { Box, Stack, VStack, Button, Heading, Text } from "@chakra-ui/react";

export default function SideNav() {
  return (
    <VStack h="full" bg="gray.100" p={4}>
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
