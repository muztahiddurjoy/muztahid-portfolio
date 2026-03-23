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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <Activity size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Live.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Telemetry
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Real-time operational data and location telemetry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Coordinates */}
          <div className="telem-card border-4 border-foreground p-6 flex flex-col justify-between gap-6">
            <div className="flex items-center gap-2 pb-3 border-b-4 border-foreground">
              <MapPin size={14} className="text-foreground/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
                Coordinates
              </span>
            </div>
            <div className="text-center">
              <p className="text-xl font-black uppercase tracking-tight">
                Dhaka, Bangladesh
              </p>
              <p className="text-xs font-mono text-foreground/40 mt-1">
                23.8103° N, 90.4125° E
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                Position locked
              </span>
            </div>
          </div>

          {/* Chronometer */}
          <div className="telem-card border-4 border-foreground border-l-0 p-6 flex flex-col items-center justify-between gap-6 max-md:border-l-4 max-md:border-t-0">
            <div className="flex items-center gap-2 pb-3 border-b-4 border-foreground w-full">
              <Clock size={14} className="text-foreground/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
                Local Chronometer
              </span>
            </div>
            <LiveClock />
            <div className="text-center">
              <p className="text-sm font-black uppercase">BST (GMT+6)</p>
              <p className="text-xs text-foreground/40 mt-0.5">
                Bangladesh Standard Time
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="telem-card border-4 border-foreground border-l-0 p-6 flex flex-col justify-between gap-5 max-md:border-l-4 max-md:border-t-0">
            <div className="flex items-center gap-2 pb-3 border-b-4 border-foreground">
              <Activity size={14} className="text-foreground/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
                Operational Status
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-accent">
                  System Nominal
                </span>
              </div>
              <p className="text-base font-black tracking-tight leading-snug">
                Active — Leading engineering at BOT Engineers & navigating
                campus at BRAC University.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Robotics", "Web Systems", "Embedded"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]"
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