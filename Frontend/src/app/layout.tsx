import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'Clinica NC', template: '%s | Clinica NC' },
  description: 'Healthcare web application built with Next.js and Clean Architecture',
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en-US',
      'de-DE': 'https://example.com/de-DE'
    }
  },
  openGraph: {
    title: 'Clinica NC',
    description: 'Healthcare web application built with Next.js and Clean Architecture',
    url: 'https://example.com',
    siteName: 'Clinica NC site',
    images: [{ url: 'https://i.imgur.com/ID5uwIJ.png' }]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
