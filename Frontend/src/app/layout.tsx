import type { Metadata } from "next";
import { AppProviders } from '@/shared/core/AppProviders';
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { ReactNode } from "react";

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
  title: { default: '🏥 Clínica NC', template: '%s | 🏥 Clínica NC' },
  description: 'Healthcare web application built with Next.js and Clean Architecture',
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
      'de-DE': 'https://example.com/de-DE'
    }
  },
  openGraph: {
    title: '🏥 Clínica NC',
    description: 'Healthcare web application built with Next.js and Clean Architecture',
    url: 'https://example.com',
    siteName: '🏥 Clínica NC',
    images: [{ url: 'https://i.imgur.com/0ZBPKyC.png' }]
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme-storage');
                  if (stored) {
                    const { state } = JSON.parse(stored);
                    if (state && state.theme) {
                      const theme = state.theme;
                      let resolved = theme;
                      
                      if (theme === 'system') {
                        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      }
                      
                      if (resolved === 'dark') {
                        document.documentElement.classList.add('dark');
                      }
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
