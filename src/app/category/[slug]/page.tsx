"use client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import NotFoundView from "@/components/NotFoundView";
import ProductGrid from "@/components/ProductGrid";
import SortSelect from "@/components/SortSelect";
import { GridSkeleton } from "@/components/Skeletons";
import { useCategories, useProducts } from "@/lib/api";
import { SortKey, bn, sortProducts } from "@/lib/bn";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cats = useCategories();
  const prods = useProducts();
  const [sort, setSort] = useState<SortKey>("default");

  const category = cats.data?.find((c) => c.slug === slug);
  const items = useMemo(
    () => sortProducts((prods.data ?? []).filter((p) => p.category === slug), sort),
    [prods.data, slug, sort]
  );

  if (cats.loading || prods.loading)
    return (
      <div>
        <div className="mb-6 h-9 w-48 animate-pulse rounded bg-base-300" />
        <GridSkeleton count={8} />
      </div>
    );

  if (!category || items.length === 0)
    return <NotFoundView title="এই ক্যাটাগরিতে কোনো পণ্য নেই" message="ক্যাটাগরিটি সঠিক নয় বা এখানে এখনো কোনো পণ্য যোগ হয়নি।" />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <span aria-hidden>{category.icon}</span> {category.nameBn}
          </h1>
          <p className="text-sm text-base-content/60">{bn(items.length)}টি পণ্য</p>
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <ProductGrid items={items} />
    </div>
  );
}
