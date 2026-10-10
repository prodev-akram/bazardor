import Link from "next/link";
import type { Product } from "@/lib/types";
import { taka, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-white p-4 transition hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-base-200 text-3xl" aria-hidden>
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-tight">{p.nameBn}</h3>
          <p className="text-sm text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-base-300 pt-3">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold text-primary">{taka(p.today)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
