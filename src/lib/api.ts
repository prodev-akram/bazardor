"use client";
import { useEffect, useState } from "react";
import type { Category, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // alternative
];

const cache = new Map<string, Promise<unknown>>();

async function getJSON<T>(path: string): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

function cached<T>(path: string): Promise<T> {
  if (!cache.has(path)) {
    const p = getJSON<T>(path).catch((e) => {
      cache.delete(path); // allow retry
      throw e;
    });
    cache.set(path, p);
  }
  return cache.get(path) as Promise<T>;
}

function useResource<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let alive = true;
    cached<T>(path).then(
      (d) => alive && setData(d),
      (e) => alive && setError(e as Error)
    );
    return () => {
      alive = false;
    };
  }, [path]);
  return { data, error, loading: !data && !error };
}

export const useProducts = () => useResource<Product[]>("/products");
export const useCategories = () => useResource<Category[]>("/categories");
