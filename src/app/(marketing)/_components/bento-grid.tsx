import { cn } from '@/lib/utils';
import { bento } from '../_data/snippets';

import { BentoTsError } from './bento-ts-error';
import { CodeBlock } from './code-block';

export function BentoGrid() {
  return (
    <section className='border-b border-border/70 py-16 sm:py-24'>
      <div className='max-w-2xl'>
        <p className='accent-pill'>
          <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand)' />
          Why dismatch
        </p>
        <h2 className='mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl'>
          One schema. The whole toolkit.
        </h2>
        <p className='mt-3 max-w-xl text-base leading-7 text-muted-foreground'>
          Constructors, type guards, exhaustive matching, partial transforms,
          collection ops — all generated from a single declaration. No
          boilerplate left to forget.
        </p>
      </div>

      <div className='mt-10 grid auto-rows-[minmax(0,1fr)] gap-4 lg:grid-cols-6'>
        <Card className='lg:col-span-4 lg:row-span-2'>
          <Eyebrow>Compile-time exhaustiveness</Eyebrow>
          <CardTitle>Forget a branch and TypeScript stops you.</CardTitle>
          <CardDescription>
            Matchers narrow the discriminator down to{' '}
            <span className='font-mono text-xs'>never</span>. Miss a case and
            the compiler points at the missing key — no opt-in{' '}
            <span className='font-mono text-xs'>.exhaustive()</span> call
            required.
          </CardDescription>
          <BentoTsError />
        </Card>

        <Card className='lg:col-span-2'>
          <Eyebrow>Tiny</Eyebrow>
          <CardTitle>
            <span className='text-(--color-accent-brand-strong)'>2.04 kB</span>{' '}
            minified.
          </CardTitle>
          <ul className='mt-1 space-y-2 text-sm text-muted-foreground'>
            <li className='flex items-center gap-2'>
              <Tick /> zero runtime dependencies
            </li>
            <li className='flex items-center gap-2'>
              <Tick />{' '}
              <span className='font-mono text-xs'>sideEffects: false</span>
            </li>
            <li className='flex items-center gap-2'>
              <Tick /> ESM + CJS shipped
            </li>
          </ul>
        </Card>

        <Card className='lg:col-span-2'>
          <Eyebrow>RemoteData included</Eyebrow>
          <CardTitle>The four-state UI in one import.</CardTitle>
          <CardDescription className='mb-3'>
            <span className='font-mono text-xs'>notAsked · loading · failure · success</span> — the
            shape every async screen wants.
          </CardDescription>
          <CodeBlock snippet={bento.remote} showCopy={false} />
        </Card>

        <Card className='lg:col-span-3'>
          <Eyebrow>One schema, ten capabilities</Eyebrow>
          <CardTitle>
            <span className='font-mono text-base'>createUnion</span> is the whole API.
          </CardTitle>
          <CodeBlock snippet={bento.schema} showCopy={false} />
        </Card>

        <Card className='lg:col-span-3'>
          <Eyebrow>Reusable matchers</Eyebrow>
          <CardTitle>Handlers-first. Matchers compose like values.</CardTitle>
          <CodeBlock snippet={bento.handlers} showCopy={false} />
        </Card>

        <Card className='lg:col-span-3'>
          <Eyebrow>Type guards that narrow arrays</Eyebrow>
          <CardTitle>
            <span className='font-mono text-base'>is(value, variant)</span> — single, multi, sub-union.
          </CardTitle>
          <CodeBlock snippet={bento.is} showCopy={false} />
        </Card>

        <Card className='lg:col-span-3'>
          <Eyebrow>Collection ops you didn&apos;t know you needed</Eyebrow>
          <CardTitle>
            <span className='font-mono text-base'>fold</span> ·{' '}
            <span className='font-mono text-base'>count</span> ·{' '}
            <span className='font-mono text-base'>partition</span>
          </CardTitle>
          <CodeBlock snippet={bento.fold} showCopy={false} />
        </Card>
      </div>
    </section>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <article className={cn('bento-card', className)}>{children}</article>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-accent-brand-strong)'>
      {children}
    </p>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='font-heading text-xl font-semibold tracking-tight sm:text-2xl'>
      {children}
    </h3>
  );
}

function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-sm leading-6 text-muted-foreground', className)}>
      {children}
    </p>
  );
}

function Tick() {
  return (
    <svg
      className='h-3.5 w-3.5 shrink-0 text-(--color-accent-brand-strong)'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='m5 12 4 4 10-10' />
    </svg>
  );
}
