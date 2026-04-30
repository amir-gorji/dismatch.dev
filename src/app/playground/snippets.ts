export const SNIPPETS: Record<string, string> = {
  "quick-start": `import { createUnion, type InferUnion } from "dismatch";

const Result = createUnion({
  ok: (data: string) => ({ data }),
  error: (message: string) => ({ message }),
  loading: () => ({}),
});

type Result = InferUnion<typeof Result>;

const r = Result.ok("hello");
const e = Result.error("fail");
const l = Result.loading();

console.log(r);
console.log(e);
console.log(l);
`,

  "match-reusable": `import { createUnion, type InferUnion } from "dismatch";

const Shape = createUnion({
  circle: (radius: number) => ({ radius }),
  rectangle: (width: number, height: number) => ({ width, height }),
});

type Shape = InferUnion<typeof Shape>;

const getArea = Shape.match({
  circle: ({ radius }) => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
});

const shapes: Shape[] = [Shape.circle(5), Shape.rectangle(3, 4)];

console.log(shapes.map(getArea));
`,

  "match-with-default": `import { createUnion } from "dismatch";

const Result = createUnion({
  ok: (data: string) => ({ data }),
  error: (message: string) => ({ message }),
  loading: () => ({}),
});

const banner = Result.matchWithDefault({
  error: ({ message }) => \`Something went wrong: \${message}\`,
  Default: () => "All good",
});

console.log(banner(Result.ok("hi")));
console.log(banner(Result.error("boom")));
console.log(banner(Result.loading()));
`,

  "map-mapall": `import { createUnion } from "dismatch";

const Shape = createUnion({
  circle: (radius: number) => ({ radius }),
  rectangle: (width: number, height: number) => ({ width, height }),
});

// Only circles change; rectangles pass through unchanged.
const bigger = Shape.map({
  circle: ({ radius }) => ({ radius: radius * 2 }),
});

console.log(bigger(Shape.circle(5)));
console.log(bigger(Shape.rectangle(3, 4)));

// Every variant must be handled.
const normalized = Shape.mapAll({
  circle: ({ radius }) => ({ radius: Math.abs(radius) }),
  rectangle: ({ width, height }) => ({
    width: Math.abs(width),
    height: Math.abs(height),
  }),
});

console.log(normalized(Shape.circle(-7)));
`,

  "fold": `import { fold } from "dismatch";

type Shape =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

const shapes: Shape[] = [
  { type: "circle", radius: 5 },
  { type: "rectangle", width: 4, height: 6 },
  { type: "circle", radius: 10 },
];

const stats = fold(shapes, { circles: 0, totalArea: 0 })({
  circle: (acc, { radius }) => ({
    circles: acc.circles + 1,
    totalArea: acc.totalArea + Math.PI * radius ** 2,
  }),
  rectangle: (acc, { width, height }) => ({
    ...acc,
    totalArea: acc.totalArea + width * height,
  }),
});

console.log(stats);
`,

  "fold-with-default": `import { foldWithDefault } from "dismatch";

type Notification =
  | { type: "push"; urgent: boolean; message: string }
  | { type: "email"; subject: string }
  | { type: "sms"; from: string };

const notifications: Notification[] = [
  { type: "push", urgent: true, message: "Server down" },
  { type: "email", subject: "Welcome" },
  { type: "sms", from: "+1" },
  { type: "push", urgent: false, message: "FYI" },
];

const urgentCount = foldWithDefault(notifications, 0)({
  push: (acc, { urgent }) => acc + (urgent ? 1 : 0),
  Default: (acc) => acc,
});

console.log("urgent:", urgentCount);
`,

  "is-guard": `import { createUnion, is } from "dismatch";

const Result = createUnion({
  ok: (data: string) => ({ data }),
  error: (message: string) => ({ message }),
  loading: () => ({}),
});

const r = Result.ok("hello") as ReturnType<typeof Result.ok>
  | ReturnType<typeof Result.error>
  | ReturnType<typeof Result.loading>;

if (is(r, "ok")) {
  console.log("data:", r.data);
}

const results = [Result.ok("a"), Result.error("x"), Result.loading()];
const errors = results.filter(Result.is("error"));
console.log("errors:", errors);

const settled = results.filter(Result.is(["ok", "error"]));
console.log("settled:", settled);
`,

  "count-partition": `import { count, partition } from "dismatch";

type Notification =
  | { type: "NEW" }
  | { type: "ACTION_NEEDED" }
  | { type: "INFO" };

const notifications: Notification[] = [
  { type: "NEW" },
  { type: "ACTION_NEEDED" },
  { type: "NEW" },
  { type: "INFO" },
];

console.log("new:", count(notifications, "NEW"));
console.log("actionable:", count(notifications, ["NEW", "ACTION_NEEDED"]));

const [actionable, rest] = partition(notifications, ["NEW", "ACTION_NEEDED"]);
console.log("actionable:", actionable);
console.log("rest:", rest);
`,

  "unknown-variant": `import { createUnion, match, UnknownVariantError } from "dismatch";

const Result = createUnion({
  ok: (data: string) => ({ data }),
  error: (message: string) => ({ message }),
});

// Simulate a value that came in over the wire with an unknown variant.
const apiResponse = { type: "loading" } as unknown as ReturnType<
  typeof Result.ok
>;

try {
  match(apiResponse)({
    ok: ({ data }) => data,
    error: ({ message }) => \`Error: \${message}\`,
  });
} catch (e) {
  if (e instanceof UnknownVariantError) {
    console.log("variant:", e.variant);
    console.log("known:", e.known);
  }
}
`,

  "pipe-handlers": `import { createPipeHandlers } from "dismatch";

type Shape =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

const shapeOps = createPipeHandlers<Shape>("type");

const getArea = shapeOps.match({
  circle: ({ radius }) => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
});

const shapes: Shape[] = [
  { type: "circle", radius: 1 },
  { type: "rectangle", width: 2, height: 3 },
];

console.log(shapes.map(getArea));

const circles = shapes.filter(shapeOps.is("circle"));
console.log("circles:", circles);

// Payload — pass extra context through to every handler.
const volume = shapeOps.match<number, { depth: number }>({
  circle: ({ radius }, { depth }) => Math.PI * radius ** 2 * depth,
  rectangle: ({ width, height }, { depth }) => width * height * depth,
});

console.log(volume({ type: "rectangle", width: 2, height: 5 }, { depth: 10 }));
`,

  "remote-data": `import { RemoteData, type RemoteData as RD } from "dismatch/remote-data";
import { match } from "dismatch";

type State = RD<string[]>;

const states: State[] = [
  RemoteData.idle(),
  RemoteData.loading(),
  RemoteData.refreshing(["alice"]),
  RemoteData.ok(["alice", "bob"]),
  RemoteData.failed(new Error("network")),
];

const view = (s: State) =>
  match(s)({
    idle: () => "Click to load",
    loading: () => "Loading…",
    refreshing: ({ data }) => \`Refreshing \${data.length} items…\`,
    ok: ({ data }) => \`Loaded \${data.length} items\`,
    failed: ({ error }) => \`Error: \${error.message}\`,
  });

for (const s of states) console.log(view(s));
`,

  "match-async": `import { matchAsync } from "dismatch/async";

type User =
  | { type: "admin"; id: number }
  | { type: "guest"; id: number }
  | { type: "banned"; reason: string };

const fetchAdminProfile = async (id: number) => ({ kind: "admin", id });
const fetchGuestProfile = async (id: number) => ({ kind: "guest", id });

const user: User = { type: "admin", id: 7 };

const profile = await matchAsync(user)({
  admin: async ({ id }) => fetchAdminProfile(id),
  guest: async ({ id }) => fetchGuestProfile(id),
  banned: ({ reason }) => ({ kind: "banned", reason } as const),
});

console.log(profile);
`,

  "match-all-async": `import { matchAllAsync } from "dismatch/async";

type User =
  | { type: "admin"; id: number }
  | { type: "guest"; id: number };

const users: User[] = [
  { type: "admin", id: 1 },
  { type: "guest", id: 2 },
  { type: "admin", id: 3 },
];

const profiles = await matchAllAsync(users)({
  admin: async ({ id }) => ({ kind: "admin", id }),
  guest: async ({ id }) => ({ kind: "guest", id }),
});

console.log(profiles);
`,

  "fold-async": `import { foldAsync } from "dismatch/async";

type Event =
  | { type: "click"; x: number }
  | { type: "key"; code: string };

const events: Event[] = [
  { type: "click", x: 10 },
  { type: "key", code: "Enter" },
  { type: "click", x: 5 },
];

const score = async (x: number) => x * 2;

const total = await foldAsync(events, 0)({
  click: async (acc, { x }) => acc + (await score(x)),
  key: (acc) => acc + 1,
});

console.log("total:", total);
`,

  "create-union-custom": `import { createUnion, type InferUnion } from "dismatch";

const Event = createUnion("kind", {
  click: (x: number) => ({ x }),
  key: (code: string) => ({ code }),
});

type Event = InferUnion<typeof Event>;

const events: Event[] = [Event.click(10), Event.key("Enter")];

console.log(events);
console.log("variants:", Event.variants);
console.log("discriminant:", Event.discriminant);
console.log("isKnown:", Event.isKnown({ kind: "click", x: 1 }));
console.log("isKnown(unknown):", Event.isKnown({ kind: "scroll" }));
`,
};

export function getSnippet(id: string | null | undefined): string | null {
  if (!id) return null;
  return SNIPPETS[id] ?? null;
}
