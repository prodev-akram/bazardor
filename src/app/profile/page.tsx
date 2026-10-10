"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="mx-auto h-64 max-w-md animate-pulse rounded-3xl bg-base-300" />;
  if (!session) return null; // middleware redirects unauthenticated visitors

  const { user } = session;
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-white p-6 text-center sm:p-8">
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt="" className="mx-auto h-20 w-20 rounded-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-3xl text-primary-content">
          {user.name?.[0]?.toUpperCase() ?? "?"}
        </span>
      )}
      <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
      <p className="text-base-content/60">{user.email}</p>
      <Link href="/profile/update" className="btn btn-primary mt-6">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
