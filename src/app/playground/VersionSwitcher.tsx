"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function VersionSwitcher({
  versions,
  value,
  onChange,
  loading,
}: {
  versions: string[];
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
}) {
  return (
    <Select
      value={value || null}
      onValueChange={(v) => {
        if (typeof v === "string") onChange(v);
      }}
      disabled={loading}
    >
      <SelectTrigger
        className="h-8 min-w-32 font-mono text-xs"
        aria-label="dismatch version"
      >
        <span className="text-muted-foreground mr-1">dismatch@</span>
        <SelectValue placeholder={loading ? "loading…" : "version"} />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {versions.map((v) => (
          <SelectItem key={v} value={v} className="font-mono text-xs">
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
