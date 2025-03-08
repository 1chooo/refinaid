import type { Metadata } from "next";

import Footer from "@/components/layout/footer";
import HomeHeader from "@/components/layout/home-header";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Refinaid | Bridging the Gap with AI For Everyone",
  description:
    "An open-source learning platform, making AI accessible to everyone, no programming skills needed. Empowering all to explore the future of AI.",
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
      <HomeHeader />
      {children}
      <Footer />
    </>
  );
}
