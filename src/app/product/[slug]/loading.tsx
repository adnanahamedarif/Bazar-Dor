export default function Loading() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-3 flex items-center gap-2">
        <div className="skeleton h-4 w-10" />
        <div className="skeleton h-4 w-14" />
        <div className="skeleton h-4 w-24" />
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5">
        <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />
        <div className="space-y-3">
          <div className="skeleton h-7 w-48" />
          <div className="flex gap-2">
            <div className="skeleton h-5 w-20 rounded-full" />
            <div className="skeleton h-5 w-20 rounded-full" />
            <div className="skeleton h-5 w-28 rounded-full" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-2xl border border-gray-200 bg-white/80 p-4">
            <div className="skeleton h-3 w-20" />
            <div className="skeleton h-7 w-24" />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="skeleton mb-3 h-6 w-52" />
        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white/80 p-4">
          <div className="skeleton h-5 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-full" />
          ))}
        </div>
      </div>

    </section>
  );
}