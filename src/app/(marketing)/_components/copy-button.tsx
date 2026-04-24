'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
}

export function CopyButton({ value, className, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type='button'
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {
          // ignore
        }
      }}
      aria-label={copied ? 'Copied' : label}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-card/80 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-brand)',
        className,
      )}
    >
      {copied ? (
        <Check className='h-4 w-4 text-(--color-accent-brand-strong)' />
      ) : (
        <Copy className='h-4 w-4' />
      )}
    </button>
  );
}
