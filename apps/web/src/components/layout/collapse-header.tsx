"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/auth-context";
import { useLogout } from "@/firebase/auth/logout";
import { LogIn, User, House } from "lucide-react";

interface AppHeaderProps {
  title: string;
}

export function CollapseHeader({ title }: AppHeaderProps) {
  const locale = useLocale();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center">
          <SidebarTrigger className="lg:-ml-4 md:-ml-2 -ml-1" />
          <Separator orientation="vertical" className="ml-2 mr-2 h-4" />
          <h1>{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <div className="flex items-center justify-end space-x-4">
              <div className="flex items-center justify-center gap-4">
                <DropdownMenu>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="relative h-10 w-10 rounded-full"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="#" alt="Avatar" />
                              <AvatarFallback className="uppercase bg-transparent">
                                {user.email?.charAt(0)}
                                {user.email?.charAt(1)}
                              </AvatarFallback>
                            </Avatar>
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent className="uppercase" side="bottom">
                        {user.email?.charAt(0)}
                        {user.email?.charAt(1)}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenuContent align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.email?.charAt(0)}
                          {user.email?.charAt(1)}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/${locale}`}
                          className="flex items-center justify-between w-full hover:cursor-pointer"
                        >
                          <span>Home</span>
                          <House className="w-4 h-4 ml-2 text-muted-foreground" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-2 focus:bg-transparent">
                        <Link
                          href={`/${locale}/dashboard`}
                          className="flex w-full items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium hover:bg-primary/10 dark:hover:bg-primary/10"
                          onClick={(e) => {
                            e.preventDefault();
                            logout();
                          }}
                        >
                          Log Out
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <DropdownMenu>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="relative h-10 w-10 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="#" alt="Avatar" />
                          <AvatarFallback className="bg-transparent">
                            <User className="w-5" />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Login</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenuContent align="end" forceMount>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${locale}/signin`}
                      className="flex items-center justify-between w-full hover:cursor-pointer"
                    >
                      <span>Sign In</span>
                      <LogIn className="w-4 h-4 ml-2 text-muted-foreground" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${locale}`}
                      className="flex items-center justify-between w-full hover:cursor-pointer"
                    >
                      <span>Home</span>
                      <House className="w-4 h-4 ml-2 text-muted-foreground" />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
