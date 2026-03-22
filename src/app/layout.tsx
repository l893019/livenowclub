import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

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
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
