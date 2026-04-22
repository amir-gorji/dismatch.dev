import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api.js";

// monaco-editor 0.55 typed `languages.typescript` as a deprecation stub, but the
// runtime (loaded from jsdelivr) still exposes the full API at that path.
type MonacoTs = typeof import("monaco-editor").typescript;
const tsApi = (m: typeof Monaco): MonacoTs =>
  (m.languages as unknown as { typescript: MonacoTs }).typescript;

export type LogLevel = "log" | "info" | "warn" | "error";
export type LogEntry = {
  id: number;
  level: LogLevel;
  parts: string[];
  time: number;
};

let logCounter = 0;
const nextId = () => ++logCounter;

function stringify(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  const t = typeof value;
  if (t === "string") return value as string;
  if (t === "number" || t === "boolean" || t === "bigint") return String(value);
  if (t === "function") {
    const fn = value as { name?: string };
    return `[Function: ${fn.name || "anonymous"}]`;
  }
  if (t === "symbol") return (value as symbol).toString();
  try {
    return JSON.stringify(
      value,
      (_k, v) => {
        if (typeof v === "bigint") return `${v}n`;
        if (typeof v === "function")
          return `[Function: ${v.name || "anonymous"}]`;
        if (typeof v === "symbol") return v.toString();
        return v;
      },
      2,
    );
  } catch {
    try {
      return String(value);
    } catch {
      return "[unserializable]";
    }
  }
}

type RunArgs = {
  model: Monaco.editor.ITextModel;
  monaco: typeof Monaco;
  version: string;
  onLog: (entry: LogEntry) => void;
  signal: AbortSignal;
};

export async function runCode({
  model,
  monaco,
  version,
  onLog,
  signal,
}: RunArgs): Promise<void> {
  const getWorker = await tsApi(monaco).getTypeScriptWorker();
  if (signal.aborted) return;
  const client = await getWorker(model.uri);
  if (signal.aborted) return;

  // Bail on syntactic errors — Monaco already shows them inline.
  const syntactic = await client.getSyntacticDiagnostics(model.uri.toString());
  if (signal.aborted) return;
  if (syntactic.length > 0) return;

  const emit = await client.getEmitOutput(model.uri.toString());
  if (signal.aborted) return;
  const file = emit.outputFiles.find((f) => f.name.endsWith(".js"));
  if (!file) return;

  // Rewrite bare "dismatch" imports to pinned esm.sh URL so the live library runs.
  const esmBase = `https://esm.sh/dismatch@${encodeURIComponent(version)}`;
  const js = file.text.replace(
    /(from\s+|import\s*\(\s*)(["'])dismatch(\/[^"']+)?\2/g,
    (_match, prefix, quote, sub) =>
      `${prefix}${quote}${esmBase}${sub ?? ""}${quote}`,
  );

  const originals = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
  const makePatched = (level: LogLevel) =>
    (...args: unknown[]) => {
      if (!signal.aborted) {
        onLog({
          id: nextId(),
          level,
          parts: args.map(stringify),
          time: Date.now(),
        });
      }
      originals[level](...args);
    };
  console.log = makePatched("log");
  console.info = makePatched("info");
  console.warn = makePatched("warn");
  console.error = makePatched("error");

  const blob = new Blob([js], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  try {
    // Indirect dynamic import: opaque to any bundler in the chain.
    const doImport = new Function("u", "return import(u)") as (
      u: string,
    ) => Promise<unknown>;
    await doImport(url);
  } catch (err) {
    if (!signal.aborted) {
      const msg =
        err instanceof Error
          ? (err.stack ?? `${err.name}: ${err.message}`)
          : String(err);
      onLog({ id: nextId(), level: "error", parts: [msg], time: Date.now() });
    }
  } finally {
    console.log = originals.log;
    console.info = originals.info;
    console.warn = originals.warn;
    console.error = originals.error;
    URL.revokeObjectURL(url);
  }
}
