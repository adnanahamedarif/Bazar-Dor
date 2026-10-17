import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import {
    Product,
    formatPrice,
    getUnitShortBn,
    toBengaliNumber,
} from "@/lib/utils";

const Marquee = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const all: Product[] = Array.isArray(data) ? data : data?.data ?? [];

    // শুধু যেগুলোর দাম বেড়েছে বা কমেছে
    const products = all.filter(
        (p) => p.change?.dir === "up" || p.change?.dir === "down"
    );

    if (products.length === 0) return null;

    return (
        <div className="bg-white text-gray-800">
            <div className="items-stretch overflow-hidden">
                <div className="min-w-0 flex-1 overflow-hidden">
                    <MarqueeText
                        className="py-1 text-sm sm:text-base"
                        direction="right"
                        duration={30}
                    >
                        {products.map((p) => {
                            const up = p.change.dir === "up";
                            return (
                                <Link
                                    href={`/product/${p.slug}`}
                                    key={p.id}
                                    className="mx-4 inline-flex items-center hover:underline"
                                >
                                    <span className="mr-1">{p.image}</span>
                                    <span>{p.nameBn}</span>
                                    <span className="ml-2">
                                        {formatPrice(p.today)} টাকা/{getUnitShortBn(p.unit)}
                                    </span>
                                    <span
                                        className={`ml-2 text-xs font-semibold ${
                                            up ? "text-red-600" : "text-green-600"
                                        }`}
                                    >
                                        {up ? "▲" : "▼"} {toBengaliNumber(p.change.pct)}%
                                    </span>
                                </Link>
                            );
                        })}
                    </MarqueeText>
                </div>
            </div>
        </div>
    );
};

export default Marquee;