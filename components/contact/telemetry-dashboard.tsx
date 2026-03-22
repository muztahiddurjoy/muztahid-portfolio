"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const bst = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Dhaka",
      }).format(now);
      setTime(bst);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return <span className="font-mono text-4xl">--:--:--</span>;

  return (
    <span className="font-mono text-4xl md:text-5xl tabular-nums tracking-tight">
      {time}
    </span>
  );
}

function RadarPing() {
  return (
    <div className="relative w-full aspect-square max-w-45">
      {/* Radar rings */}
      <div className="absolute inset-0 rounded-full border border-primary-foreground/10" />
      <div className="absolute inset-[15%] rounded-full border border-primary-foreground/10" />
      <div className="absolute inset-[30%] rounded-full border border-primary-foreground/10" />
      <div className="absolute inset-[45%] rounded-full border border-primary-foreground/8" />

      {/* Crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary-foreground/8" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-primary-foreground/8" />

      {/* Center dot (Dhaka) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
        </span>
      </div>

      {/* Sweep line */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }}>
        <div
          className="absolute top-1/2 left-1/2 h-px origin-left bg-linear-to-r from-secondary/60 to-transparent"
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
}

export default function TelemetryDashboard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".telem-card", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-10 bg-foreground/20" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live Telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Widget A — Coordinates */}
          <div className="telem-card rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-5">
            <div className="flex items-center gap-2 w-full">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Coordinates
              </span>
            </div>
            <RadarPing />
            <div className="text-center">
              <p className="text-xl font-black tracking-tight">
                Dhaka, Bangladesh
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                23.8103° N, 90.4125° E
              </p>
            </div>
          </div>

          {/* Widget B — Local Chronometer */}
          <div className="telem-card rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-5">
            <div className="flex items-center gap-2 w-full">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Local Chronometer
              </span>
            </div>
            <LiveClock />
            <div className="text-center">
              <p className="text-sm font-semibold">BST (GMT+6)</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bangladesh Standard Time
              </p>
            </div>
          </div>

          {/* Widget C — Operational Status */}
          <div className="telem-card rounded-xl border border-border bg-card p-6 flex flex-col justify-between gap-5">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Operational Status
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-green-600">
                  System Nominal
                </span>
              </div>
              <p className="text-lg font-bold tracking-tight leading-snug">
                Active — Leading engineering at BOT Engineers &amp; navigating
                campus at BRAC University.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Robotics", "Web Systems", "Embedded"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-widest border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
