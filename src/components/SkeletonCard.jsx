export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 p-4 shadow-md border border-slate-200/70 dark:border-slate-800">
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.3s_infinite]
        bg-gradient-to-r from-transparent via-slate-300/40 dark:via-white/10 to-transparent"
      />

      {/* Product image */}
      <div
        className="mb-4 h-40 w-full rounded-lg bg-gradient-to-br 
        from-slate-100 via-slate-200 to-slate-100
        dark:from-slate-700 dark:via-slate-800 dark:to-slate-700"
      />

      {/* Title lines */}
      <div className="space-y-2 mb-3">
        <div className="h-3 w-5/6 rounded bg-slate-200/80 dark:bg-slate-700" />
        <div className="h-3 w-4/6 rounded bg-slate-200/70 dark:bg-slate-700/80" />
      </div>

      {/* Rating (neutral) */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-20 rounded bg-slate-200/80 dark:bg-slate-700/70" />
        <div className="h-3 w-10 rounded bg-slate-200/70 dark:bg-slate-700/60" />
      </div>

      {/* Price */}
      <div className="mb-4 h-4 w-1/3 rounded bg-slate-300/80 dark:bg-slate-600/70" />

      {/* CTA */}
      <div
        className="h-9 w-full rounded-lg bg-gradient-to-r 
        from-slate-200 via-slate-300 to-slate-200
        dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"
      />
    </div>
  );
}
