"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Coffee, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <section
        ref={sectionRef}
        className="relative py-24 overflow-hidden bg-primary text-primary-foreground"
      >
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

        {/* Decorative elements */}
        <div className="absolute top-12 right-16 w-48 h-48 border border-primary-foreground/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-16 left-12 w-32 h-32 border border-primary-foreground/10 rotate-45 hidden lg:block" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10">
            <div className="flex-1">
              <div className="meeting-reveal flex items-center gap-3 mb-6">
                <Coffee size={16} className="text-primary-foreground/50" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
                  Analog Sync
                </span>
              </div>

              <h2 className="meeting-reveal text-3xl md:text-4xl font-black tracking-tight mb-6">
                Systems are digital;
                <br />
                engineering is human.
              </h2>

              <p className="meeting-reveal text-primary-foreground/70 leading-relaxed max-w-xl">
                If you&apos;re local, I&apos;m always open to discussing system
                architecture, discrete math, or the mechanical purity of vintage
                machines like the W123 over coffee.
              </p>
            </div>

            <div className="meeting-reveal shrink-0">
              <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                className="rounded-none font-semibold uppercase tracking-widest text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-300"
              >
                <Calendar size={16} className="mr-2" />
                Request a Calendar Sync
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-md mx-4 rounded-xl border border-border bg-card p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Calendar size={20} className="text-muted-foreground" />
              <h3 className="text-xl font-black tracking-tight">
                Calendar Sync
              </h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              To schedule an in-person or virtual meeting, reach out via email
              with your preferred date, time, and agenda. I typically respond
              within 24 hours.
            </p>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                <span className="text-xs text-muted-foreground w-16">Email</span>
                <span>muztahid@example.com</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                <span className="text-xs text-muted-foreground w-16">Zone</span>
                <span>BST (GMT+6)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                <span className="text-xs text-muted-foreground w-16">Hours</span>
                <span>10:00 — 22:00</span>
              </div>
            </div>

            <a
              href="mailto:muztahid@example.com?subject=Calendar%20Sync%20Request"
              className="mt-6 flex items-center justify-center w-full h-11 rounded-none font-semibold uppercase tracking-widest text-xs bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
            >
              Open Email Client
            </a>
          </div>
        </div>
      )}
    </>
  );
}
