"use client";


import Image from "next/image";
import Link from "next/link";

const Hero = () => {
     const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <section className="py-6">

            <div className="grid grid-cols-1 items-center gap-6 rounded-3xl border border-gray-300 bg-white px-4 py-8 sm:px-8 md:grid-cols-[1.6fr_1fr] md:px-4 md:py-10">

                <div className="order-2 md:order-1">

                    <span className="inline-block rounded-full bg-[#d6f2e0] px-3 py-1 text-sm font-medium text-green-700">
                        {date}
                    </span>

                    <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-800 sm:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তৃতি, গড়, সর্বনিম্ন-সর্বোচ্চ
                        এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                   <Link href="#all-products" className="btn mt-7 min-h-10 border-0 bg-green-700 px-6 text-white shadow-md hover:bg-green-800">
    সব পণ্য দেখুন
</Link>

                </div>


                <div className="order-1 flex items-center justify-center md:order-2">

                    <Image src="/bazar-hero.png" alt="" width={200}  height={200} className="h-auto w-52 object-contain sm:w-60 md:w-64" />

                </div>

            </div>

        </section>
    );
};

export default Hero;
