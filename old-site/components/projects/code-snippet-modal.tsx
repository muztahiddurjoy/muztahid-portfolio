"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, X, FileCode } from "lucide-react";
import type { CodeSnippet } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface CodeSnippetModalProps {
  snippet: CodeSnippet;
  onClose: () => void;
}

export function CodeSnippetModal({ snippet, onClose }: CodeSnippetModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".code-modal-overlay", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.from(".code-modal-content", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power3.out",
      });
    }, overlayRef);
    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={overlayRef}
      className="code-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="code-modal-content w-full max-w-3xl max-h-[80vh] overflow-hidden border-4 border-foreground bg-[#0a0a0a] text-[#e0e0e0] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b-4 border-foreground bg-foreground text-background">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-background" />
              <span className="w-3 h-3 bg-background/60" />
              <span className="w-3 h-3 bg-background/30" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em]">
              <FileCode size={12} />
              {snippet.filename}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`text-[10px] font-black uppercase tracking-[0.15em] cursor-pointer transition-colors flex items-center gap-1 ${
                copied ? "text-green-400" : "text-background/60 hover:text-background"
              }`}
            >
              {copied ? (
                <><Check size={14} /> Copied</>
              ) : (
                <><Copy size={14} /> Copy</>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-background/40 hover:text-background transition-colors cursor-pointer ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Code */}
        <div className="overflow-auto max-h-[65vh] p-5">
          <pre className="text-sm leading-relaxed font-mono">
            <code>{snippet.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

interface CodeSnippetBlockProps {
  snippet: CodeSnippet;
}

export default function CodeSnippetBlock({ snippet }: CodeSnippetBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".code-block", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div ref={ref}>
        <div className="code-block overflow-hidden border-4 border-foreground bg-[#0a0a0a] text-[#e0e0e0]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b-4 border-foreground bg-foreground text-background">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-background" />
                <span className="w-3 h-3 bg-background/60" />
                <span className="w-3 h-3 bg-background/30" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em]">
                {snippet.filename}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`text-[10px] font-black uppercase tracking-[0.15em] cursor-pointer transition-colors flex items-center gap-1 ${
                  copied ? "text-green-400" : "text-background/60 hover:text-background"
                }`}
              >
                {copied ? (
                  <><Check size={14} /> Copied</>
                ) : (
                  <><Copy size={14} /> Copy</>
                )}
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="text-[10px] font-black uppercase tracking-[0.15em] cursor-pointer text-background/60 hover:text-background"
              >
                Expand
              </button>
            </div>
          </div>

          {/* Code preview */}
          <div className="p-5 max-h-64 overflow-hidden relative">
            <pre className="text-sm leading-relaxed font-mono">
              <code>{snippet.code}</code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {showModal && (
        <CodeSnippetModal
          snippet={snippet}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}