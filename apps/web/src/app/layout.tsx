import type { Metadata } from "next";

import { inter } from "@/styles/fonts";
import ThemeProvider from "@/components/theme/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer"

import "./globals.css";

export const metadata: Metadata = {
  title: "Tools | Chun-Ho Hugo Lin (1chooo) | Open Source Enthusiast",
  description: "A collection of free online tools created by Chun-Ho Hugo Lin (1chooo), inspired by Tsz Hong Tsang (tszhong0411).",
};

function RootLayout({ children }: { readonly children: React.ReactNode; }) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='relative mx-auto mb-16 max-w-4xl px-8 py-24'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
