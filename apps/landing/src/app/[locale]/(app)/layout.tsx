"use client";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";

export default function ContentLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <Providers>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh)] bg-slate-50 dark:bg-slate-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
        )}
      >
        {children}
        <Toaster />
      </main>
    </Providers>
  );
}
