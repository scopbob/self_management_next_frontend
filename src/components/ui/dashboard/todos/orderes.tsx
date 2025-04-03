"use client";

import NextLink from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Menu, Button, Portal, HStack, Text, ColorSwatch, IconButton } from "@chakra-ui/react";
import { LuArrowUpDown } from "react-icons/lu";

export default function Order({ reverse }: { reverse: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  reverse = !reverse;

  params.set("reverse", String(reverse));

  return (
    <IconButton colorPalette="cyan" asChild>
      <NextLink href={`${pathname}?${params.toString()}`}>
        <LuArrowUpDown />
      </NextLink>
    </IconButton>
  );
}
