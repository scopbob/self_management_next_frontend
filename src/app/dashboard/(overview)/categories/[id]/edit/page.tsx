import { Suspense } from "react";
import { Metadata } from "next";
import { fetchCategory } from "@/lib/actions";
import CategoryEdit from "@/components/ui/dashboard/categories/edit_form";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const category = await fetchCategory(Number(params.id));
  return (
    <main>
      <CategoryEdit category={category} />
    </main>
  );
}
