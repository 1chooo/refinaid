"use client";

import { useMountedTheme } from "@/lib/use-mounted-theme";
import { cn } from "@/lib/utils";

export const Gradient = () => {
  const { theme, mounted } = useMountedTheme();

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-transparent to-transparent absolute top-0 left-0 w-full h-[100dvh] opacity-50 via-70% transition-opacity",
        // the opacity-0 class is used to prevent the Flash of Unstyled Content (FOUC)
        mounted
          ? theme === "dark"
            ? "via-[#613b95]"
            : "via-[#FF9900]"
          : "opacity-0",
      )}
    />
  );
};
