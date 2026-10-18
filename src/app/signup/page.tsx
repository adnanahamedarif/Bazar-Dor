'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";


const SignUpPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
       const name = String(formData.get("name") ?? "")
        const email = String(formData.get("email") ?? "")
        const password = String(formData.get("password") ?? "")
        const confirmPassword = String(formData.get("confirmPassword") ?? "")


        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/"
        })



        if (data) {
            toast.success("Sign Up successfull! ")


        }


        if (error) {
            toast.error(error.message ?? "An error occurred")
        }

    }


    const handelGoogleSignUp = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",

        });
    }
    const handelGitHubSignUp = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm text-base-content/70">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-white border-gray-100 rounded-box w-full  p-6 shadow-sm">
                    <label className="label font-medium">নাম</label>
                    <input
                        type="text"
                        name="name"

                        className="input input-bordered w-full mb-3"
                        placeholder="যেমন: রহিম উদ্দিন"
                    />

                    <label className="label font-medium">ইমেইল</label>
                    <input
                        type="email"
                        name="email"

                        className="input input-bordered w-full mb-3"
                        placeholder="you@example.com"
                    />

                    <label className="label font-medium">পাসওয়ার্ড</label>
                    <input
                        type="password"
                        name="password"

                        className="input input-bordered w-full mb-3"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                    />

                    <label className="label font-medium">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                        type="password"
                        name="confirmPassword"

                        className="input input-bordered w-full mb-4"
                        placeholder="আবার লিখুন"
                    />

                    <button type='submit' className="btn bg-green-700 rounded-1xl text-white w-full mt-2">
                        অ্যাকাউন্ট তৈরি করুন
                    </button>

                    <div className="divider text-xs text-base-content/50 my-4">অথবা</div>

                    <div className="flex gap-2">
                        <button type="button" onClick={handelGoogleSignUp} className="btn bg-white text-black border-gray-300">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Google দিয়ে চালিয়ে যান
                        </button>
                        <button onClick={handelGitHubSignUp} type="button" className="btn bg-white text-black border-gray-300 hover:bg-gray-100 flex-1 gap-2">
                            <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="black" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
                            </svg>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <div className="text-center text-sm mt-4">
                        অ্যাকাউন্ট আছে? <a href="/signin" className="text-green-700 font-medium hover:underline">সাইন ইন করুন</a>
                    </div>
                </fieldset>
            </form>

            <Link href="/">
    <div className="text-xs text-base-content/60 mt-6">
        ← হোম পেজে ফিরে যান
    </div>
</Link>
        </div>
    );
};

export default SignUpPage;