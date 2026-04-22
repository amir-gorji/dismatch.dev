import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api.js";

// monaco-editor 0.55 typed `languages.typescript` as a deprecation stub, but the
// runtime still exposes the full API at that path.
type MonacoTs = typeof import("monaco-editor").typescript;
const tsApi = (m: typeof Monaco): MonacoTs =>
  (m.languages as unknown as { typescript: MonacoTs }).typescript;

const TYPES_PATH = "file:///node_modules/@dismatch-playground/types.d.ts";
let activeDisposable: Monaco.IDisposable | null = null;

export async function loadDismatchTypes({
  monaco,
  version,
  signal,
}: {
  monaco: typeof Monaco;
  version: string;
  signal?: AbortSignal;
}): Promise<void> {
  const url = `https://cdn.jsdelivr.net/npm/dismatch@${encodeURIComponent(
    version,
  )}/lib/index.d.ts`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(
      `Failed to load types for dismatch@${version} (${res.status})`,
    );
  }
  const raw = await res.text();

  // Wrap the bundled .d.ts in an ambient module so `import from "dismatch"` resolves.
  // Inside `declare module`, `export declare` is redundant and rejected by some TS versions.
  const body = raw.replace(/^export\s+declare\s+/gm, "export ");
  const declaration = `declare module "dismatch" {\n${body}\n}\n`;

  activeDisposable?.dispose();
  activeDisposable = tsApi(monaco).typescriptDefaults.addExtraLib(
    declaration,
    TYPES_PATH,
  );
}
