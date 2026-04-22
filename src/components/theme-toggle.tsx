"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 rounded-full"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
