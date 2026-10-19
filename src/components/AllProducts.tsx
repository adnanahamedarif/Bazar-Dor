import { Product, toBengaliNumber } from '@/lib/utils';
import ProductCard from './ProductCard';

const AllProducts = ({ products }: { products: Product[] }) => {
    return (
        <section id='all-products' className='px-4 py-6'>
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
                <p className="text-sm text-gray-500">
                    মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

        </section>
    );
};

export default AllProducts;