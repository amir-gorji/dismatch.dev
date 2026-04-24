import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { playgroundSnippet } from '../_data/snippets';

export function PlaygroundTeaser() {
  return (
    <section className='border-b border-border/70 py-16 sm:py-24'>
      <div className='grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'>
        <div>
          <p className='accent-pill'>
            <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand) motion-safe:animate-pulse' />
            Live in your browser
          </p>
          <h2 className='mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl'>
            Try the API without an install.
          </h2>
          <p className='mt-3 max-w-md text-base leading-7 text-muted-foreground'>
            The playground bundles dismatch from a CDN, runs your TypeScript in
            the browser, and prints the output beside your code. Useful for
            spiking a union before you commit to it.
          </p>
          <div className='mt-6 flex items-center gap-3'>
            <Link
              href='/playground/'
              className={cn(buttonVariants({ size: 'lg' }), 'bg-(--color-accent-brand-strong) text-background hover:bg-(--color-accent-brand)')}
            >
              Open the playground
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <path d='M5 12h14' />
                <path d='m13 6 6 6-6 6' />
              </svg>
            </Link>
            <span className='text-xs text-muted-foreground'>
              Pick a published version, hit Run
            </span>
          </div>
        </div>

        <div className='code-panel relative overflow-hidden'>
          <div className='flex items-center gap-2 border-b border-border/70 px-3 py-2 text-[11px] text-muted-foreground'>
            <span className='flex gap-1'>
              <span className='h-2 w-2 rounded-full bg-destructive/70' />
              <span className='h-2 w-2 rounded-full bg-amber-400/70' />
              <span className='h-2 w-2 rounded-full bg-emerald-400/70' />
            </span>
            <span className='ml-2 font-mono'>{playgroundSnippet.label}</span>
            <span className='ml-auto rounded-full border border-border/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground'>
              dismatch@latest
            </span>
          </div>
          <div
            className='shiki-host terminal-caret'
            dangerouslySetInnerHTML={{ __html: playgroundSnippet.html }}
          />
          <div className='flex items-center justify-between border-t border-border/70 bg-muted/30 px-4 py-2 text-[11px] font-mono text-muted-foreground'>
            <span>$ run.ts</span>
            <span className='text-(--color-accent-brand-strong)'>
              ✓ ready · output below
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
