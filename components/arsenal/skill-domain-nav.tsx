"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Globe, Cpu, BookOpen, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const domains = [
  { id: "web", label: "Full-Stack Web", icon: Globe },
  { id: "embedded", label: "Autonomy & Embedded", icon: Cpu },
  { id: "theory", label: "Core CS & Math", icon: BookOpen },
  { id: "prototyping", label: "Rapid Prototyping", icon: Wrench },
] as const;

type DomainId = (typeof domains)[number]["id"];

export default function SkillDomainNav() {
  const [active, setActive] = useState<DomainId | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".domain-btn", {
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: DomainId) => {
    setActive(id);
    const target = document.getElementById(`section-${id}`);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 1,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          {domains.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`domain-btn flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-200 border-2 ${
                active === id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground/70 border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
