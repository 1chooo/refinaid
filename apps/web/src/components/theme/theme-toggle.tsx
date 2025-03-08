"use client";

import { Button } from "@/components/ui/button";
import { MoonStar, Sun } from "lucide-react";
import { useMountedTheme } from "@/lib/use-mounted-theme";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useMountedTheme();

  const Icon = mounted && theme === "dark" ? MoonStar : Sun;

  return (
    <Button
      disabled={!mounted || theme === undefined}
      variant="ghost"
      size="sm"
      aria-label="Theme toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Icon className="w-5" />
    </Button>
  );
}
