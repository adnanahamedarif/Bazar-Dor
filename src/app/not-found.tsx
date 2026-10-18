import Link from 'next/link';
import React from 'react';

const notfound = () => {
    return (
         <section className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
      <div className="text-7xl">🔍</div>

      <p className="mt-4 text-sm font-semibold tracking-widest text-green-600">
        ৪০৪
      </p>
      <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, নাম বদলেছে, অথবা
        লিংকটি ভুল।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </section>
    );
};

export default notfound;