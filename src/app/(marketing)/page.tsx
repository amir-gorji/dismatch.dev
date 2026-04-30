import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { BeforeAfter } from './_components/before-after';
import { BentoGrid } from './_components/bento-grid';
import { CopyButton } from './_components/copy-button';
import { ComparisonTable } from './_components/comparison-table';
import { GithubGlyph, InstallCta } from './_components/install-cta';
import { HeroShowcase } from './_components/hero-showcase';
import { PlaygroundTeaser } from './_components/playground-teaser';
import { UseCaseTabs } from './_components/use-case-tabs';
import { heroSnippets, useCases } from './_data/snippets';

const INSTALL = 'npm i dismatch';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <BeforeAfter />
      <BentoGrid />
      <ComparisonTable />
      <UseCasesSection />
      <PlaygroundTeaser />
      <InstallCta />
    </div>
  );
}

function Hero() {
  return (
    <section className='relative grid gap-10 py-12 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center'>
      <div className='max-w-2xl'>
        <p className='accent-pill'>
          <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand) motion-safe:animate-pulse' />
          v2.5 — ~1.4 kB gzipped · zero deps · async included
        </p>

        <h1 className='mt-6 font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl'>
          Discriminated unions,{' '}
          <span className='text-(--color-accent-brand-strong)'>without the boilerplate</span>.
        </h1>

        <p className='mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl'>
          One schema gives you constructors, type guards, exhaustive matching,
          partial transforms, and collection ops. Built for the{' '}
          <span className='font-mono text-base text-foreground/80'>{`{ type: 'x' } | { type: 'y' }`}</span>{' '}
          world most TypeScript apps live in.
        </p>

        <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:flex-wrap'>
          <Link
            href='/docs/'
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-(--color-accent-brand-strong) text-background hover:bg-(--color-accent-brand)',
            )}
          >
            Read the Docs
          </Link>

          <Link
            href='/playground/'
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
          >
            Open Playground
          </Link>

          <div className='flex items-center overflow-hidden rounded-lg border border-border/70 bg-card/80 shadow-sm sm:max-w-xs'>
            <span className='flex select-none items-center pl-3 pr-2 font-mono text-xs text-muted-foreground'>
              $
            </span>
            <pre className='m-0 flex-1 bg-transparent py-2.5 font-mono text-sm text-foreground'>
              <code>{INSTALL}</code>
            </pre>
            <CopyButton
              value={INSTALL}
              className='m-1 h-9 w-9'
              label='Copy install command'
            />
          </div>
        </div>

        <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground'>
          <a
            href='https://github.com/amir-gorji/dismatch'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 transition-colors hover:text-foreground'
          >
            <GithubGlyph />
            github.com/amir-gorji/dismatch
          </a>
          <a
            href='https://www.npmjs.com/package/dismatch'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 transition-colors hover:text-foreground'
          >
            <span className='font-mono text-[11px] tracking-wider'>npm</span>
            npmjs.com/package/dismatch
          </a>
        </div>
      </div>

      <div className='lg:pl-4'>
        <HeroShowcase snippets={heroSnippets} />
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className='border-b border-border/70 py-16 sm:py-24'>
      <div className='max-w-2xl'>
        <p className='accent-pill'>
          <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand)' />
          What it looks like
        </p>
        <h2 className='mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl'>
          The shapes you reach for every week.
        </h2>
        <p className='mt-3 max-w-xl text-base leading-7 text-muted-foreground'>
          Same primitives, four common screens. Pick a tab — the same
          declaration drives the constructors, the matcher, and the type
          guards.
        </p>
      </div>

      <div className='mt-10'>
        <UseCaseTabs cases={useCases} />
      </div>
    </section>
  );
}
