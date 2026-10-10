"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  // Redirected here from a protected route
  useEffect(() => {
    if (params.get("from") && !toasted.current) {
      toasted.current = true;
      toast.error("এই পৃষ্ঠা দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(params.get("from") || "/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-6 text-sm text-base-content/60">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="form-control">
          <span className="label-text mb-1">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="current-password" placeholder="••••••••" className="input input-bordered" />
        </label>
        {error && <p role="alert" className="text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>
      <div className="divider text-xs text-base-content/50">অথবা</div>
      <SocialButtons />
      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="mx-auto h-96 max-w-md animate-pulse rounded-3xl bg-base-300" />}>
      <SignInForm />
    </Suspense>
  );
}
