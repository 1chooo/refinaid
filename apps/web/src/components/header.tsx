"use client"

import Link from "next/link"
import React from "react"
import Image from "next/image"
import { UserNav } from "./user-nav"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { VisitGitHub } from "@/components/visit-github"

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 shadow-sm saturate-100 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[60px] items-center justify-between px-8">
        <Link href="/" aria-label="Home" title="Home">
          <Image
            className="rounded-full dark:invert mt-2"
            src="/logo.png"
            alt="Logo of Refinaid"
            quality={100}
            width={140}
            height={140}
            draggable={false}
          />
        </Link>
        <nav className="flex-1 flex justify-center mt-2">
          <div className="gap-10 text-lg font-medium hidden sm:flex">
            <Link href="/pricing">Pricing</Link>
            <Link
              href="https://refinaid-docs.vercel.app"
              target='_blank'
              rel='noreferrer noopener'
              aria-label='GitHub'
            >Guestbook</Link>
          </div>
        </nav>
        <div className="flex items-center space-x-4 mt-2">
          <VisitGitHub />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default Header
