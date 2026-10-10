import type { Product } from "./types";

const nf = new Intl.NumberFormat("bn-BD");
const nf1 = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 1850 -> ১,৮৫০ */
export const bn = (n: number) => nf.format(n);
/** 2.1 -> ২.১ */
export const bnPct = (n: number) => nf1.format(Math.abs(n));
/** 1850 -> ১,৮৫০ টাকা */
export const taka = (n: number) => `${bn(n)} টাকা`;

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const unitLabel = (u: string) => UNITS[u] ?? `প্রতি ${u}`;
const UNIT_SHORT: Record<string, string> = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitShort = (u: string) => UNIT_SHORT[u] ?? u;

export function banglaDate(d = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export type SortKey = "default" | "asc" | "desc";
/** Sorts by the numeric price (never by the Bengali string). */
export function sortProducts(list: Product[], key: SortKey) {
  if (key === "default") return list;
  const copy = [...list];
  copy.sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today));
  return copy;
}
