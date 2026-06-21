"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const intents = [
  "Enterprise Web Architecture (Next.js/NestJS)",
  "Autonomous Systems & Robotics",
  "Embedded Hardware (C/C++)",
  "General Inquiry / Networking",
];

export default function SecureMessageMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-reveal", {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !intent || !message) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setName("");
      setEmail("");
      setIntent("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Intro */}
          <div className="form-reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-background text-foreground">
                <Terminal size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-background/50">
                Routing Protocol
              </span>
            </div>

            <span className="font-script text-2xl text-primary -rotate-2 inline-block mb-2">
              Reach out.
            </span>

            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-background leading-[0.9] mb-6">
              Transmit a<br />
              <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block mt-2">
                Secure Packet
              </span>
            </h2>

            <p className="text-sm text-background/50 leading-relaxed max-w-md border-l-8 border-accent pl-6">
              All messages are routed through a structured intake pipeline.
              Select your communication vector below to ensure proper routing
              and prioritization.
            </p>

            {/* Terminal status */}
            <div className="mt-10 border-4 border-background p-4 font-mono text-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-background/20">
                <span className="w-2 h-2 bg-accent" />
                <span className="text-background/60">routing_protocol.sh</span>
              </div>
              <div className="space-y-1 text-background/50">
                <p><span className="text-accent">$</span> initializing secure channel...</p>
                <p><span className="text-accent">$</span> encryption: TLS 1.3</p>
                <p><span className="text-accent">$</span> routing table: loaded</p>
                <p><span className="text-accent">$</span> status: <span className="text-background">ready for intake</span></p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-reveal space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-background/50">
                Identifier
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full h-12 px-4 border-4 border-background bg-transparent text-background placeholder:text-background/30 font-mono text-sm focus:outline-none focus:bg-background/5 transition-colors"
              />
            </div>

            <div className="form-reveal space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-background/50">
                Return Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full h-12 px-4 border-4 border-background bg-transparent text-background placeholder:text-background/30 font-mono text-sm focus:outline-none focus:bg-background/5 transition-colors"
              />
            </div>

            <div className="form-reveal space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-background/50">
                Communication Vector
              </label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                required
                className="w-full h-12 px-4 border-4 border-background bg-transparent text-background font-mono text-sm focus:outline-none focus:bg-background/5 transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-foreground text-background">Select Vector</option>
                {intents.map((v) => (
                  <option key={v} value={v} className="bg-foreground text-background">{v}</option>
                ))}
              </select>
            </div>

            <div className="form-reveal space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-background/50">
                Payload
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, project scope, or collaboration intent..."
                required
                rows={6}
                className="w-full px-4 py-3 border-4 border-background bg-transparent text-background placeholder:text-background/30 font-mono text-sm focus:outline-none focus:bg-background/5 resize-none transition-colors"
              />
            </div>

            <div className="form-reveal pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-12 border-4 border-background bg-background text-foreground font-black uppercase tracking-[0.15em] text-sm hover:bg-transparent hover:text-background transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "sending" ? (
                  "Transmitting..."
                ) : (
                  <>
                    <Send size={14} />
                    Transmit Message
                  </>
                )}
              </button>
            </div>

            {status === "sent" && (
              <div className="border-4 border-background p-4 font-mono text-xs text-background animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent" />
                  Payload Delivered — Message routed successfully. Expect response within 24h.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}