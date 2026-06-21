"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import LogHero from "@/components/journal/log-hero";
import LogFilterNav from "@/components/journal/log-filter-nav";
import FeaturedLogCard from "@/components/journal/featured-log-card";
import ChronologicalFeed from "@/components/journal/chronological-feed";
import ExplainerShowcase from "@/components/journal/explainer-showcase";
import ScrollTelemetry from "@/components/journal/scroll-telemetry";
import NewsletterTerminal from "@/components/journal/newsletter-terminal";
import Footer from "@/components/home/footer";
import type { JournalEntry, LogCategory } from "@/lib/types";

interface JournalPageClientProps {
  entries: JournalEntry[];
}

export default function JournalPageClient({ entries }: JournalPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<LogCategory>("all");
  const feedRef = useRef<HTMLDivElement>(null);

  const featured = entries.find((e) => e.featured);

  const filtered =
    activeCategory === "all"
      ? entries.filter((e) => !e.featured)
      : entries.filter((e) => e.category === activeCategory);

  const handleCategoryChange = useCallback(
    (cat: LogCategory) => {
      if (cat === activeCategory) return;

      // Cross-fade the feed
      if (feedRef.current) {
        gsap.to(feedRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setActiveCategory(cat);
            gsap.to(feedRef.current, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      } else {
        setActiveCategory(cat);
      }
    },
    [activeCategory],
  );

  return (
    <>
      <ScrollTelemetry />
      <LogHero />
      <LogFilterNav active={activeCategory} onChange={handleCategoryChange} />
      {featured && activeCategory === "all" && (
        <FeaturedLogCard entry={featured} />
      )}
      <div ref={feedRef}>
        <ChronologicalFeed entries={filtered} />
      </div>
      <ExplainerShowcase />
      <NewsletterTerminal />
      <Footer />
    </>
  );
}
