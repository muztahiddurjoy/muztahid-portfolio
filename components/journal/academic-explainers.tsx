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
    <div className="my-8 rounded-2xl border border-border bg-primary p-6 md:p-8">
      {label && (
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-secondary" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {label}
          </span>
        </div>
      )}
      <div className="font-mono text-sm md:text-base leading-relaxed text-primary-foreground/90 whitespace-pre-wrap">
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
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-border bg-muted overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-border/50 border-b border-border">
          <Code size={14} className="text-muted-foreground" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {standardLabel}
          </span>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-foreground leading-relaxed overflow-x-auto">
          <code>{standardCode}</code>
        </pre>
      </div>

      <div className="rounded-2xl border-2 border-secondary bg-primary overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/10 border-b border-secondary/20">
          <Code size={14} className="text-secondary" />
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            {customLabel}
          </span>
        </div>
        <pre className="p-4 text-xs md:text-sm font-mono text-primary-foreground/90 leading-relaxed overflow-x-auto">
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
    <div className="my-8 rounded-2xl border-2 border-secondary/40 bg-secondary/5 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-secondary-foreground" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary-foreground">
          TL;DR
        </span>
      </div>
      <div className="text-sm md:text-base text-foreground/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
