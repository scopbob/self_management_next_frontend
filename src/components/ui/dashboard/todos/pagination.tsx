"use client";

import NextLink from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ButtonGroup, IconButton, type IconButtonProps, Pagination as ChakraPagination, usePaginationContext } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Pagination({ count, pageSize }: { count: number; pageSize: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const PaginationLink = (props: IconButtonProps & { page?: "prev" | "next" | number }) => {
    const { page, ...rest } = props;
    const pagination = usePaginationContext();
    const pageValue = () => {
      if (page === "prev") return pagination.previousPage;
      if (page === "next") return pagination.nextPage;
      return page;
    };
    const isActive = () => {
      if (page === "prev" && pagination.page === 1) return true;
      if (page === "next" && pagination.page === pagination.totalPages) return true;
      return false;
    };
    const isSelected = page === currentPage;
    return (
      <IconButton asChild {...rest} variant={isSelected ? "solid" : "ghost"} disabled={isActive()}>
        {isActive() ? <div>{props.children}</div> : <NextLink href={`?page=${pageValue()}`}>{props.children}</NextLink>}
      </IconButton>
    );
  };
  return (
    <ChakraPagination.Root count={count} pageSize={pageSize} defaultPage={1} page={currentPage}>
      <ButtonGroup variant="ghost" size="sm">
        <PaginationLink page="prev">
          <HiChevronLeft />
        </PaginationLink>

        <ChakraPagination.Items render={(page) => <PaginationLink page={page.value}>{page.value}</PaginationLink>} />

        <PaginationLink page="next">
          <HiChevronRight />
        </PaginationLink>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
