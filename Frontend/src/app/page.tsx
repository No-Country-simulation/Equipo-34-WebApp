'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la landing page
    router.replace('/landing');
  }, [router]);

  return null;
}
