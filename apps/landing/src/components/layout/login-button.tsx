"use client";

import Link from "next/link";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function LoginButton({ className, ...props }: ButtonProps) {
  return (
    <Button asChild className={cn("rounded-full", className)} {...props}>
      <Link href="/app/login">Sign In</Link>
    </Button>
  );
}
