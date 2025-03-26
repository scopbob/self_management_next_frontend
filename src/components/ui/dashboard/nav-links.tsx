"use client";

import NextLink from "next/link";
import { HStack, Button } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { GrTask } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: FiHome },
  { name: "Todos", href: "/dashboard/todos", icon: GrTask },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: BiCategory,
  },
  { name: "Progress", href: "/dashboard/progress", icon: GiProgression },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const pathname = usePathname();
        const LinkIcon = link?.icon;
        return (
          <NextLink className="grow md:grow-0" key={link.name} href={link.href}>
            <Button variant={pathname === link.href ? "solid" : "surface"} w="full" justifyContent={{ base: "center", md: "left" }}>
              <LinkIcon />
              <p className="hidden md:block">{link.name}</p>
            </Button>
          </NextLink>
        );
      })}
    </>
  );
}
