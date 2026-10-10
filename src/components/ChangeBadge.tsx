import { bnPct } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change, className = "" }: { change: Product["change"]; className?: string }) {
  const base = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap";
  if (change.dir === "up")
    return <span className={`${base} bg-success/15 text-success ${className}`}>▲ {bnPct(change.pct)}%</span>;
  if (change.dir === "down")
    return <span className={`${base} bg-error/15 text-error ${className}`}>▼ {bnPct(change.pct)}%</span>;
  return <span className={`${base} bg-base-300 text-base-content/60 ${className}`}>—০.০%</span>;
}
