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
  const baseUrl = `https://cdn.jsdelivr.net/npm/dismatch@${encodeURIComponent(
    version,
  )}/lib/`;
  const res = await fetch(`${baseUrl}index.d.ts`, { signal });
  if (!res.ok) {
    throw new Error(
      `Failed to load types for dismatch@${version} (${res.status})`,
    );
  }
  const raw = await res.text();

  // index.d.ts imports types from a hashed chunk file (e.g. types-XXXX.js).
  // Monaco can't follow that relative import inside a `declare module` block,
  // so ReservedUnionKeys / UnionSchema / UnionFactory all become `any`.
  // That makes ValidUnionSchema collapse to `never`, causing red squiggles on
  // every createUnion call. Fix: fetch the chunk and inline its declarations.
  let body = raw;
  const chunkMatch = raw.match(/^import \{[^}]+\} from '(\.\/[^']+\.js)';?$/m);
  if (chunkMatch) {
    const chunkFilename = chunkMatch[1].replace(/\.js$/, ".d.ts").replace(/^\.\//, "");
    const chunkRes = await fetch(`${baseUrl}${chunkFilename}`, { signal });
    if (chunkRes.ok) {
      const chunkRaw = await chunkRes.text();
      // Strip the minified re-export line (abbreviated names like "SampleUnion as S")
      const chunkTypes = chunkRaw.replace(/^export type \{[^}]+\};?\s*$/m, "");
      // Remove the chunk import from index.d.ts
      body = body.replace(/^import \{[^}]+\} from '\.\/[^']+\.js';?\n?/m, "");
      // Replace the chunk re-export of InferUnion with a direct export
      body = body.replace(
        /^export \{ I as InferUnion \} from '\.\/[^']+\.js';?\n?/m,
        "export type { InferUnion };\n",
      );
      body = `${chunkTypes}\n${body}`;
    }
  }

  // Wrap the bundled .d.ts in an ambient module so `import from "dismatch"` resolves.
  // Inside `declare module`, `export declare` is redundant and rejected by some TS versions.
  body = body.replace(/^export\s+declare\s+/gm, "export ");
  const declaration = `declare module "dismatch" {\n${body}\n}\n`;

  activeDisposable?.dispose();
  activeDisposable = tsApi(monaco).typescriptDefaults.addExtraLib(
    declaration,
    TYPES_PATH,
  );
}
