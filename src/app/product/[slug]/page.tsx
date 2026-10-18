import Link from "next/link";
import { notFound } from "next/navigation";
import { Product, formatPrice, getUnitBn, getUnitShortBn,  toBengaliNumber,} from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;

  const data = await res.json();
  const products: Product[] = Array.isArray(data) ? data : data?.data ?? [];
  return products.find((p) => p.slug === slug) || null;
}

const fmt = (n: number) =>
  Number.isInteger(n) ? formatPrice(n) : toBengaliNumber(n.toFixed(2));

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const hasMarkets = rows.length > 0;
  const lowest = hasMarkets
    ? product.markets.reduce((a, b) => (b.min < a.min ? b : a))
    : null;
  const highest = hasMarkets
    ? product.markets.reduce((a, b) => (b.max > a.max ? b : a))
    : null;
  const avgPrice = hasMarkets
    ? Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length)
    : product.today;

  const dir = product.change.dir;
  const diff = Math.abs(product.today - product.yesterday);
  const unitShort = getUnitShortBn(product.unit);

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      <div className="breadcrumbs mb-3 text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="text-gray-500">{product.nameBn}</li>
        </ul>
      </div>


 
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {getUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {dir === "flat" ? (
                "গতকালের তুলনায় দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <b className={dir === "up" ? "text-red-600" : "text-green-600"}>
                    {dir === "up" ? "বেড়েছে" : "কমেছে"}
                  </b>{" "}
                  · {formatPrice(diff)} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        <div className="min-w-32 rounded-xl bg-gray-100 px-5 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.today)}
          </p>
          <p className="text-xs text-gray-500">টাকা / {unitShort}</p>
          <p
            className={`mt-1 text-xs font-semibold ${
              dir === "up"
                ? "text-red-600"
                : dir === "down"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"}
            {dir !== "flat" && ` ${toBengaliNumber(product.change.pct)}%`}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 p-5">
        <h2 className="mb-3 text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {formatPrice(lowest?.min ?? product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            {lowest && (
              <p className="mt-1 text-xs text-gray-500">
                {lowest.market} — সবচেয়ে কম দামের বাজার
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {formatPrice(highest?.max ?? product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            {highest && (
              <p className="mt-1 text-xs text-gray-500">
                {highest.market} — সবচেয়ে বেশি দামের বাজার
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatPrice(avgPrice)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unitShort}, {toBengaliNumber(rows.length)}টি বাজারে
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-6 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {!hasMarkets ? (
          <p className="text-sm text-gray-500">কোনো বাজারের তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="table table-zebra">
              <thead>
                <tr className="text-gray-600">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={`${m.market}-${m.division}`}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{formatPrice(m.min)} টাকা</td>
                    <td className="text-right">{formatPrice(m.max)} টাকা</td>
                    <td className="text-right font-bold">{fmt(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </section>
  )
}