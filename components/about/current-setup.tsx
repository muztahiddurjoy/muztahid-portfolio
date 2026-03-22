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
      {
        icon: Cpu,
        label: "CPU",
        detail: "High-performance multi-core processor built for parallel deep learning workloads and ROS2 simulation",
      },
      {
        icon: MemoryStick,
        label: "RAM",
        detail: "High-capacity memory for running Gazebo simulations, Docker containers, and heavy IDE environments simultaneously",
      },
      {
        icon: HardDrive,
        label: "GPU",
        detail: "Dedicated GPU accelerating PyTorch/TensorFlow training, CUDA-based point cloud processing, and 3D rendering",
      },
      {
        icon: HardDrive,
        label: "Storage",
        detail: "NVMe SSD setup for fast model loading, dataset access, and build pipeline throughput",
      },
    ],
  },
  {
    title: "Software Stack",
    icon: Code,
    items: [
      {
        icon: Code,
        label: "Editor",
        detail: "VS Code with Vim keybindings, custom snippets, and a minimal extension set tuned for Next.js, ROS2, and C++",
      },
      {
        icon: Terminal,
        label: "Terminal",
        detail: "Zsh with custom aliases, tmux for session management, and fzf for rapid file navigation",
      },
      {
        icon: Container,
        label: "Containers",
        detail: "Docker and Docker Compose for reproducible dev environments — especially critical for ROS2 workspace isolation",
      },
      {
        icon: Layers,
        label: "OS",
        detail: "Ubuntu Linux as daily driver — required for first-class ROS2 support and low-level hardware access",
      },
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
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          The Current Workspace
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          A development environment purpose-built for deep learning, robotics simulation,
          and heavy full-stack workflows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div
                key={cat.title}
                className="setup-reveal rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <CatIcon size={20} className="text-primary dark:text-primary" />
                  </div>
                  <h3 className="text-xl font-extrabold text-card-foreground">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-5">
                  {cat.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="setup-reveal flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <ItemIcon
                            size={16}
                            className="text-secondary dark:text-primary"
                          />
                        </div>
                        <div>
                          <span className="text-sm font-extrabold text-foreground">
                            {item.label}
                          </span>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
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
