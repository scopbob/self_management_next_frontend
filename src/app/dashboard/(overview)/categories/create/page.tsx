import { Metadata } from "next";
import CreateCategory from "@/components/ui/dashboard/categories/create_form";
import { VStack, Heading, Text } from "@chakra-ui/react";
import { lusitana } from "@/components/ui/fonts";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  return (
    <VStack p={2} w="full">
      <Heading alignSelf="start" size="4xl" className={lusitana.className} px="3" pt="5">
        Create Category
      </Heading>
      <CreateCategory />
      {session?.isGuest && <Text>※ ログインすると、実際に作成することができます</Text>}
    </VStack>
  );
}
