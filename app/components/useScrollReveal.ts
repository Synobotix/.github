"use client";

import { useEffect } from "react";

export function useScrollReveal(containerSelector: string, excludeSelector = ".syn-hero") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const blocks = Array.from(container.querySelectorAll<HTMLElement>(`:scope > :not(${excludeSelector})`));
    blocks.forEach((block) => block.classList.add("syn-reveal"));

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("syn-reveal--visible");
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12 }
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [containerSelector, excludeSelector]);
}
