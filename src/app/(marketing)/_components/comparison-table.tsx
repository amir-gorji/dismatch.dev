import { cn } from '@/lib/utils';

type Cell =
  | { kind: 'yes'; note?: string }
  | { kind: 'partial'; note?: string }
  | { kind: 'no'; note?: string }
  | { kind: 'text'; note: string };

type Column = {
  id: string;
  label: string;
  highlight?: boolean;
  caption?: string;
};

type Row = {
  capability: string;
  cells: Record<string, Cell>;
};

const columns: Column[] = [
  { id: 'plain', label: 'plain TypeScript', caption: 'switch + tagged objects' },
  { id: 'tspat', label: 'ts-pattern', caption: 'pattern matcher' },
  { id: 'effect', label: '@effect/match', caption: 'inside the Effect ecosystem' },
  { id: 'dismatch', label: 'dismatch', caption: 'DU toolkit', highlight: true },
];

const rows: Row[] = [
  {
    capability: 'Bundle weight',
    cells: {
      plain: { kind: 'text', note: '0 — built in' },
      tspat: { kind: 'text', note: '~7.7 kB' },
      effect: { kind: 'text', note: 'ecosystem-sized' },
      dismatch: { kind: 'text', note: '~2 kB' },
    },
  },
  {
    capability: 'Zero dependencies',
    cells: {
      plain: { kind: 'yes' },
      tspat: { kind: 'yes' },
      effect: { kind: 'no' },
      dismatch: { kind: 'yes' },
    },
  },
  {
    capability: 'Exhaustive matching',
    cells: {
      plain: { kind: 'partial', note: 'via never trick' },
      tspat: { kind: 'yes', note: '.exhaustive()' },
      effect: { kind: 'yes' },
      dismatch: { kind: 'yes', note: 'default' },
    },
  },
  {
    capability: 'Constructors auto-generated',
    cells: {
      plain: { kind: 'no' },
      tspat: { kind: 'no' },
      effect: { kind: 'partial', note: 'via Data.tagged' },
      dismatch: { kind: 'yes' },
    },
  },
  {
    capability: 'Typed array filtering with is()',
    cells: {
      plain: { kind: 'no' },
      tspat: { kind: 'no' },
      effect: { kind: 'partial' },
      dismatch: { kind: 'yes', note: 'single + multi' },
    },
  },
  {
    capability: 'Schema-aware runtime check',
    cells: {
      plain: { kind: 'no' },
      tspat: { kind: 'no' },
      effect: { kind: 'no' },
      dismatch: { kind: 'yes', note: 'isKnown' },
    },
  },
  {
    capability: 'Collection fold / count / partition',
    cells: {
      plain: { kind: 'partial', note: 'reduce by hand' },
      tspat: { kind: 'no' },
      effect: { kind: 'partial' },
      dismatch: { kind: 'yes' },
    },
  },
  {
    capability: 'Partial transforms (map / mapAll)',
    cells: {
      plain: { kind: 'no' },
      tspat: { kind: 'no' },
      effect: { kind: 'no' },
      dismatch: { kind: 'yes' },
    },
  },
];

export function ComparisonTable() {
  return (
    <section className='border-b border-border/70 py-16 sm:py-24'>
      <div className='max-w-2xl'>
        <p className='accent-pill'>
          <span className='h-1.5 w-1.5 rounded-full bg-(--color-accent-brand)' />
          How it compares
        </p>
        <h2 className='mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl'>
          ts-pattern matches any pattern. <br className='hidden sm:inline' />
          dismatch <em className='not-italic text-(--color-accent-brand-strong)'>manages</em> discriminated unions.
        </h2>
        <p className='mt-3 max-w-xl text-base leading-7 text-muted-foreground'>
          A scalpel for the one job most TypeScript apps do every day:{' '}
          <span className='font-mono text-sm'>{'{ type: \'x\' } | { type: \'y\' }'}</span>.
        </p>
      </div>

      <div className='mt-10 panel-surface overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[720px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-border/70 bg-muted/40 text-left'>
                <th className='px-5 py-4 align-bottom text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Capability
                </th>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className={cn(
                      'px-4 py-4 align-bottom',
                      col.highlight &&
                        'bg-(--color-accent-brand-soft) text-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'block font-mono text-sm font-semibold',
                        col.highlight && 'text-(--color-accent-brand-strong)',
                      )}
                    >
                      {col.label}
                    </span>
                    {col.caption ? (
                      <span className='mt-1 block text-[11px] font-normal text-muted-foreground'>
                        {col.caption}
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.capability}
                  className={cn(
                    'border-b border-border/40 last:border-b-0',
                    i % 2 === 1 && 'bg-muted/15',
                  )}
                >
                  <th
                    scope='row'
                    className='px-5 py-3 text-left text-sm font-medium text-foreground'
                  >
                    {row.capability}
                  </th>
                  {columns.map((col) => {
                    const cell = row.cells[col.id];
                    return (
                      <td
                        key={col.id}
                        className={cn(
                          'px-4 py-3 align-middle text-sm',
                          col.highlight && 'bg-(--color-accent-brand-soft)',
                        )}
                      >
                        <CellContent cell={cell} highlight={col.highlight} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CellContent({
  cell,
  highlight,
}: {
  cell: Cell;
  highlight?: boolean;
}) {
  if (cell.kind === 'text') {
    return (
      <span
        className={cn(
          'font-mono text-[13px]',
          highlight ? 'font-semibold text-foreground' : 'text-muted-foreground',
        )}
      >
        {cell.note}
      </span>
    );
  }
  return (
    <span className='inline-flex items-center gap-2'>
      {cell.kind === 'yes' && (
        <Mark
          shape='check'
          className={cn(
            highlight
              ? 'bg-(--color-accent-brand) text-background'
              : 'bg-(--color-accent-brand)/15 text-(--color-accent-brand-strong)',
          )}
        />
      )}
      {cell.kind === 'partial' && (
        <Mark
          shape='dash'
          className='bg-amber-500/15 text-amber-600 dark:text-amber-300'
        />
      )}
      {cell.kind === 'no' && (
        <Mark
          shape='cross'
          className='bg-destructive/10 text-destructive'
        />
      )}
      {cell.note ? (
        <span className='text-[12px] text-muted-foreground'>{cell.note}</span>
      ) : null}
    </span>
  );
}

function Mark({
  shape,
  className,
}: {
  shape: 'check' | 'cross' | 'dash';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full',
        className,
      )}
      aria-hidden='true'
    >
      <svg
        width='10'
        height='10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        {shape === 'check' && <path d='M5 12l4 4 10-10' />}
        {shape === 'cross' && (
          <>
            <path d='M6 6l12 12' />
            <path d='M18 6L6 18' />
          </>
        )}
        {shape === 'dash' && <path d='M6 12h12' />}
      </svg>
    </span>
  );
}
