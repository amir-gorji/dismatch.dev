import { cn } from '@/lib/utils';
import type { Snippet } from '../_data/snippets';

import { CopyButton } from './copy-button';

interface CodeBlockProps {
  snippet: Snippet;
  className?: string;
  showCopy?: boolean;
  caption?: string;
  filename?: string;
}

export function CodeBlock({
  snippet,
  className,
  showCopy = true,
  caption,
  filename,
}: CodeBlockProps) {
  const cap = caption ?? snippet.caption;
  const hasHeader = Boolean(filename || cap);
  return (
    <div className={cn('code-panel', className)}>
      {hasHeader && (
        <div className='flex items-center justify-between gap-4 border-b border-border/70 px-4 py-2 text-xs text-muted-foreground'>
          <span className='truncate font-mono'>{filename ?? snippet.label}</span>
          {cap ? <span className='truncate text-right'>{cap}</span> : null}
        </div>
      )}
      <div className='relative'>
        {showCopy ? (
          <CopyButton
            value={snippet.code}
            className='absolute right-3 top-3 z-10 opacity-70 transition-opacity hover:opacity-100'
          />
        ) : null}
        <div
          className='shiki-host'
          dangerouslySetInnerHTML={{ __html: snippet.html }}
        />
      </div>
    </div>
  );
}
