'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function EnhancedScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);

      // Show indicator only after scrolling a bit
      setIsVisible(scrollTop > 100);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    // Initial calculation
    updateScrollProgress();

    // Clean up event listener
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Format the percentage for display
  const progressPercentage = Math.min(Math.round(scrollProgress * 100), 100);

  return (
    <div
      className={`fixed right-3 bottom-16 z-50 transition-all duration-300 sm:right-6 sm:bottom-20 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-10 opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Circular progress indicator */}
        <div
          className="relative h-10 w-10 cursor-pointer rounded-full bg-zinc-800/80 backdrop-blur-sm transition-colors hover:bg-zinc-700/80 sm:h-12 sm:w-12"
          onClick={scrollToTop}
          role="button"
          aria-label="Scroll to top"
        >
          {/* Progress circle */}
          <svg className="absolute top-0 left-0 h-10 w-10 -rotate-90 sm:h-12 sm:w-12">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#27272a"
              strokeWidth="2"
              className="sm:hidden"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#27272a"
              strokeWidth="2"
              className="hidden sm:block"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - scrollProgress)}`}
              strokeLinecap="round"
              className="sm:hidden"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress)}`}
              strokeLinecap="round"
              className="hidden sm:block"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex animate-bounce animate-pulse items-center justify-center">
            <ChevronUp className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Percentage label */}
        <div className="mt-1 rounded-md bg-zinc-800/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm sm:mt-2">
          {progressPercentage}%
        </div>
      </div>
    </div>
  );
}
