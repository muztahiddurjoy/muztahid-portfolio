"use client";

import { type ReactNode } from "react";
import { BookOpen, Lightbulb, Code } from "lucide-react";

/* ─── MathBlock ─── */
interface MathBlockProps {
  label?: string;
  children: ReactNode;
}

export function MathBlock({ label, children }: MathBlockProps) {
  return (
    <div className="my-8 border-4 border-foreground p-6 md:p-8">
      {label && (
        <div className="flex items-center gap-2 mb-4 border-b-4 border-foreground pb-3">
          <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center">
            <BookOpen size={12} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
            {label}
          </span>
        </div>
      )}
      <div className="font-mono text-sm md:text-base leading-relaxed text-foreground/80 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

/* ─── CodeCompare ─── */
interface CodeCompareProps {
  standardLabel?: string;
  standardCode: string;
  customLabel?: string;
  customCode: string;
  language?: string;
}

export function CodeCompare({
  standardLabel = "Standard Library",
  standardCode,
  customLabel = "Built from Scratch",
  customCode,
}: CodeCompareProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2">
      <div className="border-4 border-foreground overflow-hidden md:border-r-0">
        <div className="flex items-center gap-2 px-4 py-3 bg-foreground/5 border-b-4 border-foreground">
          <div className="w-5 h-5 bg-foreground text-background flex items-center justify-center">
            <Code size={10} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/60">
            {standardLabel}
          </span>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-foreground/80 leading-relaxed overflow-x-auto">
          <code>{standardCode}</code>
        </pre>
      </div>

      <div className="border-4 border-foreground overflow-hidden max-md:border-t-0">
        <div className="flex items-center gap-2 px-4 py-3 bg-accent/10 border-b-4 border-foreground">
          <div className="w-5 h-5 bg-accent text-foreground flex items-center justify-center">
            <Code size={10} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-accent">
            {customLabel}
          </span>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-foreground/80 leading-relaxed overflow-x-auto">
          <code>{customCode}</code>
        </pre>
      </div>
    </div>
  );
}

/* ─── TLDR Box ─── */
interface TLDRBoxProps {
  children: ReactNode;
}

export function TLDRBox({ children }: TLDRBoxProps) {
  return (
    <div className="my-8 border-4 border-accent p-6 md:p-8">
      <div className="flex items-center gap-2 mb-3 border-b-4 border-accent pb-3">
        <div className="w-6 h-6 bg-accent text-foreground flex items-center justify-center">
          <Lightbulb size={12} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
          TL;DR
        </span>
      </div>
      <div className="text-sm md:text-base text-foreground/70 leading-relaxed">
        {children}
      </div>
    </div>
  );
}