import type { Metadata } from "next";

import Footer from "@/components/layout/footer";
import { MarketingHeader } from "@/components/layout/marketing-header";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Stonix | Modern Stock Tracking Application for Your Portfolio",
  description:
    "An open-source stock tracking application that helps you keep track of your portfolio and make better investment decisions.",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function HomeLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader className="mx-auto w-full max-w-4xl" />
      {children}
      <Footer />
    </>
  );
}
