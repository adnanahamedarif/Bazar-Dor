import { Product } from "@/lib/utils";
import ProductCard from "./ProductCard";

export default function PriceRisers({ products }: { products: Product[] }) {
  const risers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className="text-sm text-green-700">▼</span> আজ দাম কমেছে
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risers.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}