"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactJSON = `{
  "engineer": "Muztahid Rahman",
  "alias": "Muz",
  "location": "Dhaka, BD",
  "status": "Accepting new challenges",
  "protocols": ["Email", "LinkedIn", "GitHub"],
  "stack": {
    "frontend": ["Next.js", "React", "Tailwind CSS"],
    "backend": ["NestJS", "Node.js", "PostgreSQL"],
    "embedded": ["C/C++", "STM32", "ESP32", "ROS2"],
    "infra": ["Docker", "AWS", "Vercel"]
  },
  "availability": "Open"
}`;

export default function ContactJSONViewer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".json-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyJSON = () => {
    navigator.clipboard.writeText(contactJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Syntax-highlighted lines
  const highlightJSON = (json: string) => {
    return json.split("\n").map((line, i) => {
      const highlighted = line
        // Keys
        .replace(
          /"([^"]+)"(?=\s*:)/g,
          '<span class="text-blue-400">"$1"</span>'
        )
        // String values
        .replace(
          /:\s*"([^"]+)"/g,
          ': <span class="text-green-400">"$1"</span>'
        )
        // Array string values
        .replace(
          /(?<=[\[,]\s*)"([^"]+)"/g,
          '<span class="text-green-400">"$1"</span>'
        )
        // Brackets
        .replace(/([{}[\]])/g, '<span class="text-yellow-300">$1</span>');

      return (
        <div key={i} className="flex">
          <span className="inline-block w-8 text-right pr-4 select-none text-muted-foreground/40 text-xs">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="json-reveal flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-foreground/20" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Developer API
            </span>
          </div>

          <h2 className="json-reveal text-2xl md:text-3xl font-black tracking-tight mb-8">
            For the technically curious.
          </h2>

          {/* VS Code-style code block */}
          <div className="json-reveal rounded-xl border border-border bg-[#1e1e1e] overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-[#3c3c3c]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-[#858585] font-mono">
                  contact.json
                </span>
              </div>
              <button
                onClick={copyJSON}
                className="flex items-center gap-1.5 text-xs text-[#858585] hover:text-white transition-colors font-mono cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy JSON
                  </>
                )}
              </button>
            </div>

            {/* Code content */}
            <div className="p-5 font-mono text-xs md:text-sm leading-relaxed text-[#d4d4d4] overflow-x-auto">
              {highlightJSON(contactJSON)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
