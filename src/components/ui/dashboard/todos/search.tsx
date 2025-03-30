"use client";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@chakra-ui/react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("search")?.toString()}
    />
  );
}
