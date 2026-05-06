import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ThemeProvider } from "@/components/theme-provider";

const SITE_URL = "https://dismatch.dev";
const DESCRIPTION =
  "dismatch is a 2.4 kB TypeScript library for discriminated unions: constructors, type guards, exhaustive matching, partial transforms, and collection ops — all from a single schema.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "dismatch — discriminated unions, without the boilerplate",
    template: "%s · dismatch",
  },
  description: DESCRIPTION,
  applicationName: "dismatch",
  keywords: [
    "typescript",
    "discriminated unions",
    "pattern matching",
    "type-safe",
    "exhaustive matching",
    "createUnion",
    "ts-pattern alternative",
    "fp-ts alternative",
    "neverthrow alternative",
    "RemoteData",
  ],
  authors: [{ name: "Amir Gorji" }],
  creator: "Amir Gorji",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "dismatch",
    title: "dismatch — discriminated unions, without the boilerplate",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "dismatch — discriminated unions, without the boilerplate",
    description: DESCRIPTION,
    creator: "@amirgorji",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
