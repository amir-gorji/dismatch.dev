import { cn } from '@/lib/utils';
import { beforeAfter } from '../_data/snippets';

import { CodeBlock } from './code-block';

export function BeforeAfter() {
  return (
    <section className='border-b border-border/70 py-16 sm:py-24'>
      <div className='max-w-2xl'>
        <p className='accent-pill'>
          <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand)' />
          Same logic, less ceremony
        </p>
        <h2 className='mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl'>
          The variant name <em className='not-italic text-(--color-accent-brand-strong)'>is</em> the pattern.
        </h2>
        <p className='mt-3 max-w-xl text-base leading-7 text-muted-foreground'>
          Other matchers wrap every branch in <code className='font-mono text-sm'>{`{ type: '...' }`}</code> and
          ask you to opt into exhaustiveness. dismatch dispatches on the
          discriminator directly, and exhaustiveness is the default.
        </p>
      </div>

      <div className='mt-10 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]'>
        <Panel
          tone='before'
          title={beforeAfter.before.label}
          subtitle={beforeAfter.before.caption}
        >
          <CodeBlock snippet={beforeAfter.before} showCopy={false} hideHeader />
        </Panel>

        <div className='flex items-center justify-center text-muted-foreground/70'>
          <Arrow />
        </div>

        <Panel
          tone='after'
          title={beforeAfter.after.label}
          subtitle={beforeAfter.after.caption}
        >
          <CodeBlock snippet={beforeAfter.after} hideHeader />
        </Panel>
      </div>
    </section>
  );
}

function Panel({
  tone,
  title,
  subtitle,
  children,
}: {
  tone: 'before' | 'after';
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-3 rounded-3xl border p-1.5',
        tone === 'before'
          ? 'border-destructive/30 bg-(--color-danger-soft)'
          : 'border-(--color-accent-brand)/40 bg-(--color-accent-brand-soft)',
      )}
    >
      <div className='flex items-baseline justify-between px-3 pt-2'>
        <span
          className={cn(
            'font-mono text-xs font-semibold uppercase tracking-wider',
            tone === 'before'
              ? 'text-destructive'
              : 'text-(--color-accent-brand-strong)',
          )}
        >
          {title}
        </span>
        {subtitle ? (
          <span className='hidden text-[11px] text-muted-foreground sm:inline'>
            {subtitle}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='hidden lg:block'
      aria-hidden='true'
    >
      <path d='M5 12h14' />
      <path d='m13 6 6 6-6 6' />
    </svg>
  );
}
