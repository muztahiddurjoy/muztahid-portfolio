"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Coffee, X, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PhysicalMeetingCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".meeting-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
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

  return (
    <>
      <section ref={sectionRef} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10">
            <div className="flex-1">
              <div className="meeting-reveal flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-background text-foreground">
                  <Coffee size={20} />
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-background/50">
                  Analog Sync
                </span>
              </div>

              <span className="meeting-reveal font-script text-2xl text-primary -rotate-2 inline-block mb-2">
                In person.
              </span>

              <h2 className="meeting-reveal text-3xl md:text-4xl font-black uppercase tracking-tighter text-background leading-[0.9] mb-6">
                Systems are digital;<br />
                <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block mt-2">
                  Engineering is human
                </span>
              </h2>

              <p className="meeting-reveal text-sm text-background/50 leading-relaxed max-w-xl border-l-8 border-accent pl-6">
                If you&apos;re local, I&apos;m always open to discussing system
                architecture, discrete math, or the mechanical purity of vintage
                machines like the W123 over coffee.
              </p>
            </div>

            <div className="meeting-reveal shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-6 py-4 border-4 border-background bg-background text-foreground font-black uppercase tracking-[0.15em] text-sm hover:bg-transparent hover:text-background transition-colors duration-200"
              >
                <Calendar size={16} />
                Calendar Sync
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md mx-4 border-4 border-foreground bg-background p-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-foreground">
              <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Calendar Sync</h3>
            </div>

            <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
              To schedule an in-person or virtual meeting, reach out via email
              with your preferred date, time, and agenda. I typically respond
              within 24 hours.
            </p>

            <div className="space-y-0 border-4 border-foreground">
              {[
                { label: "Email", value: "muztahid@example.com" },
                { label: "Zone", value: "BST (GMT+6)" },
                { label: "Hours", value: "10:00 — 22:00" },
              ].map((item, idx) => (
                <div key={item.label} className={`flex items-center gap-3 p-3 font-mono text-sm ${idx > 0 ? "border-t-2 border-foreground/20" : ""}`}>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/40 w-16">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>

            <a
              href="mailto:muztahid@example.com?subject=Calendar%20Sync%20Request"
              className="mt-6 flex items-center justify-center gap-2 w-full h-12 border-4 border-foreground bg-foreground text-background font-black uppercase tracking-[0.15em] text-xs hover:bg-background hover:text-foreground transition-colors duration-200"
            >
              Open Email Client
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}