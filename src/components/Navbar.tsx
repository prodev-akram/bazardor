"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCategories } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { banglaDate } from "@/lib/bn";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: categories } = useCategories();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []); // client-only: avoids hydration mismatch

  const linkCls = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
      active ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-300"
    }`;

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => {
  toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
},
      },
    });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="" width={28} height={28} />
            <span className="leading-tight">
              <span className="block text-lg font-extrabold text-primary">বাজার দর</span>
              <span className="block min-h-4 text-xs text-base-content/60">{date}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="ক্যাটাগরি">
            <Link href="/" className={linkCls(pathname === "/")}>
              সব
            </Link>
            {categories?.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className={linkCls(pathname === `/category/${c.slug}`)}>
                {c.icon} {c.nameBn}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="h-8 w-28 animate-pulse rounded-full bg-base-300" />
            ) : session ? (
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-sm gap-2 normal-case">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-sm text-primary-content">
                    {session.user.name?.[0]?.toUpperCase() ?? "?"}
                  </span>
                  <span className="hidden max-w-24 truncate sm:inline">{session.user.name}</span>
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-40 mt-2 w-48 rounded-box border border-base-300 bg-white p-2 shadow">
                  <li>
                    <Link href="/profile">আমার প্রোফাইল</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>সাইন আউট</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category row: horizontally scrollable on tablet/mobile */}
        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden" aria-label="ক্যাটাগরি">
          <Link href="/" className={linkCls(pathname === "/")}>
            সব
          </Link>
          {categories?.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={linkCls(pathname === `/category/${c.slug}`)}>
              {c.icon} {c.nameBn}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
