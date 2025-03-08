"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useLocale } from "next-intl";

const buttonVariants = cva(
  [
    "ring-offset-background inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors",
    "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export default function HomeHeader() {
  const locale = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-40 shadow-sm saturate-100 backdrop-blur-[10px] border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex h-[60px] items-center px-4 sm:px-8">
        <div className="lg:hidden mr-2">
          <DropdownMenu>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">Toggle menu</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link href={`/${locale}/tools`} className="flex items-center">
                    Tools
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link
                    href={`/${locale}/pricing`}
                    className="flex items-center"
                  >
                    Pricing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link href={`/${locale}/#`} className="flex items-center">
                    Blog
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 focus:bg-transparent">
                <Link
                  href={`/${locale}/#`}
                  className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  What&apos;s New
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-shrink-0 lg:w-[300px]">
          <Link
            href={`/${locale}/`}
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
        </div>
        <nav className="flex-grow flex justify-center">
          <div className="gap-5 text-lg font-medium hidden lg:flex">
            <Link
              className="px-3 py-2 rounded-xl transition-colors hover:bg-primary/10"
              href={`/${locale}/tools`}
              aria-label="Guestbook"
            >
              Tools
            </Link>
            <Link
              href={`/${locale}/pricing`}
              className="px-3 py-2 rounded-xl transition-colors hover:bg-primary/10"
            >
              Pricing
            </Link>
            <Link
              href={`/${locale}/#`}
              className="px-3 py-2 rounded-xl transition-colors hover:bg-primary/10"
            >
              Blog
            </Link>
          </div>
        </nav>
        <div className="flex-shrink-0 flex items-center justify-end space-x-2 lg:w-[300px]">
          <LanguageToggle />
          <ThemeToggle />
          <Link href={`/${locale}/dashboard`} className={buttonVariants()}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
