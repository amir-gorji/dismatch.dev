import { cn } from '@/lib/utils';

interface BrandMarkProps {
  size?: number;
  className?: string;
  title?: string;
}

export function BrandMark({
  size = 36,
  className,
  title = 'dismatch',
}: BrandMarkProps) {
  return (
    <span
      className={cn('inline-block shrink-0 overflow-hidden rounded-[14px]', className)}
      style={{ width: size, height: size }}
    >
      <img
        src='/logo.png'
        width={size}
        height={size}
        alt={title}
        className='block h-full w-full object-cover'
      />
    </span>
  );
}

export function BrandLockup({
  size = 36,
  className,
  tagline,
}: {
  size?: number;
  className?: string;
  tagline?: string;
}) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <BrandMark size={size} />
      <span className='flex flex-col leading-none'>
        <span className='font-heading text-base font-semibold tracking-tight text-foreground'>
          dismatch
        </span>
        {tagline ? (
          <span className='mt-1 text-xs text-muted-foreground'>{tagline}</span>
        ) : null}
      </span>
    </span>
  );
}
