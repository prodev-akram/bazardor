export function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-2xl border border-base-300 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-xl bg-base-300" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-base-300" />
          <div className="h-3 w-1/3 rounded bg-base-300" />
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-base-300 pt-3">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-base-300" />
          <div className="h-5 w-24 rounded bg-base-300" />
        </div>
        <div className="h-5 w-14 rounded-full bg-base-300" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
