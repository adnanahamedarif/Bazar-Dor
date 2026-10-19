"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
const UserInfo = () => {
     const router = useRouter();
     const {  data: session  } = authClient.useSession();

     const user =session?.user;
     console.log(user);

     const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

     const handleSignOut = async () => {
        closeMenu();
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
     };

    return (
       <div>
    {
        user ? <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2">
                <div className="avatar">
                    <div className="w-10 rounded-xl overflow-hidden">
                        {user?.image ? (
                            <img alt="Avatar" src={user.image} referrerPolicy="no-referrer" />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center bg-green-700 text-2xl font-bold text-white">
                                {user?.name?.charAt(0) || "U"}
                            </span>
                        )}
                    </div>
                </div>

                <h2 className="font-medium text-gray-800">{user.name}</h2>
                <span className="text-[10px] text-gray-500">▼</span>
            </div>

            <div
                tabIndex={0}
                className="dropdown-content z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
            >
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>

                <div className="mt-3 space-y-1 text-sm">
                    <Link
                        href="/profile"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-lg px-1 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        <span>👤</span> আমার প্রোফাইল
                    </Link>
                    <button
                        onClick={handleSignOut} 
                        className="flex w-full items-center gap-2 rounded-lg px-1 py-2 text-red-600 hover:bg-red-50"
                    >
                        <span>↩</span> সাইন আউট
                    </button>
                    
                </div>
            </div>

                </div> :  <div>
                   <Link href={'/signin'}>
                    <button className='border border-green-700 rounded-xl m-4 px-4 py-2 font-bold cursor-pointer'>
                    সাইন ইন
                </button></Link>
                <Link href={'/signup'}>
                      <button className='bg-green-700 rounded-xl  px-4 py-2 text-white font-bold cursor-pointer'>
                    সাইন আপ
                </button>
                </Link>
                </div>
            }
           
            </div>
    );
};

export default UserInfo;