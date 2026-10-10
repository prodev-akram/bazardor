"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  if (isPending) return <div className="mx-auto h-56 max-w-md animate-pulse rounded-3xl bg-base-300" />;

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="mb-6 text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="form-control">
          <span className="label-text mb-1">নাম</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" placeholder="আপনার নাম" />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}
