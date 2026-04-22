import Link from "next/link";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(38,84,124,0.16),transparent_62%)]" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-5 sm:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-border/70 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-border bg-card text-sm font-semibold text-foreground shadow-sm">
              d/
            </span>
            <div>
              <p className="font-heading text-sm font-semibold tracking-tight">
                dismatch
              </p>
              <p className="text-xs text-muted-foreground">
                Type-safe pattern matching for TypeScript
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/#install"
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Install
              </Link>
              <Link
                href="/#api"
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                API
              </Link>
              <a
                href="https://github.com/amir-gorji/dismatch"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <Link
                href="/playground"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Playground
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="flex flex-col gap-3 border-t border-border/70 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Lightweight discriminated unions, constructors, and exhaustive matching.</p>
          <div className="flex items-center gap-4">
            <Link href="/playground" className="transition-colors hover:text-foreground">
              Open playground
            </Link>
            <a
              href="https://www.npmjs.com/package/dismatch"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              npm
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
