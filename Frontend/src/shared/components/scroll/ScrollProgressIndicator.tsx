"use client"

import { useState, useEffect } from "react"

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight
      
      const docHeight = scrollHeight - clientHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
      
      setScrollProgress(scrollPercent)
    }

    // Add scroll event listener
    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    // Also listen on document for better compatibility
    document.addEventListener("scroll", updateScrollProgress, { passive: true })

    // Initial calculation
    updateScrollProgress()

    // Clean up event listeners
    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      document.removeEventListener("scroll", updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
        style={{ width: `${scrollProgress * 100}%`, transition: "width 0.1s" }}
        role="progressbar"
        aria-valuenow={scrollProgress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      ></div>
    </div>
  )
}
