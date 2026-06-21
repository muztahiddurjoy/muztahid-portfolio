"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Navigation, Printer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const gridItems = [
  {
    icon: Cpu,
    title: "Microcontrollers & Embedded",
    description:
      "Low-level is where the interesting problems live. I program ESP32 and STM32 microcontrollers for real-time control systems — motor drivers for robotics, sensor fusion pipelines, and communication buses (I2C, SPI, UART). For the Mongol-tori rover, I wrote bare-metal firmware with PWM generation, encoder feedback, and PID control loops running at microsecond precision.",
    tags: ["ESP32", "STM32", "C/C++", "PID Control", "I2C/SPI/UART", "Firmware"],
    span: "lg:col-span-2",
  },
  {
    icon: Navigation,
    title: "Autonomous Navigation & SLAM",
    description:
      "Making a machine navigate unstructured environments is one of the hardest problems in robotics. With BRACU Mongol-tori, I work on ROS2-based navigation stacks fusing LiDAR point clouds, IMU data, and wheel odometry to build real-time maps of unknown terrain.",
    tags: ["ROS2", "SLAM", "LiDAR", "IMU Fusion", "Path Planning", "C++ Nodes"],
    span: "lg:col-span-1",
  },
  {
    icon: Printer,
    title: "Rapid Prototyping & 3D Printing",
    description:
      "Ideas that stay in CAD files are just daydreams. I use Bambu Lab printers and slicer workflows to go from concept to physical part in hours. Custom mounting brackets for LiDAR sensors, protective housings for electronics bays, or structural chassis components.",
    tags: ["Bambu Lab", "3D Printing", "CAD", "PLA/PETG/TPU", "Slicer"],
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-muted/10 border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <span className="font-script text-2xl md:text-3xl text-primary -rotate-2 inline-block mb-3">
          Where code meets metal.
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-4 leading-[0.9]">
          Hardware &amp;{" "}
          <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">
            Prototyping Lab
          </span>
        </h2>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Most developers never touch firmware or a soldering iron — this is what sets my work apart.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {gridItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bento-card border-4 border-foreground ${idx > 0 ? "border-t-0 lg:border-t-4" : ""} ${idx === 1 ? "lg:border-l-0" : ""} ${idx === 2 ? "lg:border-t-0" : ""} ${item.span}`}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 p-5 border-b-4 border-foreground">
                  <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-foreground">
                    {item.title}
                  </h3>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card footer — tags */}
                <div className="flex flex-wrap gap-1.5 px-6 pb-5 pt-3 border-t-2 border-foreground/20">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]">
                      {tag}
                    </span>
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