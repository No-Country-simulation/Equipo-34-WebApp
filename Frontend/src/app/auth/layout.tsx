import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: '🏥 Clínica NC - Auth', template: '%s | 🏥 Clínica NC' },
};

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
