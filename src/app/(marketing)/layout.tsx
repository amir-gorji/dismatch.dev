import Link from 'next/link';
import type { ReactNode } from 'react';

import { BrandLockup } from '@/components/brand-mark';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { GithubGlyph } from './_components/install-cta';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='relative min-h-dvh bg-background text-foreground'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--color-accent-brand)_18%,transparent),transparent_60%)]'
      />
      <div className='relative flex min-h-dvh flex-col'>
        <header className='sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md'>
          <div className='mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8'>
            <Link
              href='/'
              className='flex items-center gap-3 transition-opacity hover:opacity-80'
            >
              <BrandLockup
                size={36}
                tagline='Type-safe pattern matching'
              />
            </Link>

            <div className='flex items-center gap-1'>
              <nav className='hidden items-center gap-1 md:flex'>
                <Link
                  href='/docs/'
                  className='rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  Docs
                </Link>
                <a
                  href='https://www.npmjs.com/package/dismatch'
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  npm
                </a>
                <a
                  href='https://github.com/amir-gorji/dismatch'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='GitHub repository'
                  className='inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground'
                >
                  <GithubGlyph className='h-4 w-4' />
                </a>
              </nav>
              <ThemeToggle />
              <Link
                href='/playground/'
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'ml-1',
                )}
              >
                Playground
              </Link>
            </div>
          </div>
        </header>

        <main className='mx-auto w-full max-w-7xl flex-1 px-5 sm:px-8'>
          {children}
        </main>

        <footer className='border-t border-border/70'>
          <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between'>
            <div>
              <BrandLockup size={32} />
              <p className='mt-3 max-w-md text-sm leading-6 text-muted-foreground'>
                Lightweight discriminated unions for TypeScript. Constructors,
                guards, exhaustive matchers, transforms, and collection ops —
                from one schema, in roughly two kilobytes.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
              <Link
                href='/playground/'
                className='transition-colors hover:text-foreground'
              >
                Playground
              </Link>
              <a
                href='https://www.npmjs.com/package/dismatch'
                target='_blank'
                rel='noreferrer'
                className='transition-colors hover:text-foreground'
              >
                npm
              </a>
              <a
                href='https://github.com/amir-gorji/dismatch'
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-1.5 transition-colors hover:text-foreground'
              >
                <GithubGlyph className='h-3.5 w-3.5' />
                GitHub
              </a>
              <a
                href='https://github.com/amir-gorji/dismatch/blob/main/LICENSE'
                target='_blank'
                rel='noreferrer'
                className='transition-colors hover:text-foreground'
              >
                MIT
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
