import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Define variants once",
    description:
      "Create a discriminated union with constructors, inferred payloads, and narrowing built in.",
  },
  {
    title: "Match exhaustively",
    description:
      "Encode every branch at the callsite and let TypeScript fail fast when a case is missing.",
  },
  {
    title: "Stay runtime-light",
    description:
      "Keep the surface area small enough for libraries, apps, and playground-style prototyping.",
  },
];

const apiHighlights = [
  "Construct tagged variants without repeating string literals.",
  "Generate type guards that narrow cleanly in userland code.",
  "Write exhaustive matchers with readable result branches.",
];

export default function HomePage() {
  return (
    <div className="py-10 sm:py-16">
      <section className="grid gap-10 border-b border-border/70 pb-14 sm:pb-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent-strong)]" />
            Production-ready API surface, live browser playground
          </div>
          <div className="mt-4">
            <a
              href="https://github.com/amir-gorji/dismatch"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Type-safe discriminated unions for teams that want less ceremony.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            `dismatch` gives you constructors, type guards, and exhaustive
            matching without forcing a framework or a compiler trick into your
            application architecture.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playground"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Open playground
            </Link>
            <a
              href="https://www.npmjs.com/package/dismatch"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View package
            </a>
          </div>
        </div>

        <div className="panel-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 text-xs text-muted-foreground">
            <span>Install</span>
            <span className="font-mono">npm i dismatch</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-[color:var(--color-code)]">
            <code>{`import { createUnion, match } from "dismatch";

const Result = createUnion("status", {
  ok: (data: string) => ({ data }),
  error: (message: string) => ({ message }),
});

const output = match(Result.ok("ready"), {
  ok: ({ data }) => data.toUpperCase(),
  error: ({ message }) => message,
});`}</code>
          </pre>
        </div>
      </section>

      <section className="grid gap-4 border-b border-border/70 py-12 sm:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="panel-surface gap-4 p-5">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              {feature.title}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 border-b border-border/70 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Why teams use it
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            Safer branching, cleaner callsites, fewer repeated tags.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            The library is small enough to stay out of your way, but opinionated
            enough to make impossible states harder to represent and easier to
            eliminate.
          </p>
        </div>

        <div className="grid gap-3">
          {apiHighlights.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/80 px-5 py-4 shadow-sm"
            >
              <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent-strong)]" />
              <p className="text-base leading-7 text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="install"
        className="grid gap-8 border-b border-border/70 py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      >
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Install
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            Ship it as a dependency, explore it in the browser.
          </h2>
        </div>
        <div className="grid gap-4">
          <div className="panel-surface p-5">
            <p className="text-sm font-medium text-foreground">Package manager</p>
            <pre className="mt-3 rounded-2xl border border-border/70 bg-background/80 p-4 font-mono text-sm text-[color:var(--color-code)]">
              <code>npm install dismatch</code>
            </pre>
          </div>
          <div className="panel-surface p-5">
            <p className="text-sm font-medium text-foreground">Start exploring</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Use the playground to test constructors, pattern matching, and
              exhaustiveness before you wire the library into your app code.
            </p>
            <Link
              href="/playground"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-4 w-fit",
              )}
            >
              Launch playground
            </Link>
          </div>
        </div>
      </section>

      <section id="api" className="py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            API shape
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            Small surface area, strong defaults.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="panel-surface p-5">
            <h3 className="font-heading text-lg font-semibold">Constructors</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Build tagged objects without hand-rolling repetitive factory
              functions and variant types.
            </p>
          </div>
          <div className="panel-surface p-5">
            <h3 className="font-heading text-lg font-semibold">Type guards</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Narrow branch inputs predictably when you need imperative control
              flow instead of a matcher.
            </p>
          </div>
          <div className="panel-surface p-5">
            <h3 className="font-heading text-lg font-semibold">Exhaustive match</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Keep return types aligned with the handled cases and let missing
              branches fail at compile time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
