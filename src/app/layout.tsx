import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Marquee from "@/components/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});



export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাজারভিত্তিক আজকের দাম",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased bg-[#dfe8df]`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <Marquee/>


        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-6">
          
          {children}
        </main>

      </body>
    </html>
  );
}
