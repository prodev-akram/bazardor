import Link from "next/link";

export default function NotFoundView({
  title = "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-primary">৪০৪</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
