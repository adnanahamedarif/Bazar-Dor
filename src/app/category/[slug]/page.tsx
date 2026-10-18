"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Category, Product, toBengaliNumber } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import SortDropdown, { SortValue } from "@/components/SortDropdown";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortValue>("default");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${BASE}/products?category=${slug}`),
          fetch(`${BASE}/categories/${slug}`),
        ]);
        if (!pRes.ok) throw new Error("products failed");

        const pData = await pRes.json();
        const cData = cRes.ok ? await cRes.json() : null;

        if (cancelled) return;
        setProducts(Array.isArray(pData) ? pData : pData?.data ?? []);
        setCategory(cData?.data ?? cData);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });



  if (loading) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-28" />
        </div>
        <div className="skeleton h-10 w-44 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}



  if (error || products.length === 0) {
    notFound();
  }



  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span>{category?.icon ?? products[0].categoryIcon}</span>
            {category?.nameBn ?? products[0].categoryNameBn}
          </h1>
          <p className="text-sm text-gray-500">
            মোট {toBengaliNumber(products.length)}টি পণ্য
          </p>
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}