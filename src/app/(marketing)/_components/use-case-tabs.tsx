'use client';

import { useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import type { Snippet } from '../_data/snippets';

interface UseCaseTabsProps {
  cases: Snippet[];
}

export function UseCaseTabs({ cases }: UseCaseTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const focusTab = (index: number) => {
    const next = (index + cases.length) % cases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = cases[active];

  return (
    <div className='panel-surface overflow-hidden'>
      <div
        role='tablist'
        aria-label='Real-world dismatch examples'
        className='flex flex-wrap items-center gap-1 border-b border-border/70 px-3 py-2'
      >
        {cases.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role='tab'
              id={`${baseId}-tab-${c.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${c.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  focusTab(i + 1);
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  focusTab(i - 1);
                } else if (event.key === 'Home') {
                  event.preventDefault();
                  focusTab(0);
                } else if (event.key === 'End') {
                  event.preventDefault();
                  focusTab(cases.length - 1);
                }
              }}
              className={cn(
                'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {c.label}
              {isActive && (
                <span className='absolute inset-x-2 -bottom-px h-px rounded-full bg-(--color-accent-brand)' />
              )}
            </button>
          );
        })}
      </div>

      <div
        role='tabpanel'
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        key={current.id}
        className='motion-safe:animate-[panel-fade-in_0.4s_ease-out]'
      >
        {current.caption && (
          <p className='border-b border-border/40 px-5 py-3 text-sm text-muted-foreground'>
            {current.caption}
          </p>
        )}
        <div
          className='shiki-host'
          dangerouslySetInnerHTML={{ __html: current.html }}
        />
      </div>
    </div>
  );
}
