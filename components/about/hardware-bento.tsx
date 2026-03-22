"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Navigation, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const gridItems = [
  {
    icon: Cpu,
    title: "Microcontrollers & Embedded Systems",
    description:
      "Low-level is where the interesting problems live. I program ESP32 and STM32 microcontrollers for real-time control systems — motor drivers for robotics, sensor fusion pipelines, and communication buses (I2C, SPI, UART). For the Mongol-tori rover, I wrote bare-metal firmware that handles PWM generation, encoder feedback, and PID control loops running at microsecond precision. This isn't Arduino hobbyist territory — it's production embedded C/C++ with strict timing constraints and limited memory budgets.",
    tags: ["ESP32", "STM32", "C/C++", "PID Control", "I2C/SPI/UART", "Firmware"],
    span: "lg:col-span-2",
  },
  {
    icon: Navigation,
    title: "Autonomous Navigation & SLAM",
    description:
      "Making a machine understand and navigate an unstructured environment is one of the hardest problems in robotics. With the BRACU Mongol-tori team, I work on ROS2-based navigation stacks that fuse LiDAR point clouds, IMU data, and wheel odometry to build real-time maps of unknown terrain. We implement SLAM algorithms that localize the rover while simultaneously mapping the environment — and then plan collision-free paths through it. The software stack runs on ROS2 Humble with custom C++ nodes for maximum throughput.",
    tags: ["ROS2", "SLAM", "LiDAR", "IMU Fusion", "Path Planning", "C++ Nodes"],
    span: "lg:col-span-1",
  },
  {
    icon: Printer,
    title: "Rapid Prototyping & 3D Printing",
    description:
      "Ideas that stay in CAD files are just daydreams. I use Bambu Lab printers and slicer workflows to go from concept to physical part in hours, not weeks. Whether it's custom mounting brackets for LiDAR sensors, protective housings for electronics bays, or structural chassis components, rapid prototyping closes the loop between digital design and physical validation. Understanding layer adhesion, infill strategies, and material properties (PLA, PETG, TPU) means I can design parts that are manufacturable from the start.",
    tags: ["Bambu Lab", "3D Printing", "CAD", "PLA/PETG/TPU", "Slicer Workflows"],
    span: "lg:col-span-1",
  },
];

export default function HardwareBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          The Hardware &amp; Prototyping Lab
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          Where software meets the physical world. Most developers never touch firmware
          or a soldering iron — this is what sets my work apart.
        </p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {gridItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bento-card rounded-2xl border border-border bg-background p-8 ${item.span}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <Icon size={20} className="text-primary dark:text-primary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
