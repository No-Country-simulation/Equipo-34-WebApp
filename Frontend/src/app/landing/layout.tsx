import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: '🏥 Clínica NC - Landing', template: '%s | 🏥 Clínica NC' },
  openGraph: {
    siteName: '🏥 Clínica NC Landing',
  },
};

export default function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
