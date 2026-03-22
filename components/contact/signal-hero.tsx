"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SignalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".signal-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      // Animate the pathway lines
      gsap.from(".path-line", {
        strokeDashoffset: 800,
        duration: 2,
        stagger: 0.3,
        ease: "power2.inOut",
        delay: 0.6,
      });

      // Animate the data packets
      const packets = gsap.utils.toArray<SVGCircleElement>(".data-packet");
      packets.forEach((packet, i) => {
        const path = svgRef.current?.querySelector(
          `.motion-path-${i}`
        ) as SVGPathElement | null;
        if (!path) return;

        gsap.to(packet, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          duration: 3 + i * 0.5,
          repeat: -1,
          ease: "none",
          delay: i * 0.8,
        });
      });

      // Pulse the node circles
      gsap.to(".node-pulse", {
        scale: 1.4,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power1.out",
        stagger: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      {/* Animated SVG network visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 lg:opacity-30">
        <svg
          ref={svgRef}
          viewBox="0 0 800 500"
          className="w-full h-full max-w-4xl"
          fill="none"
        >
          {/* Network paths */}
          <path
            className="path-line"
            d="M100,250 C200,100 350,400 500,250"
            stroke="#d2b48c"
            strokeWidth="1.5"
            strokeDasharray="800"
            strokeDashoffset="0"
          />
          <path
            className="path-line"
            d="M150,350 C300,200 450,300 650,150"
            stroke="#d2b48c"
            strokeWidth="1"
            strokeDasharray="800"
            strokeDashoffset="0"
            opacity="0.6"
          />
          <path
            className="path-line"
            d="M50,150 C200,300 400,100 700,300"
            stroke="#d2b48c"
            strokeWidth="1"
            strokeDasharray="800"
            strokeDashoffset="0"
            opacity="0.4"
          />

          {/* Motion paths (invisible, used for packet animation) */}
          <path
            className="motion-path-0"
            d="M100,250 C200,100 350,400 500,250"
            stroke="none"
          />
          <path
            className="motion-path-1"
            d="M150,350 C300,200 450,300 650,150"
            stroke="none"
          />
          <path
            className="motion-path-2"
            d="M50,150 C200,300 400,100 700,300"
            stroke="none"
          />

          {/* Data packets */}
          <circle className="data-packet" r="4" fill="#d2b48c" />
          <circle className="data-packet" r="3" fill="#d2b48c" opacity="0.8" />
          <circle className="data-packet" r="3.5" fill="#d2b48c" opacity="0.6" />

          {/* Static nodes */}
          {[
            [100, 250],
            [500, 250],
            [150, 350],
            [650, 150],
            [50, 150],
            [700, 300],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                className="node-pulse"
                cx={cx}
                cy={cy}
                r="8"
                fill="#d2b48c"
                opacity="0.5"
              />
              <circle cx={cx} cy={cy} r="4" fill="#d2b48c" />
            </g>
          ))}

          {/* Grid lines */}
          {[100, 200, 300, 400, 500, 600, 700].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1={0}
              x2={x}
              y2={500}
              stroke="#d2b48c"
              strokeWidth="0.3"
              opacity="0.15"
            />
          ))}
          {[100, 200, 300, 400].map((y) => (
            <line
              key={`h-${y}`}
              x1={0}
              y1={y}
              x2={800}
              y2={y}
              stroke="#d2b48c"
              strokeWidth="0.3"
              opacity="0.15"
            />
          ))}
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-3xl">
          <div className="signal-text flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-primary-foreground/20" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Signal &amp; Routing
            </span>
          </div>

          <h1 className="signal-text text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.95] text-primary-foreground">
            Initiate
            <br />
            Connection.
          </h1>

          <p className="signal-text text-lg md:text-xl max-w-2xl text-primary-foreground/70 leading-relaxed mt-8">
            Secure routing for architectural consultations, robotics
            collaborations, and engineering opportunities.
          </p>

          {/* Signal strength indicator */}
          <div className="signal-text flex items-center gap-2 mt-10">
            <div className="flex items-end gap-0.5 h-5">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className="w-1.5 bg-primary-foreground/80 rounded-sm"
                  style={{ height: `${bar * 20}%` }}
                />
              ))}
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary-foreground/50">
              Signal Strength: Excellent
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
