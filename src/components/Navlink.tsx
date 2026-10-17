import Link from 'next/link';

type NavItem = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const Navlink = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    const navs: NavItem[] = data?.data || (Array.isArray(data) ? data : []);

    return (
        <nav className="py-2 overflow-x-auto scrollbar-none ">
            <div className="flex items-center gap-6 whitespace-nowrap">
                {navs.map((n) => (
                    <Link key={n.slug} href={`/category/${n.slug}`} className="flex items-center gap-2 py-1 text-gray-700 hover:text-green-700" >
                        <span>{n.icon}</span>
                        <span>{n.nameBn}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navlink;