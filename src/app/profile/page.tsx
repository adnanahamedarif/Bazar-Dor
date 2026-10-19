"use client";

import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUserData = Object.fromEntries(formData.entries()) as {
            name: string;
        };


        const name = newUserData.name.trim();
        if (!name) {
            toast.error("Name cannot be empty");
            return;
        }

        const { error } = await authClient.updateUser({ name });

        if (error) {
            toast.error(error.message ?? "Update failed");
        } else {
            toast.success("Profile updated!");
            router.refresh();
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return (
            <section className="mx-auto max-w-3xl px-4 py-8">
                <div className="skeleton mb-2 h-8 w-48" />
                <div className="skeleton mb-6 h-4 w-64" />
                <div className="skeleton mb-4 h-32 w-full rounded-2xl" />
                <div className="skeleton h-56 w-full rounded-2xl" />
            </section>
        );
    }

    if (!user) 
    {
        redirect('/signin')
    }

    return (
        <section className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
            <p className="mb-6 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>


            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="h-16 w-16 overflow-hidden rounded-xl">
                            {user.image ? (
                                <img alt="Avatar" src={user.image} referrerPolicy="no-referrer" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center bg-green-700 text-3xl font-bold text-white">
                                    {user.name?.charAt(0) || "U"}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1 rounded-lg border border-red-500 px-4 py-1.5 text-sm text-red-600 hover:bg-red-50"
                >
                    <span>↩</span> সাইন আউট
                </button>
            </div>




            <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 p-5">
                <h2 className="mb-4 font-semibold text-gray-900">তথ্য</h2>

                <form onSubmit={handleUpdateProfile} className="space-y-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-800">নাম</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user.name}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-full border-0 bg-green-700 text-white hover:bg-green-800"
                    >
                        আপডেট
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ProfilePage;