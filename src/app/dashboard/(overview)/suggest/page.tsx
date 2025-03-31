import { Metadata } from "next";
import SuggestTodayTodo from "@/components/ui/dashboard/ai_sdk/today_plan";
import { Box, Heading } from "@chakra-ui/react";
import PromptForm from "@/components/ui/dashboard/ai_sdk/suggest_form";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page() {
  return (
    <Box>
      <Heading size="4xl">Generate Today's Plan</Heading>
      <PromptForm />
    </Box>
  );
}
