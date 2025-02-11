"use client";
import React, { useEffect, useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowRight, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Projects", href: "/projects", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Team", href: "/team", current: false },
];

export default function Header() {
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 5 ? setIsTop(false) : setIsTop(true); // adjust the value as needed
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header
      className={cn(
        " fixed left-0 top-0 w-screen z-50 transition-all",
        isTop
          ? "bg-transparent border-b border-transparent shadow-none"
          : "bg-background border-b border-black/10 ",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <Link href={"/"} className="flex flex-shrink-0 items-center">
              <Image
                className={cn("block transition-all h-10 w-auto")}
                src="/logo.png"
                alt="Refinaid"
                width={2608}
                height={769}
                priority={true}
              />
            </Link>
            <div className="hidden sm:ml-6 sm:flex items-center justify-center">
              <div className="flex gap-1 items-center">
                {navigation.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-zinc-600 rounded-full px-4 py-2 text-sm transition-all",
                        pathname !== item.href
                          ? "hover:bg-zinc-100"
                          : "hover:text-zinc-600",
                      )}
                    >
                      <p className={"relative px-0.5"}>
                        {item.name}
                        {pathname === item.href && (
                          <motion.span
                            layoutId={"nav-underline"}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              duration: 0.5,
                            }}
                            className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-gh-text-secondary"
                          />
                        )}
                      </p>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full p-1">
            <Link
              href={"https://github.com/1chooo/1chooo.com"}
              className="pl-2.5 p-1 rounded-full hover:bg-zinc-100 transition-all duration-200 flex items-center gap-2 border border-border bg-white shadow-sm"
            >
              <span className="text-sm font-medium">GitHub</span>
              <FaGithub className="h-6 w-6 text-zinc-700" />
            </Link>
            <Link
              href={"/#"}
              className="hidden sm:block p-1 rounded-full hover:bg-zinc-100 transition-all duration-200"
            >
              <FaDiscord className="h-6 w-6 text-secondary-foreground hover:text-primary transition-colors" />
            </Link>
            <Link
              href={"/#"}
              className="hidden sm:block p-1 rounded-full hover:bg-zinc-100 transition-all duration-200"
            >
              <FaXTwitter className="h-5 w-5 text-secondary-foreground hover:text-primary transition-colors" />
            </Link>
            <nav className="flex items-center sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"ghost"} size={"icon"} className="">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Open Main Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[80vw]">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                  </SheetHeader>
                  <Image
                    src="/logo.png"
                    alt="Refinaid"
                    width={2608}
                    height={769}
                    priority={true}
                    className="w-24 h-auto mb-4"
                  />
                  <h2 className="font-semibold mt-8">Navigation</h2>
                  <div className="flex flex-col gap-2 mt-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-zinc-600 hover:text-zinc-900 transition-all border-b border-border py-2 flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>

                  <h2 className="font-semibold mt-8">Socials</h2>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href={"https://github.com/1chooo/refinaid"}
                      className="text-base font-medium text-zinc-600 hover:text-zinc-900 transition-all border-b border-border py-2 flex items-center justify-between"
                    >
                      GitHub
                      <FaGithub className="h-4 w-4" />
                    </Link>
                    <Link
                      href={"/#"}
                      className="text-base font-medium text-zinc-600 hover:text-zinc-900 transition-all border-b border-border py-2 flex items-center justify-between"
                    >
                      Discord
                      <FaDiscord className="h-4 w-4" />
                    </Link>
                    <Link
                      href={"/#"}
                      className="text-base font-medium text-zinc-600 hover:text-zinc-900 transition-all border-b border-border py-2 flex items-center justify-between"
                    >
                      Twitter / X
                      <FaXTwitter className="h-4 w-4" />
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}