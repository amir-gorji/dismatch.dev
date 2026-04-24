'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import type { Snippet } from '../_data/snippets';

interface HeroShowcaseProps {
  snippets: Snippet[];
  intervalMs?: number;
}

export function HeroShowcase({ snippets, intervalMs = 4500 }: HeroShowcaseProps) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (pinned || paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % snippets.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [pinned, paused, reducedMotion, intervalMs, snippets.length]);

  const current = snippets[active];

  return (
    <div
      className='code-panel relative h-full'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role='tablist'
        aria-label='dismatch usage examples'
        className='flex flex-wrap items-center gap-1 border-b border-border/70 px-3 py-2'
      >
        {snippets.map((snippet, i) => {
          const isActive = i === active;
          return (
            <button
              key={snippet.id}
              role='tab'
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                setActive(i);
                setPinned(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  setActive((i + 1) % snippets.length);
                  setPinned(true);
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  setActive((i - 1 + snippets.length) % snippets.length);
                  setPinned(true);
                }
              }}
              className={cn(
                'relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {snippet.label}
              {isActive && (
                <span className='absolute inset-x-2 -bottom-px h-px rounded-full bg-(--color-accent-brand)' />
              )}
            </button>
          );
        })}
        <span className='ml-auto hidden items-center gap-2 text-[10px] tracking-wider text-muted-foreground/80 uppercase sm:inline-flex'>
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              pinned || paused || reducedMotion
                ? 'bg-muted-foreground/40'
                : 'bg-(--color-accent-brand) motion-safe:animate-pulse',
            )}
          />
          {pinned ? 'pinned' : reducedMotion ? 'static' : 'auto'}
        </span>
      </div>

      <div className='relative min-h-[330px]'>
        {current.caption && (
          <p className='border-b border-border/40 px-4 py-2 text-xs text-muted-foreground'>
            {current.caption}
          </p>
        )}
        <Crossfade html={current.html} keyId={current.id} />
      </div>
    </div>
  );
}

function Crossfade({ html, keyId }: { html: string; keyId: string }) {
  return (
    <div
      key={keyId}
      className='shiki-host motion-safe:animate-[panel-fade-in_0.45s_ease-out]'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}
