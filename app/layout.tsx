import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Professional body font + ceremonial headline font (matches your page.tsx vibe)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://avirage.com"), // change to your real domain later
  title: {
    default: "Avirage — Cultural Lens Archive",
    template: "%s — Avirage",
  },
  description:
    "Avirage maps your archetypal cultural lens using multi-framework triangulation to reveal the traditions you naturally resonate with.",
  applicationName: "Avirage",
  category: "Lifestyle",
  keywords: [
    "Avirage",
    "personality",
    "archetypes",
    "cultural lens",
    "framework triangulation",
    "MBTI",
    "Big Five",
    "Enneagram",
  ],
  openGraph: {
    title: "Avirage — Cultural Lens Archive",
    description:
      "Discover your archetypal cultural lens through multi-framework triangulation.",
    type: "website",
    siteName: "Avirage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avirage — Cultural Lens Archive",
    description:
      "Discover your archetypal cultural lens through multi-framework triangulation.",
  },
  // Add icons once you have them in /public
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
