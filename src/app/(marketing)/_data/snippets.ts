import { codeToHtml } from 'shiki';

async function highlight(code: string): Promise<string> {
  return codeToHtml(code, {
    lang: 'typescript',
    themes: {
      light: 'github-light',
      dark: 'github-dark-dimmed',
    },
    defaultColor: false,
  });
}

export type Snippet = {
  id: string;
  label: string;
  caption?: string;
  code: string;
  html: string;
};

const RAW = {
  result: `import { createUnion, match } from 'dismatch';

const Result = createUnion('status', {
  ok: (data: string) => ({ data }),
  error: (message: string) => ({ message }),
});

const greet = match(Result.ok('ready'))({
  ok: ({ data }) => \`✓ \${data.toUpperCase()}\`,
  error: ({ message }) => \`✗ \${message}\`,
});`,

  asyncState: `import { createUnion, type InferUnion } from 'dismatch';

const Fetch = createUnion({
  idle: () => ({}),
  loading: () => ({}),
  success: (data: User[]) => ({ data }),
  error: (reason: string) => ({ reason }),
});
type Fetch = InferUnion<typeof Fetch>;

const render = Fetch.match({
  idle: () => 'tap to load',
  loading: () => 'loading…',
  success: ({ data }) => \`\${data.length} users\`,
  error: ({ reason }) => \`failed: \${reason}\`,
});`,

  shape: `import { createUnion, is } from 'dismatch';

const Shape = createUnion({
  circle: (radius: number) => ({ radius }),
  rectangle: (width: number, height: number) => ({ width, height }),
  triangle: (base: number, height: number) => ({ base, height }),
});

const area = Shape.match({
  circle: ({ radius }) => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
  triangle: ({ base, height }) => 0.5 * base * height,
});

shapes.filter(is('triangle')).map(area);`,

  toast: `import { createUnion } from 'dismatch';

const Toast = createUnion('kind', {
  info:    (text: string) => ({ text }),
  success: (text: string) => ({ text }),
  warning: (text: string) => ({ text }),
  error:   (text: string, retry?: () => void) => ({ text, retry }),
});

const icon = Toast.match({
  info:    () => '𝒾',
  success: () => '✓',
  warning: () => '!',
  error:   () => '✕',
});`,

  beforeTsPattern: `import { match } from 'ts-pattern';

const label = match(state)
  .with({ type: 'idle' },    () => 'tap to load')
  .with({ type: 'loading' }, () => 'loading…')
  .with({ type: 'success' }, ({ data })   => \`\${data.length} users\`)
  .with({ type: 'error' },   ({ reason }) => \`failed: \${reason}\`)
  .exhaustive();`,

  afterDismatch: `import { match } from 'dismatch';

const label = match(state)({
  idle:    () => 'tap to load',
  loading: () => 'loading…',
  success: ({ data })   => \`\${data.length} users\`,
  error:   ({ reason }) => \`failed: \${reason}\`,
});`,

  bentoSchema: `const Result = createUnion('status', {
  ok:    (data: string)    => ({ data }),
  error: (message: string) => ({ message }),
});

// All generated from one schema:
Result.ok('hi');             // constructor
Result.is('ok');             // type guard
Result.isKnown(payload);     // runtime check
Result.match({ … });         // exhaustive
Result.matchWithDefault({…});// partial
Result.map({ … });           // partial transform
Result.mapAll({ … });        // exhaustive transform
Result.variants;             // ['ok','error']`,

  bentoFold: `import { fold, count, partition } from 'dismatch';

const stats = fold(results, { ok: 0, err: 0 })({
  ok:    (acc) => ({ ...acc, ok:  acc.ok  + 1 }),
  error: (acc) => ({ ...acc, err: acc.err + 1 }),
});

const errCount    = count(results, 'error');
const [ok, fail]  = partition(results, 'ok');`,

  bentoIs: `import { is } from 'dismatch';

// Single variant
if (is(item, 'loading')) item; // narrowed → Loading

// Multi-variant — typed sub-union
const settled = results.filter((r) =>
  is(r, ['ok', 'error']),
); // (Ok | Error)[]`,

  bentoHandlers: `// Define once, reuse anywhere
const area = Shape.match({
  circle:    ({ radius })        => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
  triangle:  ({ base, height })  => 0.5 * base * height,
});

shapes.map(area);             // number[]
shapes.filter(Shape.is('circle'));`,

  bentoRemote: `import { RemoteData } from 'dismatch/remote-data';
import { match } from 'dismatch';

const view = match(state)({
  idle:       () => 'tap to load',
  loading:    () => 'loading…',
  refreshing: ({ data }) => \`refreshing \${data.length}…\`,
  ok:         ({ data }) => render(data),
  failed:     ({ error }) => error.message,
});`,

  bentoPipe: `import { createPipeHandlers } from 'dismatch';

// Bind once, reuse anywhere — no generics at the call site
const shapeOps = createPipeHandlers<Shape>('type');

const area = shapeOps.match({
  circle:    ({ radius })        => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
});

shapes.map(area);                         // number[]
shapes.filter(shapeOps.is('circle'));     // Circle[]`,

  useResult: `const Result = createUnion('status', {
  ok:    (data: string)    => ({ data }),
  error: (message: string) => ({ message }),
});

const view = Result.match({
  ok:    ({ data })    => \`got \${data}\`,
  error: ({ message }) => \`fail: \${message}\`,
});`,

  useFetch: `const Fetch = createUnion('state', {
  idle:    () => ({}),
  loading: () => ({}),
  success: (data: User[]) => ({ data }),
  error:   (reason: string) => ({ reason }),
});

const ui = Fetch.match({
  idle:    () => <Tap />,
  loading: () => <Spinner />,
  success: ({ data })   => <List items={data} />,
  error:   ({ reason }) => <Retry reason={reason} />,
});`,

  useToast: `const Toast = createUnion('kind', {
  info:    (text: string) => ({ text }),
  success: (text: string) => ({ text }),
  warning: (text: string) => ({ text }),
  error:   (text: string, retry?: () => void) => ({ text, retry }),
});

toasts.push(Toast.success('Saved.'));
toasts.push(Toast.error('Network down', retry));`,

  useForm: `const Field = createUnion('state', {
  pristine: () => ({}),
  typing:   (value: string) => ({ value }),
  invalid:  (value: string, message: string) => ({ value, message }),
  valid:    (value: string) => ({ value }),
});

const className = Field.match({
  pristine: () => 'input',
  typing:   () => 'input is-active',
  invalid:  () => 'input is-error',
  valid:    () => 'input is-ok',
});`,

  playground: `import { createUnion, is, type InferUnion } from 'dismatch';

const Shape = createUnion('type', {
  circle: (radius: number) => ({ radius }),
  rectangle: (width: number, height: number) => ({ width, height }),
  triangle: (base: number, height: number) => ({ base, height }),
});

type Shape = InferUnion<typeof Shape>;

const area = Shape.match({
  circle:    ({ radius })        => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
  triangle:  ({ base, height })  => 0.5 * base * height,
});`,
} as const;

type Key = keyof typeof RAW;

const html: Record<Key, string> = Object.fromEntries(
  await Promise.all(
    (Object.keys(RAW) as Key[]).map(
      async (key) => [key, await highlight(RAW[key])] as const,
    ),
  ),
) as Record<Key, string>;

function snip<K extends Key>(
  key: K,
  meta: Pick<Snippet, 'label' | 'caption'>,
): Snippet {
  return { id: key, code: RAW[key], html: html[key], ...meta };
}

export const heroSnippets: Snippet[] = [
  snip('result', {
    label: 'Result',
    caption: 'success / error you can match on',
  }),
  snip('asyncState', {
    label: 'Async state',
    caption: 'idle · loading · success · error',
  }),
  snip('shape', {
    label: 'Shape',
    caption: 'classic discriminated union',
  }),
  snip('toast', {
    label: 'Toast',
    caption: 'one variant per kind, no string drift',
  }),
];

export const beforeAfter = {
  before: snip('beforeTsPattern', {
    label: 'ts-pattern',
    caption: '.with() per branch · .exhaustive() · object patterns',
  }),
  after: snip('afterDismatch', {
    label: 'dismatch',
    caption: 'variant name is the pattern · exhaustive by default',
  }),
};

export const bento = {
  schema: snip('bentoSchema', { label: 'createUnion' }),
  fold: snip('bentoFold', { label: 'collections' }),
  is: snip('bentoIs', { label: 'is' }),
  handlers: snip('bentoHandlers', { label: 'reusable matchers' }),
  remote: snip('bentoRemote', { label: 'RemoteData' }),
  pipe: snip('bentoPipe', { label: 'createPipeHandlers' }),
};

export const useCases: Snippet[] = [
  snip('useResult', {
    label: 'Result',
    caption: 'success or error — the everyday shape',
  }),
  snip('useFetch', {
    label: 'Async fetch',
    caption: 'idle, loading, success, error — drives the UI',
  }),
  snip('useToast', {
    label: 'Toast',
    caption: 'every kind has its own payload, no flag soup',
  }),
  snip('useForm', {
    label: 'Form field',
    caption: 'a state machine for one input',
  }),
];

export const playgroundSnippet = snip('playground', {
  label: 'starter.ts',
});
