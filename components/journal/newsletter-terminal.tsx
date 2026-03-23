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
    <section ref={sectionRef} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="terminal-reveal max-w-2xl mx-auto">
          {/* Terminal chrome */}
          <div className="border-4 border-background border-b-0 px-4 py-3 flex items-center gap-3">
            <span className="h-3 w-3 bg-background" />
            <span className="h-3 w-3 bg-background/60" />
            <span className="h-3 w-3 bg-background/30" />
            <span className="ml-3 text-[10px] font-mono text-background/40 uppercase tracking-[0.15em]">
              subscribe@system-logs ~ %
            </span>
          </div>

          {/* Terminal body */}
          <div className="border-4 border-background p-6 md:p-8">
            <div className="terminal-reveal mb-6">
              <span className="font-script text-accent text-lg mb-2 block">subscribe</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-background mb-2">
                SUBSCRIBE TO SYSTEM LOGS
              </h3>
              <p className="text-xs text-background/40 font-mono uppercase tracking-[0.15em]">
                // Receive new research entries directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="terminal-reveal space-y-4">
              <div className="flex items-center gap-2 border-4 border-background px-4 py-3">
                <span className="text-accent font-mono text-sm flex-shrink-0">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter_email_address_"
                  className="flex-1 bg-transparent text-background font-mono text-sm placeholder:text-background/30 outline-none caret-accent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-background text-foreground font-black text-xs uppercase tracking-[0.15em] py-3 px-6 transition-colors duration-300 hover:bg-accent hover:text-foreground border-4 border-background"
              >
                Execute Subscription
              </button>
            </form>

            {status === "success" && (
              <div className="terminal-reveal mt-4 font-mono text-xs text-accent">
                <span className="text-accent">&gt;</span> subscription.status
                = &quot;active&quot; ✓
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}