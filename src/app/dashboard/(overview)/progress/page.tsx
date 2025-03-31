import { Metadata } from "next";
import SuggestTodayTodo from "@/components/ui/dashboard/ai_sdk/today_plan";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page() {
  return (
    <Box>
      <SuggestTodayTodo />
    </Box>
  );
}
