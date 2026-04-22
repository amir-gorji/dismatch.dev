"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Editor, { type Monaco, type OnMount } from "@monaco-editor/react";
import type * as MonacoType from "monaco-editor/esm/vs/editor/editor.api.js";

type MonacoTsNs = typeof import("monaco-editor").typescript;
import { useTheme } from "next-themes";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ThemeToggle } from "@/components/theme-toggle";
import { Console } from "./Console";
import { VersionSwitcher } from "./VersionSwitcher";
import { loadDismatchTypes } from "./dismatch-types";
import { runCode, type LogEntry } from "./runner";
import { STARTER_CODE } from "./starter";
import { useDebounced } from "./use-debounced";
import { fetchVersions } from "./versions";

const FILE_PATH = "file:///playground.ts";

export function Playground() {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useState(STARTER_CODE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [version, setVersion] = useState<string>("");
  const [versionsLoading, setVersionsLoading] = useState(true);
  const [typesReady, setTypesReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  const monacoRef = useRef<Monaco | null>(null);
  const modelRef = useRef<MonacoType.editor.ITextModel | null>(null);
  const runAbortRef = useRef<AbortController | null>(null);

  // Fetch published versions from jsdelivr.
  useEffect(() => {
    const ctrl = new AbortController();
    fetchVersions(ctrl.signal)
      .then(({ latest, all }) => {
        setVersions(all);
        setVersion(latest);
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === "AbortError") return;
        // Fallback: let user at least pick "latest".
        setVersions(["latest"]);
        setVersion("latest");
      })
      .finally(() => setVersionsLoading(false));
    return () => ctrl.abort();
  }, []);

  const handleBeforeMount = useCallback((monaco: Monaco) => {
    // monaco-editor 0.55 typed `languages.typescript` as a deprecation stub, but the
    // runtime still exposes the full API at that path.
    const ts = (monaco.languages as unknown as { typescript: MonacoTsNs })
      .typescript;
    ts.typescriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      isolatedModules: true,
      allowNonTsExtensions: true,
    });
    ts.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    monacoRef.current = monaco;
  }, []);

  const handleMount: OnMount = useCallback((editor) => {
    modelRef.current = editor.getModel();
    setEditorReady(true);
  }, []);

  // Load dismatch types whenever the version changes.
  useEffect(() => {
    const monaco = monacoRef.current;
    if (!monaco || !version || version === "latest" && versionsLoading) return;
    const ctrl = new AbortController();
    setTypesReady(false);
    loadDismatchTypes({ monaco, version, signal: ctrl.signal })
      .then(() => setTypesReady(true))
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name !== "AbortError") {
          setTypesReady(true); // allow running even if types fail
        }
      });
    return () => ctrl.abort();
  }, [version, editorReady, versionsLoading]);

  const debouncedCode = useDebounced(code, 400);

  // Auto-run whenever inputs stabilize.
  useEffect(() => {
    if (!editorReady || !typesReady || !version) return;
    const monaco = monacoRef.current;
    const model = modelRef.current;
    if (!monaco || !model) return;

    runAbortRef.current?.abort();
    const ctrl = new AbortController();
    runAbortRef.current = ctrl;

    setLogs([]);
    setRunning(true);
    runCode({
      model,
      monaco,
      version,
      signal: ctrl.signal,
      onLog: (entry) =>
        setLogs((prev) => (ctrl.signal.aborted ? prev : [...prev, entry])),
    }).finally(() => {
      if (!ctrl.signal.aborted) setRunning(false);
    });

    return () => ctrl.abort();
  }, [debouncedCode, version, editorReady, typesReady]);

  const editorTheme = resolvedTheme === "dark" ? "vs-dark" : "vs";

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex min-h-16 shrink-0 flex-col gap-4 border-b border-border/70 bg-card/70 px-4 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-baseline gap-3">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            dismatch
          </Link>
          <span className="truncate text-xs text-muted-foreground">
            / playground
          </span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <VersionSwitcher
            versions={versions}
            value={version}
            onChange={setVersion}
            loading={versionsLoading}
          />
          <ThemeToggle />
        </div>
      </header>

      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel defaultSize={60} minSize={30}>
          <Editor
            defaultLanguage="typescript"
            path={FILE_PATH}
            value={code}
            onChange={(v) => setCode(v ?? "")}
            theme={editorTheme}
            beforeMount={handleBeforeMount}
            onMount={handleMount}
            loading={
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading editor…
              </div>
            }
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily:
                "var(--font-mono-stack), ui-monospace, SFMono-Regular, Menlo, monospace",
              tabSize: 2,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              renderLineHighlight: "line",
              padding: { top: 12, bottom: 12 },
              smoothScrolling: true,
              cursorSmoothCaretAnimation: "on",
              guides: { indentation: false },
            }}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40} minSize={20}>
          <Console entries={logs} running={running} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
