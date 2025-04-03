import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategory } from "@/lib/actions";
import CategoryEdit from "@/components/ui/dashboard/categories/edit_form";
import { Box, Text } from "@chakra-ui/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const category = await fetchCategory(Number(params.id));
  const session = await auth();
  return (
    <Box>
      <CategoryEdit category={category} />
      {session?.isGuest && <Text>※ ログインすると、実際に編集することができます</Text>}
    </Box>
  );
}
