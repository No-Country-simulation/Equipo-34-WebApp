'use client';

import { useState, useEffect } from 'react';

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      const docHeight = scrollHeight - clientHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrollProgress(scrollPercent);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    // Also listen on document for better compatibility
    document.addEventListener('scroll', updateScrollProgress, {
      passive: true,
    });

    // Initial calculation
    updateScrollProgress();

    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      document.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-zinc-800">
      <progress
        className="h-full bg-linear-to-r from-cyan-500 to-blue-500"
        value={scrollProgress * 100}
        max={100}
        style={{ transition: 'width 0.1s' }}
        aria-label="Page scroll progress"
      ></progress>
    </div>
  );
}
