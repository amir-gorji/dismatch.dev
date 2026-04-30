import Link from "next/link";

import { cn } from "@/lib/utils";

type TryInPlaygroundProps = {
  id: string;
  label?: string;
  className?: string;
};

export function TryInPlayground({
  id,
  label = "Try in Playground",
  className,
}: TryInPlaygroundProps) {
  return (
    <Link
      href={`/playground/?snippet=${encodeURIComponent(id)}`}
      className={cn(
        "not-prose inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:border-(--color-accent-brand)/50 hover:text-fd-foreground",
        className,
      )}
    >
      <span aria-hidden="true">▶</span>
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
