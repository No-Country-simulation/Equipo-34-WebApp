"use client";

import { FC, RefObject, useEffect, useRef, useState } from "react";

type Section = {
  id: string;
  ref?: RefObject<HTMLElement>;
};

interface NavIndicatorProps {
  readonly sections: Section[];
  readonly onSectionChange?: (activeSection: string) => void;
};

function handleIntersectFactory(
  setActiveSection: React.Dispatch<React.SetStateAction<string>>,
  onSectionChange?: (activeSection: string) => void
) {
  return (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
        onSectionChange?.(entry.target.id);
      }
    }
  };
}

function useActiveSection(
  sections: Section[],
  onSectionChange?: (activeSection: string) => void
): string {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = handleIntersectFactory(setActiveSection, onSectionChange);

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
      rootMargin: "0px 0px -20% 0px",
    });

    for (const { id, ref } of sections) {
      const element = ref?.current || document.getElementById(id);
      if (element) observer.current?.observe(element);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [sections, onSectionChange]);

  return activeSection;
}

function useSectionScroll(sections: Section[]) {
  return (id: string) => {
    const section = sections.find((s) => s.id === id);
    const element = section?.ref?.current || document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };
}

const NavIndicator: FC<NavIndicatorProps> = ({ sections, onSectionChange }: NavIndicatorProps) => {
  const activeSection = useActiveSection(sections, onSectionChange);
  const handleClick = useSectionScroll(sections);

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-4">
        {sections.map(({ id }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`w-2 h-8 rounded-full border border-indigo-400 transition-all duration-500 ${
              activeSection === id
                ? "bg-indigo-600"
                : "bg-indigo-200 hover:bg-indigo-400"
            }`}
            aria-label={`Navigate to ${id}`}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavIndicator;
