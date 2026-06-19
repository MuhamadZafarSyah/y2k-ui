import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Y2K UI",
    template: "%s — Y2K UI",
  },
  description:
    "Modern Y2K / kawaii-retro component library — flat windows, thick navy outlines, pastel fills.",
  icons: {
    icon: "/favicon.svg",
  },
};

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
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
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
          {children}
        </RootProvider>
      </body>
    </html>
  );
}