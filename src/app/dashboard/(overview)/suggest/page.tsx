import { Metadata } from "next";

import { Box, Heading } from "@chakra-ui/react";
import { lusitana } from "@/components/ui/fonts";
import PromptForm from "@/components/ui/dashboard/ai_sdk/suggest_form";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page() {
  return (
    <Box>
      <Heading size="4xl" className={lusitana.className} px="3" pt="5">
        Generate today's Plan
      </Heading>
      <PromptForm />
    </Box>
  );
}
