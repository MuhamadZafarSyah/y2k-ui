import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Suspense } from "react";
import { generateSiteMetadata } from "@/lib/seo-helpers";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { ProgressBar } from "@/components/progress-bar";
import "./globals.css";
import "./main.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Performance: speculation rules for instant same-origin navigation ── */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: { href_matches: "/*" },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
        {/* ── Performance: preconnect to external origins ── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <JsonLd />
        <Analytics />
        <RootProvider
          theme={{
            defaultTheme: "light",
            enableSystem: false,
            forcedTheme: "light",
          }}
          search={{
            links: [
              ["Home", "/"],
              ["Installation", "/docs/installation"],
              ["Button", "/docs/button"],
              ["Dialog", "/docs/dialog"],
              ["Components", "/docs"],
            ],
          }}
        >
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}