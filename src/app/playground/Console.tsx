"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { LogEntry } from "./runner";

const levelClass: Record<LogEntry["level"], string> = {
  log: "text-foreground",
  info: "text-sky-600 dark:text-sky-400",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
};

export function Console({
  entries,
  running,
}: {
  entries: LogEntry[];
  running: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-9 items-center justify-between border-b px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <span>Console</span>
        <span
          className={cn(
            "transition-opacity",
            running ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            Running
          </span>
        </span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto font-mono text-[13px]">
        {entries.length === 0 ? (
          <div className="p-4 text-muted-foreground">
            No output yet. Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[12px]">
              console.log(…)
            </code>
            .
          </div>
        ) : (
          <ul className="divide-y divide-border/50">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className={cn(
                  "whitespace-pre-wrap break-words px-3 py-1.5 leading-relaxed",
                  levelClass[entry.level],
                )}
              >
                {entry.parts.join(" ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
