"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    const fail = (msg: string) => {
      setError(msg);
      toast.error(msg);
    };
    if (!name || !email || !password) return fail("সবগুলো ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.message || "রেজিস্ট্রেশন সম্পন্ন করা যায়নি");

    toast.success("রেজিস্ট্রেশন সফল হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-bold">সাইন আপ</h1>
      <p className="mb-6 text-sm text-base-content/60">নতুন অ্যাকাউন্ট তৈরি করুন</p>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="form-control">
          <span className="label-text mb-1">নাম</span>
          <input name="name" type="text" autoComplete="name" placeholder="আপনার নাম" className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered" />
        </label>
        {error && <p role="alert" className="text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন আপ"}
        </button>
      </form>
      <div className="divider text-xs text-base-content/50">অথবা</div>
      <SocialButtons />
      <p className="mt-6 text-center text-sm">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
