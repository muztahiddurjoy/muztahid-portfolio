"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    // Simulate send
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
    <section ref={sectionRef} className="py-20 bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Intro */}
          <div className="form-reveal">
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={16} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Routing Protocol
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              Transmit a
              <br />
              Secure Packet.
            </h2>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              All messages are routed through a structured intake pipeline.
              Select your communication vector below to ensure proper routing
              and prioritization.
            </p>

            {/* Terminal-style status */}
            <div className="mt-10 rounded-lg border border-border bg-background p-4 font-mono text-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-muted-foreground">
                  routing_protocol.sh
                </span>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <span className="text-green-600">$</span> initializing secure
                  channel...
                </p>
                <p>
                  <span className="text-green-600">$</span> encryption: TLS 1.3
                </p>
                <p>
                  <span className="text-green-600">$</span> routing table:
                  loaded
                </p>
                <p>
                  <span className="text-green-600">$</span> status:{" "}
                  <span className="text-green-500">ready for intake</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-reveal space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Identifier
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="h-12 rounded-none border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-secondary focus:ring-secondary/30 transition-colors"
              />
            </div>

            <div className="form-reveal space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Return Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="h-12 rounded-none border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-secondary focus:ring-secondary/30 transition-colors"
              />
            </div>

            <div className="form-reveal space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Communication Vector
              </label>
              <Select value={intent} onValueChange={setIntent} required>
                <SelectTrigger className="w-full h-12 rounded-none border-border bg-background text-foreground focus:border-secondary focus:ring-secondary/30 transition-colors">
                  <SelectValue placeholder="Select Vector" />
                </SelectTrigger>
                <SelectContent>
                  {intents.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-reveal space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Payload
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, project scope, or collaboration intent..."
                required
                rows={6}
                className="rounded-none border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-secondary focus:ring-secondary/30 resize-none transition-colors"
              />
            </div>

            <div className="form-reveal pt-2">
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-12 rounded-none font-semibold uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
              >
                {status === "sending" ? (
                  "Transmitting..."
                ) : (
                  <>
                    <Send size={14} className="mr-2" />
                    Transmit Message
                  </>
                )}
              </Button>
            </div>

            {/* Success state */}
            {status === "sent" && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 font-mono text-xs text-green-600 animate-in fade-in duration-300">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Payload Delivered — Message routed successfully. Expect response
                within 24h.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
