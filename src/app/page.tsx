"use client";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { GridSkeleton } from "@/components/Skeletons";
import { useProducts } from "@/lib/api";

function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12">
      <div className="mb-4">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-base-content/60">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const { data, loading, error } = useProducts();

  const risers = (data ?? []).filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = (data ?? []).filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);

  return (
    <>
      <Hero />
      {error && (
        <div role="alert" className="alert alert-error mt-8">
          তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে পেজটি রিলোড করুন।
        </div>
      )}
      <Section title="আজ দাম বেড়েছে ▲" subtitle="গতকালের তুলনায় সবচেয়ে বেশি বেড়েছে এমন পণ্য">
        {loading ? <GridSkeleton /> : <ProductGrid items={risers} />}
      </Section>
      <Section title="আজ দাম কমেছে ▼" subtitle="গতকালের তুলনায় সবচেয়ে বেশি কমেছে এমন পণ্য">
        {loading ? <GridSkeleton /> : <ProductGrid items={fallers} />}
      </Section>
      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="সব ক্যাটাগরির পণ্যের আজকের গড় দাম">
        {loading ? <GridSkeleton count={8} /> : <ProductGrid items={data ?? []} />}
      </Section>
    </>
  );
}
