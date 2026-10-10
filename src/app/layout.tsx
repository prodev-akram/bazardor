import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ-মাংস ও মসলার আজকের বাজারদর।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazar" className={hind.variable}>
      <body className="min-h-screen bg-base-100 font-sans text-base-content antialiased">
        <Navbar />
        <Ticker />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
