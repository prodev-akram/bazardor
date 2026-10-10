import Image from "next/image";

export default function Hero() {
  return (
    <section className="rounded-3xl bg-base-200 px-6 py-10 sm:px-10 md:py-14">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-medium text-primary">প্রতিদিনের বাজারদর</p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            আজ কোথায় কত দাম, এক নজরে দেখুন
          </h1>
          <p className="mx-auto max-w-prose text-base-content/70 md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ-মাংস ও মসলার সর্বশেষ দাম — দেশের বিভিন্ন বাজার থেকে সংগৃহীত।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/bazar-hero.png" alt="ফল ও সবজির ঝুড়ি" width={315} height={263} priority className="h-auto w-64 sm:w-80" />
        </div>
      </div>
    </section>
  );
}
