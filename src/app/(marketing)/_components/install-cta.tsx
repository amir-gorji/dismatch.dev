import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { CopyButton } from './copy-button';

const INSTALL = 'npm install dismatch';

export function InstallCta() {
  return (
    <section className='py-16 sm:py-24'>
      <div className='panel-surface relative overflow-hidden p-8 sm:p-12'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-(--color-accent-brand-soft) blur-3xl'
        />
        <div className='relative flex flex-col items-start gap-6'>
          <p className='accent-pill'>
            <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand)' />
            Two kilobytes from done
          </p>
          <h2 className='max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl'>
            Install once. Stop hand-rolling tagged objects.
          </h2>

          <div className='flex w-full max-w-xl items-stretch overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm'>
            <span className='flex select-none items-center pl-5 pr-3 font-mono text-sm text-muted-foreground'>
              $
            </span>
            <pre className='m-0 flex-1 overflow-x-auto bg-transparent py-4 font-mono text-sm text-foreground'>
              <code>{INSTALL}</code>
            </pre>
            <CopyButton
              value={INSTALL}
              className='m-2 self-center'
              label='Copy install command'
            />
          </div>

          <div className='flex flex-wrap gap-3'>
            <a
              href='https://www.npmjs.com/package/dismatch'
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-(--color-accent-brand-strong) text-background hover:bg-(--color-accent-brand)',
              )}
            >
              View on npm
            </a>
            <a
              href='https://github.com/amir-gorji/dismatch'
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
            >
              <GithubGlyph />
              GitHub
            </a>
            <Link
              href='/playground/'
              className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }))}
            >
              Try in playground
            </Link>
          </div>

          <p className='text-sm leading-6 text-muted-foreground'>
            <span className='font-medium text-foreground'>ts-pattern matches any pattern. dismatch manages discriminated unions.</span>{' '}
            One schema for the {`{ type: 'x' } | { type: 'y' }`} world that
            most TypeScript apps live in.
          </p>
        </div>
      </div>
    </section>
  );
}

export function GithubGlyph({ className }: { className?: string }) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
      className={className}
    >
      <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.95-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.57.24 2.73.12 3.02.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.66.79.55C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z' />
    </svg>
  );
}
