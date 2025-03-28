import { Button, Text, Center } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session expired",
};

export default function SessionOutPage() {
  return (
    <Center minH="100vh">
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>セッションが切れました</h1>
        <p>再ログインが必要です。</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button colorPalette="red" type="submit" textAlign="left">
            <FiLogOut />
            <Text display={{ base: "none", md: "block" }}>Sign Out</Text>
          </Button>
        </form>
      </div>
    </Center>
  );
}
