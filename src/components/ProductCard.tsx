import Link from "next/link";
import { Product, formatPrice, getUnitBn, toBengaliNumber } from "@/lib/utils";

const BADGE = {
  up: { cls: "bg-red-50 text-red-600", icon: "▲" },
  down: { cls: "bg-green-50 text-green-600", icon: "▼" },
  flat: { cls: "bg-gray-100 text-gray-500", icon: "—" },
};

export default function ProductCard({ product }: { product: Product }) {
  const b = BADGE[product.change.dir];

  return (
    <Link
      href={`/product/${product.slug}`}
      className=" rounded-2xl border border-gray-200 bg-white p-3.5  hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>

        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.cls}`}>
          {b.icon}
          {product.change.dir !== "flat" && ` ${toBengaliNumber(product.change.pct)}%`}
        </span>
      </div>
    </Link>
  );
}