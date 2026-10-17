import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    today: number;
    change?: { dir: string; pct: number };
    image: string;
}


const toBn = (n: number) => n.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    const all: Product[] = Array.isArray(data) ? data : data?.data ?? [];

    const products = all.filter((p) => p.change?.dir === "up" || p.change?.dir === "down");


    return (
        <div className="bg-white text-gray-800">
            <div className=" items-stretch overflow-hidden">
                <div className="min-w-0 flex-1 overflow-hidden">
                    <MarqueeText className="py-1 text-sm sm:text-base" direction="right" duration={30}>
                        {products.map((p) => {
                            const up = p.change!.dir === "up";
                            return (
                                <Link href={`/product/${p.id}`} key={p.id} className="hover:underline">
                                    <span>{p.image}</span>
                                    <span>{p.nameBn}</span>
                                    <span className="ml-2">
                                        {toBn(p.today)} টাকা/{p.unit}
                                    </span>
                                    <span className={`ml-2   text-xs font-semibold ${up ? "text-red-600" : "text-green-600"}`}>
                                        {up ? "▲" : "▼"} {toBn(p.change!.pct)}%
                                    </span>
                                    <span className="mx-4"></span>
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