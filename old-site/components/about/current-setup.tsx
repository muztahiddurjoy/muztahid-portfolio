"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Monitor,
  Cpu,
  HardDrive,
  MemoryStick,
  Code,
  Terminal,
  Container,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Hardware",
    icon: Monitor,
    items: [
      { icon: Cpu, label: "CPU", detail: "High-performance multi-core processor for parallel deep learning workloads and ROS2 simulation" },
      { icon: MemoryStick, label: "RAM", detail: "High-capacity memory for running Gazebo simulations, Docker containers, and heavy IDE environments simultaneously" },
      { icon: HardDrive, label: "GPU", detail: "Dedicated GPU accelerating PyTorch/TensorFlow training, CUDA-based point cloud processing, and 3D rendering" },
      { icon: HardDrive, label: "Storage", detail: "NVMe SSD setup for fast model loading, dataset access, and build pipeline throughput" },
    ],
  },
  {
    title: "Software Stack",
    icon: Code,
    items: [
      { icon: Code, label: "Editor", detail: "VS Code with Vim keybindings, custom snippets, and a minimal extension set tuned for Next.js, ROS2, and C++" },
      { icon: Terminal, label: "Terminal", detail: "Zsh with custom aliases, tmux for session management, and fzf for rapid file navigation" },
      { icon: Container, label: "Containers", detail: "Docker and Docker Compose for reproducible dev environments — especially for ROS2 workspace isolation" },
      { icon: Layers, label: "OS", detail: "Ubuntu Linux as daily driver — required for first-class ROS2 support and low-level hardware access" },
    ],
  },
];

export default function CurrentSetup() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".setup-reveal").forEach((el, i) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <span className="font-script text-2xl md:text-3xl text-primary -rotate-2 inline-block mb-3">
          The battlestation.
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-4 leading-[0.9]">
          Current{" "}
          <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">
            Workspace
          </span>
        </h2>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Purpose-built for deep learning, robotics simulation, and heavy full-stack workflows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {categories.map((cat, catIdx) => {
            const CatIcon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`setup-reveal border-4 border-foreground ${catIdx > 0 ? "border-t-0 md:border-t-4 md:border-l-0" : ""}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 p-5 border-b-4 border-foreground">
                  <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                    <CatIcon size={20} />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                    {cat.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="flex flex-col">
                  {cat.items.map((item, itemIdx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`setup-reveal flex items-start gap-3 p-5 ${
                          itemIdx < cat.items.length - 1 ? "border-b-2 border-foreground/15" : ""
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center bg-foreground/10">
                          <ItemIcon size={14} className="text-foreground" />
                        </div>
                        <div>
                          <span className="text-sm font-black uppercase tracking-tight text-foreground">
                            {item.label}
                          </span>
                          <p className="text-xs text-foreground/50 leading-relaxed mt-0.5">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}