import ProductCardSkeleton from "@/components/ProductCardSkeleton";

function SectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      <div className="skeleton mb-4 h-7 w-44" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <>
      {/* Hero */}
      <div className="bg-green-50/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-10">
          <div className="flex-1 space-y-4">
            <div className="skeleton h-6 w-40 rounded-full" />
            <div className="skeleton h-9 w-3/4" />
            <div className="skeleton h-4 w-full max-w-md" />
            <div className="skeleton h-10 w-36 rounded-lg" />
          </div>
          <div className="skeleton hidden h-32 w-32 rounded-full sm:block" />
        </div>
      </div>

      <SectionSkeleton /> 
      <SectionSkeleton /> 
      <SectionSkeleton count={9} /> 
    </>
  );
}