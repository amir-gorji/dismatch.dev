import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { TryInPlayground } from "@/components/docs/try-in-playground";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    TryInPlayground,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
