import Link from 'next/link';
import Image from 'next/image';
import { connection } from 'next/server';
import Navlink from './Navlink';

const Header = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="sticky top-0 z-40 w-full bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
                <Link href="/" className="flex items-center gap-3 min-w-0">
                    <div className="bg-green-700 h-14 w-14 rounded-2xl flex items-center justify-center">
                        <Image  src="/logo-icon.png" alt="bazar dor logo" width={32}  height={32} className="h-9 w-9  sm:h-10 sm:w-10"/>
                    </div>
                    <div className="min-w-0">
                        <h2 className=" text-2xl font-bold text-gray-900 sm:text-2xl">
                            বাজার দর
                        </h2>
                        <p className=" text-gray-600 sm:text-xs">
                            {date}
                        </p>
                    </div>
                </Link>
            </div>
            
            <div className="mx-auto max-w-5xl px-4">
                <Navlink />
            </div>
        </header>
    );
};

export default Header;