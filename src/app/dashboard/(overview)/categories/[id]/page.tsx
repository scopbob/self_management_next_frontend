import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategory } from "@/lib/actions";
import CategoryDetail from "@/components/ui/dashboard/categories/detail";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const category = await fetchCategory(Number(params.id)); // Fetch data inside the component
  return (
    <main>
      <CategoryDetail category={category} />
    </main>
  );
}
