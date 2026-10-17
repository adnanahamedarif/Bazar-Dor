import { Product } from "@/lib/utils";
import Hero from "@/components/Hero";
import PriceRisers from "@/components/PriceRisers";

async function getProducts(): Promise<Product[]> {
  const res =await fetch("https://api.api-store.workers.dev/api/bazardor/products",{
    next:{revalidate:60}
  });


  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <PriceRisers products={products} />
      
    </>
  );
}