"use client";

import { AppSidebar } from "@/components/collapes/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Providers from "@/lib/providers";

export default function ContentLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
