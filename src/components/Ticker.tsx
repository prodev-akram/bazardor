"use client";
import { useProducts } from "@/lib/api";
import { bn, bnPct, unitShort } from "@/lib/bn";

export default function Ticker() {
  const { data } = useProducts();
  if (!data) return <div className="h-9 border-b border-base-300 bg-base-200" aria-hidden />;

  const items = data.map((p) => (
    <span key={p.id} className="inline-flex items-center gap-1.5 px-5 text-sm">
      <span aria-hidden>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-base-content/70">
        {bn(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      {p.change.dir === "up" && <span className="font-semibold text-success">▲ {bnPct(p.change.pct)}%</span>}
      {p.change.dir === "down" && <span className="font-semibold text-error">▼ {bnPct(p.change.pct)}%</span>}
      {p.change.dir === "flat" && <span className="text-base-content/50">—০.০%</span>}
    </span>
  ));

  return (
    <div className="ticker overflow-hidden border-b border-base-300 bg-base-200 py-2" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex w-max whitespace-nowrap">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}
