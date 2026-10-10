"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import NotFoundView from "@/components/NotFoundView";
import { useProducts } from "@/lib/api";
import { bn, taka, unitLabel } from "@/lib/bn";

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-32 rounded-2xl bg-base-300" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-base-300" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-base-300" />
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading } = useProducts();

  if (loading) return <Skeleton />;
  const p = data?.find((x) => x.slug === slug);
  if (!p) return <NotFoundView title="পণ্যটি খুঁজে পাওয়া যায়নি" message="লিংকটি সঠিক নয় বা পণ্যটি আর তালিকায় নেই।" />;

  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length);
  const diff = p.today - p.yesterday;
  const summary =
    p.change.dir === "flat"
      ? `${p.nameBn}-এর দাম গতকালের মতোই আছে।`
      : `${p.nameBn}-এর দাম গতকালের তুলনায় ${taka(Math.abs(diff))} ${p.change.dir === "up" ? "বেড়েছে" : "কমেছে"}।`;

  const divisions = Array.from(new Set(p.markets.map((m) => m.division)));
  const history = [
    { label: "আজ", v: p.today },
    { label: "গতকাল", v: p.yesterday },
    { label: "গত সপ্তাহ", v: p.lastWeek },
    { label: "গত মাস", v: p.lastMonth },
  ];

  return (
    <div className="space-y-8">
      <Link href={`/category/${p.category}`} className="text-sm text-primary hover:underline">
        ← {p.categoryNameBn}
      </Link>

      {/* Summary */}
      <section className="flex flex-col gap-5 rounded-3xl bg-base-200 p-6 sm:flex-row sm:items-center">
        <span className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white text-6xl" aria-hidden>
          {p.image}
        </span>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{p.nameBn}</h1>
          <p className="text-base-content/70">{summary}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="badge badge-primary badge-outline">
              {p.categoryIcon} {p.categoryNameBn}
            </span>
            <span className="badge badge-ghost">{unitLabel(p.unit)}</span>
            <ChangeBadge change={p.change} />
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section>
        <h2 className="mb-3 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", v: min, cls: "text-success" },
            { label: "সর্বোচ্চ দাম", v: max, cls: "text-error" },
            { label: "গড় দাম", v: avg, cls: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-base-300 bg-white p-5">
              <p className="text-sm text-base-content/60">{s.label}</p>
              <p className={`text-2xl font-bold ${s.cls}`}>{taka(s.v)}</p>
              <p className="text-xs text-base-content/50">{unitLabel(p.unit)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {history.map((h) => (
            <div key={h.label} className="rounded-xl bg-base-200 px-4 py-3">
              <p className="text-xs text-base-content/60">{h.label}</p>
              <p className="font-semibold">{taka(h.v)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section>
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="space-y-6">
          {divisions.map((d) => (
            <div key={d}>
              <h3 className="mb-2 font-semibold text-primary">{d} বিভাগ</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.markets
                  .filter((m) => m.division === d)
                  .map((m) => {
                    const lo = ((m.min - min) / (max - min || 1)) * 100;
                    const hi = ((m.max - min) / (max - min || 1)) * 100;
                    return (
                      <div key={m.market} className="rounded-2xl border border-base-300 bg-white p-4">
                        <p className="font-medium">{m.market}</p>
                        <p className="mt-1 text-sm text-base-content/70">
                          {bn(m.min)} – {bn(m.max)} টাকা
                        </p>
                        <div className="mt-3 h-1.5 rounded-full bg-base-300" aria-hidden>
                          <div className="relative h-full">
                            <div className="absolute h-1.5 rounded-full bg-primary" style={{ left: `${lo}%`, width: `${Math.max(hi - lo, 4)}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
