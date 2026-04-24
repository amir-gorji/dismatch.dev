export function BentoTsError() {
  return (
    <div className='code-panel mt-4 overflow-hidden text-[12.5px] leading-7'>
      <div className='flex items-center gap-2 border-b border-border/70 px-3 py-2 text-[11px] text-muted-foreground'>
        <span className='flex gap-1'>
          <span className='h-2 w-2 rounded-full bg-destructive/70' />
          <span className='h-2 w-2 rounded-full bg-amber-400/70' />
          <span className='h-2 w-2 rounded-full bg-emerald-400/70' />
        </span>
        <span className='ml-2 font-mono'>matcher.ts</span>
      </div>
      <pre className='m-0 px-4 py-3 font-mono'>
        <code className='block'>
          <span className='text-(--tok-keyword)'>const</span>{' '}
          <span className='text-(--tok-fn)'>label</span> ={' '}
          <span className='text-(--tok-keyword)'>match</span>(state)({'{'}
        </code>
        <code className='block pl-4'>
          <span className='text-(--tok-property)'>idle</span>
          <span className='text-(--tok-punct)'>:</span>{' '}
          () =&gt;{' '}
          <span className='text-(--tok-string)'>&apos;tap to load&apos;</span>,
        </code>
        <code className='block pl-4 squiggle decoration-wavy'>
          <span className='text-(--tok-comment) line-through opacity-60'>
            loading: () =&gt; &apos;…&apos;,
          </span>
        </code>
        <code className='block pl-4'>
          <span className='text-(--tok-property)'>success</span>
          <span className='text-(--tok-punct)'>:</span>{' '}
          ({'{ data }'}) =&gt;{' '}
          <span className='text-(--tok-string)'>{'`${data.length}`'}</span>,
        </code>
        <code className='block pl-4'>
          <span className='text-(--tok-property)'>error</span>
          <span className='text-(--tok-punct)'>:</span>{' '}
          ({'{ reason }'}) =&gt;{' '}
          <span className='text-(--tok-string)'>{'`${reason}`'}</span>,
        </code>
        <code className='block'>{'});'}</code>
      </pre>
      <div className='mx-4 mt-1 mb-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-[11.5px] leading-5 text-destructive'>
        <span className='font-mono font-semibold'>TS2322</span>{' '}
        Type{' '}
        <span className='font-mono'>&apos;&quot;loading&quot;&apos;</span>{' '}
        is not assignable to type <span className='font-mono'>&apos;never&apos;</span>.
        Did you forget the <span className='font-mono'>&quot;loading&quot;</span>{' '}
        branch?
      </div>
    </div>
  );
}
