import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { BrandLockup } from "@/components/brand-mark";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandLockup size={28} />,
      url: "/",
    },
    githubUrl: "https://github.com/amir-gorji/dismatch",
    links: [
      {
        text: "Playground",
        url: "/playground/",
      },
    ],
  };
}
