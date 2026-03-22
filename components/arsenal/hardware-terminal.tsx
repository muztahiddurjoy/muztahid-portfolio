"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Navigation, Radio, CircuitBoard, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    pid: "001",
    name: "ros2_navigation_stack",
    status: "RUNNING",
    cpu: "34.2%",
    detail: "Nav2 with DWB local planner, AMCL localization",
  },
  {
    pid: "002",
    name: "slam_toolbox_node",
    status: "RUNNING",
    cpu: "28.7%",
    detail: "Async SLAM with loop closure, LiDAR-based mapping",
  },
  {
    pid: "003",
    name: "sensor_fusion_ekf",
    status: "RUNNING",
    cpu: "12.1%",
    detail: "Extended Kalman Filter fusing IMU + wheel odometry",
  },
  {
    pid: "004",
    name: "lidar_scan_matcher",
    status: "RUNNING",
    cpu: "18.5%",
    detail: "ICP-based scan matching for pose correction",
  },
  {
    pid: "005",
    name: "motor_control_pid",
    status: "ACTIVE",
    cpu: "8.3%",
    detail: "Real-time PID loop at 1kHz for differential drive",
  },
];

const microcontrollers = [
  {
    name: "STM32F4",
    arch: "ARM Cortex-M4",
    use: "Motor control, encoder feedback, PWM generation",
    freq: "168 MHz",
  },
  {
    name: "ESP32",
    arch: "Xtensa LX6",
    use: "WiFi telemetry, sensor polling, I2C bus master",
    freq: "240 MHz",
  },
  {
    name: "STM32H7",
    arch: "ARM Cortex-M7",
    use: "High-freq sensor fusion, CAN bus communication",
    freq: "480 MHz",
  },
  {
    name: "ESP32-S3",
    arch: "Xtensa LX7",
    use: "Edge ML inference, BLE mesh networking",
    freq: "240 MHz",
  },
];

export default function HardwareTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          // Typewriter effect for process lines
          let line = 0;
          const interval = setInterval(() => {
            line++;
            setVisibleLines(line);
            if (line >= processes.length) clearInterval(interval);
          }, 300);
        },
        once: true,
      });

      gsap.utils.toArray<HTMLElement>(".mcu-card").forEach((el, i) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
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
    <section
      id="section-embedded"
      ref={sectionRef}
      className="py-24 bg-card overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Cpu size={20} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Robotics &amp; Embedded Console
          </h2>
        </div>
        <p className="text-muted-foreground max-w-xl mb-16">
          Bare-metal programming, real-time operating systems, and autonomous
          navigation stacks.
        </p>

        {/* Terminal container */}
        <div className="rounded-xl border-2 border-border bg-[#0a0e17] overflow-hidden">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1320] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-white/40 ml-3">
              muz@rover:~/ros2_ws — bash
            </span>
          </div>

          {/* Process table */}
          <div className="p-5 font-mono text-sm">
            {/* Header */}
            <div className="text-green-400/80 mb-1">
              $ ros2 node list --running
            </div>
            <div className="text-white/30 mb-3 text-xs">
              ──────────────────────────────────────────────────────────
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[60px_1fr_80px_70px] gap-2 text-xs text-white/40 mb-2 px-1">
              <span>PID</span>
              <span>PROCESS</span>
              <span>STATUS</span>
              <span>CPU</span>
            </div>

            {/* Process rows */}
            {processes.map((proc, idx) => (
              <div
                key={proc.pid}
                className={`grid grid-cols-[60px_1fr_80px_70px] gap-2 text-xs px-1 py-1.5 rounded transition-opacity duration-300 ${
                  idx < visibleLines ? "opacity-100" : "opacity-0"
                } ${idx % 2 === 0 ? "bg-white/2" : ""}`}
              >
                <span className="text-white/50">{proc.pid}</span>
                <div className="flex flex-col">
                  <span className="text-green-300">{proc.name}</span>
                  <span className="text-white/25 text-[10px] mt-0.5">
                    {proc.detail}
                  </span>
                </div>
                <span
                  className={
                    proc.status === "RUNNING"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {proc.status}
                </span>
                <span className="text-cyan-300/70">{proc.cpu}</span>
              </div>
            ))}

            {/* Blinking cursor */}
            <div className="mt-3 flex items-center gap-1">
              <span className="text-green-400/80 text-xs">$</span>
              <span className="w-2 h-4 bg-green-400/60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Microcontroller Matrix */}
        <h3 className="text-xl font-extrabold text-foreground mt-16 mb-6 flex items-center gap-2">
          <CircuitBoard size={18} className="text-secondary" />
          Microcontroller Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {microcontrollers.map((mcu) => (
            <div
              key={mcu.name}
              className="mcu-card rounded-xl border border-border bg-background p-5 group hover:border-secondary/50 transition-colors duration-300"
            >
              {/* Chip SVG icon */}
              <div className="flex items-center justify-between mb-4">
                <svg
                  viewBox="0 0 48 48"
                  className="w-10 h-10 text-secondary/70 group-hover:text-secondary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="12" y="12" width="24" height="24" rx="2" />
                  {/* Pins */}
                  <line x1="18" y1="8" x2="18" y2="12" />
                  <line x1="24" y1="8" x2="24" y2="12" />
                  <line x1="30" y1="8" x2="30" y2="12" />
                  <line x1="18" y1="36" x2="18" y2="40" />
                  <line x1="24" y1="36" x2="24" y2="40" />
                  <line x1="30" y1="36" x2="30" y2="40" />
                  <line x1="8" y1="18" x2="12" y2="18" />
                  <line x1="8" y1="24" x2="12" y2="24" />
                  <line x1="8" y1="30" x2="12" y2="30" />
                  <line x1="36" y1="18" x2="40" y2="18" />
                  <line x1="36" y1="24" x2="40" y2="24" />
                  <line x1="36" y1="30" x2="40" y2="30" />
                  <circle cx="24" cy="24" r="4" />
                </svg>
                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {mcu.freq}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-foreground">{mcu.name}</h4>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                {mcu.arch}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                {mcu.use}
              </p>
            </div>
          ))}
        </div>

        {/* Implementation callout */}
        <div className="mt-8 rounded-xl border border-border bg-muted/40 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Activity size={18} className="text-primary" />
            <span className="text-sm font-extrabold text-foreground">
              High-Frequency Control
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Line-following algorithms on STM32 run at 1kHz polling rates using
            interrupt-driven sensor reads. PID tuning is performed with custom
            serial telemetry dashboards, achieving sub-centimeter tracking
            accuracy on competition courses.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {[
              "Interrupt-Driven I/O",
              "PID Tuning",
              "DMA Transfers",
              "RTOS Tasks",
              "CAN Bus",
            ].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
