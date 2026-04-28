import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ExitIntentCard from "@/components/ExitIntentCard";

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
  openGraph: {
    title: "The Live Now Club | Louise Ireland",
    description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy and whimsy despite it all.",
    url: "https://livenowclub.vercel.app",
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
        <Script
          defer
          data-domain="livenowclub.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
        <ExitIntentCard />
      </body>
    </html>
  );
}
