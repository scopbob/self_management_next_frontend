import { Metadata } from "next";
import NextLink from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { VStack, Heading, Button } from "@chakra-ui/react";
import { lusitana } from "@/components/ui/fonts";
import LatestTodos from "@/components/ui/dashboard/latest-todos";
import { FaRocket } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await redirect("/dashboard/session_out");
  }
  return (
    <VStack h="full" justify="space-between" align="center">
      <Heading alignSelf="start" size="4xl" className={lusitana.className} px="3" pt="5">
        Home
      </Heading>
      <VStack>
        <Heading textAlign="center" mt="5" size={{ base: "6xl", md: "7xl" }}>
          AIに今日の予定を
          <br />
          考えてもらう
        </Heading>
        <Button mt="4" variant="outline" size="2xl" asChild>
          <NextLink href="dashboard/suggest">
            <FaRocket />
            Let&apos;s Go
          </NextLink>
        </Button>
      </VStack>
      <LatestTodos number={5} />
    </VStack>
  );
}
