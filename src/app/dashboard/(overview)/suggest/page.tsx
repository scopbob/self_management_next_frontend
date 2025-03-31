import { Metadata } from "next";
import SuggestTodayTodo from "@/components/ui/dashboard/ai_sdk/today_plan";
import { Box } from "@chakra-ui/react";
import PromptForm from "@/components/ui/dashboard/ai_sdk/suggest_form";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page() {
  return (
    <Box>
      <PromptForm />
    </Box>
  );
}
