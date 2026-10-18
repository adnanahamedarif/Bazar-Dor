export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-3.5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}