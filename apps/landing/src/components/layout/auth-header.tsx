"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function AuthHeader() {
  const locale = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-40 shadow-sm saturate-100 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[60px] items-center justify-between px-8">
        <Link
          href={`/${locale}`}
          aria-label="Home"
          title="Home"
          className="flex items-center space-x-2"
        >
          <Image
            className="rounded-full"
            src="/favicon.ico"
            alt="Logo of Stonix"
            quality={100}
            width={40}
            height={40}
            draggable={false}
          />
          <h1 className="hidden text-2xl font-bold sm:block">Stonix</h1>
        </Link>
        <div className="flex-shrink-0 flex items-center justify-end space-x-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
