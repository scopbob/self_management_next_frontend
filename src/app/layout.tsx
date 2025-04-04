import type { Metadata } from "next";
import "./globals.css";

import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Self Management",
  description: "This is Self Management App",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
