"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectsHero() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    }, ref);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      context.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      context.clearRect(0, 0, w, h);
      time += 0.003;

      const fg = getComputedStyle(document.documentElement).getPropertyValue("--background").trim();
      const lineColor = `rgba(${fg === "#fff" ? "255,255,255" : "0,0,0"}, 0.06)`;
      const nodeColor = `rgba(${fg === "#fff" ? "255,255,255" : "0,0,0"}, 0.1)`;
      const trajColor = `rgba(${fg === "#fff" ? "255,255,255" : "0,0,0"}, 0.15)`;

      context.strokeStyle = lineColor;
      context.lineWidth = 0.5;
      const spacing = 40;
      for (let x = 0; x < w; x += spacing) {
        const offset = Math.sin(time + x * 0.01) * 3;
        context.beginPath();
        context.moveTo(x + offset, 0);
        context.lineTo(x + offset, h);
        context.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        const offset = Math.cos(time + y * 0.01) * 3;
        context.beginPath();
        context.moveTo(0, y + offset);
        context.lineTo(w, y + offset);
        context.stroke();
      }

      context.fillStyle = nodeColor;
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          const pulse = Math.sin(time * 2 + x * 0.05 + y * 0.05) * 0.5 + 0.5;
          const radius = 1 + pulse * 1.5;
          context.beginPath();
          context.arc(
            x + Math.sin(time + x * 0.01) * 3,
            y + Math.cos(time + y * 0.01) * 3,
            radius,
            0,
            Math.PI * 2
          );
          context.fill();
        }
      }

      context.strokeStyle = trajColor;
      context.lineWidth = 1.5;
      context.beginPath();
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const x = t * w;
        const y =
          h * 0.5 +
          Math.sin(t * Math.PI * 2 + time * 1.5) * h * 0.15 +
          Math.sin(t * Math.PI * 4 + time * 0.8) * h * 0.05;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      ctx.revert();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center bg-foreground text-background overflow-hidden border-b-4 border-background"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">
        <span className="projects-hero-text font-script text-accent text-lg md:text-xl mb-3 block">
          project universe
        </span>
        <h1 className="projects-hero-text text-4xl md:text-6xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.95] text-background mb-8">
          SYSTEMS IN
          <br />
          <span className="bg-background text-foreground px-3 pt-3 pb-1 inline-block">
            PRODUCTION
          </span>
        </h1>
        <p className="projects-hero-text text-lg md:text-xl text-background/60 leading-relaxed max-w-2xl border-l-8 border-accent pl-6">
          From scalable enterprise architectures to autonomous navigation in
          unstructured environments.
        </p>
      </div>
    </section>
  );
}