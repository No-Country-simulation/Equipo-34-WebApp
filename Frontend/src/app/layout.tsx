import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import { EnhancedScrollIndicator } from '@/shared/components/scroll/EnhancedScrollIndicator';
import { ThemeScript } from '@/shared/components/ThemeScript';
import { AppProviders } from '@/shared/core/AppProviders';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: '🏥 Clínica NC', template: '%s | 🏥 Clínica NC' },
  description:
    'Healthcare web application built with Next.js and Clean Architecture',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏥</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en-US',
      'de-DE': 'https://example.com/de-DE',
    },
  },
  openGraph: {
    title: '🏥 Clínica NC',
    description:
      'Healthcare web application built with Next.js and Clean Architecture',
    url: 'https://example.com',
    siteName: '🏥 Clínica NC',
    images: [{ url: 'https://i.imgur.com/0ZBPKyC.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-gray-900 antialiased transition-colors duration-300 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
          <EnhancedScrollIndicator />
        </AppProviders>
      </body>
    </html>
  );
}
