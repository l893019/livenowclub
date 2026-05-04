import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ExitIntentCard from "@/components/ExitIntentCard";
import Analytics from "@/components/Analytics";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "The Live Now Club | Louise Ireland",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy and whimsy despite it all.",
  keywords: ["essays", "cancer", "memoir", "poetry", "life", "mortality", "Louise Ireland"],
  authors: [{ name: "Louise Ireland" }],
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "886x886", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "The Live Now Club | Louise Ireland",
    description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy and whimsy despite it all.",
    url: "https://livenowclub.com",
    siteName: "The Live Now Club",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Live Now Club | Louise Ireland",
    description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy and whimsy despite it all.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Analytics />
        {children}
        <ExitIntentCard />
      </body>
    </html>
  );
}
