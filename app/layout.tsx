import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Nav } from "@/components/layout/Nav";
import { baseUrl, defaultOgImage, siteName } from "@/lib/metadata";
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
  metadataBase: new URL(baseUrl),
  title: {
    default: "Christy Sebastini — Marketer & Creative Professional",
    template: "%s | Christy Sebastini",
  },
  description:
    "Professional portfolio for Christy Sebastini — marketer and creative professional.",
  openGraph: {
    title: "Christy Sebastini — Marketer & Creative Professional",
    description:
      "Professional portfolio for Christy Sebastini — marketer and creative professional.",
    url: baseUrl,
    type: "website",
    siteName,
    images: [{ url: defaultOgImage, alt: "Christy Sebastini — Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christy Sebastini — Marketer & Creative Professional",
    description:
      "Professional portfolio for Christy Sebastini — marketer and creative professional.",
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <a
          href="#main-content"
          className="fixed inset-x-0 top-0 z-[100] -translate-y-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground opacity-0 transition-[transform,opacity] duration-200 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          Skip to main content
        </a>
        <Nav />
        <main
          id="main-content"
          className="relative min-h-[calc(100vh-3.5rem)] w-full max-w-[100vw] overflow-x-hidden"
          tabIndex={-1}
        >
          <div
            className="h-1 w-full shrink-0"
            style={{ background: "var(--accent-gradient)" }}
            aria-hidden
          />
          {children}
        </main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
