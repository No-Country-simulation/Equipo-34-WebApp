import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: '🏥 Clínica NC - Landing', template: '%s | 🏥 Clínica NC' },
  openGraph: {
    title: '🏥 Clínica NC - Landing',
    description: 'Healthcare web application built with Next.js and Clean Architecture',
    siteName: '🏥 Clínica NC Landing',
    url: 'https://example.com',
    images: [{ url: 'https://i.imgur.com/0ZBPKyC.png' }]
  },
};

export default function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
