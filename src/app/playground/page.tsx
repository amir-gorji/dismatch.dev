import type { Metadata } from "next";
import { Playground } from "./Playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Try dismatch live in the browser — with TypeScript autocomplete, type-checking, and console output.",
};

export default function PlaygroundPage() {
  return <Playground />;
}
