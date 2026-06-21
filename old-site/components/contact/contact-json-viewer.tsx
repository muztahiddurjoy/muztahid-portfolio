"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Copy, Check } from "lucide-react";

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

  const highlightJSON = (json: string) => {
    return json.split("\n").map((line, i) => {
      const highlighted = line
        .replace(/"([^"]+)"(?=\s*:)/g, '<span class="text-blue-400">"$1"</span>')
        .replace(/:\s*"([^"]+)"/g, ': <span class="text-green-400">"$1"</span>')
        .replace(/(?<=[\[,]\s*)"([^"]+)"/g, '<span class="text-green-400">"$1"</span>')
        .replace(/([{}[\]])/g, '<span class="text-yellow-300">$1</span>');

      return (
        <div key={i} className="flex">
          <span className="inline-block w-8 text-right pr-4 select-none text-background/20 text-xs">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="json-reveal flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
              <Code size={20} />
            </div>
            <div>
              <span className="font-script text-xl text-primary -rotate-2 inline-block">Structured.</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                Developer API
              </h2>
            </div>
          </div>

          <p className="json-reveal text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 mb-12">
            For the technically curious.
          </p>

          {/* Code block */}
          <div className="json-reveal border-4 border-foreground bg-[#0a0a0a] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b-4 border-foreground/20 bg-[#111]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-foreground/20" />
                <span className="text-xs text-[#666] font-mono uppercase tracking-[0.1em]">
                  contact.json
                </span>
              </div>
              <button
                onClick={copyJSON}
                className="flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors font-mono cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
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