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
    <svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      role='img'
      aria-label={title}
      className={cn('brand-tile', className)}
    >
      <title>{title}</title>
      <defs>
        <clipPath id='dm-frame'>
          <rect x='0' y='0' width='64' height='64' rx='14' ry='14' />
        </clipPath>
      </defs>
      <g clipPath='url(#dm-frame)'>
        <rect x='0' y='0' width='64' height='64' fill='currentColor' opacity='0.06' />
        <polygon points='0,0 64,0 64,28 28,64 0,64' fill='var(--color-accent-brand)' />
        <polygon
          points='34,64 64,34 64,64'
          fill='currentColor'
          opacity='0.92'
        />
        <circle
          cx='42'
          cy='22'
          r='3.4'
          fill='var(--background)'
          stroke='var(--color-accent-brand-strong)'
          strokeWidth='1.4'
        />
      </g>
      <rect
        x='0.5'
        y='0.5'
        width='63'
        height='63'
        rx='14'
        ry='14'
        fill='none'
        stroke='currentColor'
        strokeOpacity='0.18'
      />
    </svg>
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
