"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".terminal-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-primary">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="terminal-reveal max-w-2xl mx-auto">
          {/* Terminal chrome */}
          <div className="rounded-t-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs font-mono text-primary-foreground/40">
              subscribe@system-logs ~ %
            </span>
          </div>

          {/* Terminal body */}
          <div className="rounded-b-xl border border-t-0 border-primary-foreground/10 bg-primary p-6 md:p-8">
            <div className="terminal-reveal mb-6">
              <h3 className="text-2xl md:text-3xl font-black text-primary-foreground tracking-tight mb-2">
                Subscribe to System Logs.
              </h3>
              <p className="text-sm text-primary-foreground/50 font-mono">
                // Receive new research entries directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="terminal-reveal space-y-4">
              <div className="flex items-center gap-2 border-2 border-primary-foreground/15 rounded-lg px-4 py-3 transition-colors duration-200 focus-within:border-secondary focus-within:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]">
                <span className="text-secondary font-mono text-sm flex-shrink-0">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter_email_address_"
                  className="flex-1 bg-transparent text-primary-foreground font-mono text-sm placeholder:text-primary-foreground/30 outline-none caret-secondary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground font-bold text-sm tracking-wide py-3 px-6 transition-colors duration-300 hover:bg-secondary/80"
              >
                Execute Subscription
              </button>
            </form>

            {status === "success" && (
              <div className="terminal-reveal mt-4 font-mono text-xs text-green-400">
                <span className="text-secondary">&gt;</span> subscription.status
                = &quot;active&quot; ✓
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
