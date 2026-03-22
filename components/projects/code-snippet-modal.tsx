"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, X, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CodeSnippet } from "@/lib/keystatic-types";

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
      className="code-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="code-modal-content w-full max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden border border-border bg-primary text-primary-foreground shadow-2xl">
        {/* IDE-style title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-foreground/60 font-mono">
              <FileCode size={12} />
              {snippet.filename}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={`text-xs cursor-pointer text-primary-foreground/60 hover:text-primary-foreground transition-colors ${
                copied ? "text-green-400" : ""
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1" />
                  Copy
                </>
              )}
            </Button>
            <button
              onClick={onClose}
              className="text-primary-foreground/40 hover:text-primary-foreground transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Code content */}
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
        <div className="code-block rounded-2xl overflow-hidden border border-border bg-primary text-primary-foreground">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-primary-foreground/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-primary-foreground/60 font-mono">
                {snippet.filename}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={`text-xs cursor-pointer text-primary-foreground/60 hover:text-primary-foreground transition-colors ${
                  copied ? "text-green-400" : ""
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(true)}
                className="text-xs cursor-pointer text-primary-foreground/60 hover:text-primary-foreground"
              >
                Expand
              </Button>
            </div>
          </div>

          {/* Code preview (truncated) */}
          <div className="p-5 max-h-64 overflow-hidden relative">
            <pre className="text-sm leading-relaxed font-mono">
              <code>{snippet.code}</code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
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
