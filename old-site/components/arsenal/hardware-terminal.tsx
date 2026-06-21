"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Wifi, Terminal, Zap, ArrowRight, CircuitBoard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Process {
  pid: string;
  name: string;
  type: string;
  status: "running" | "idle" | "paused";
  memory: string;
}

const processes: Process[] = [
  { pid: "001", name: "ros2_nav_stack", type: "NAVIGATION", status: "running", memory: "284MB" },
  { pid: "002", name: "lidar_scan_node", type: "PERCEPTION", status: "running", memory: "156MB" },
  { pid: "003", name: "motor_ctrl_pwm", type: "ACTUATION", status: "idle", memory: "42MB" },
  { pid: "004", name: "slam_mapping", type: "MAPPING", status: "running", memory: "312MB" },
  { pid: "005", name: "imu_fusion", type: "SENSOR", status: "running", memory: "68MB" },
  { pid: "006", name: "path_planner_a*", type: "PLANNING", status: "paused", memory: "128MB" },
];

const microcontrollers = [
  {
    name: "STM32F4",
    role: "Motor Control & PWM Generation",
    specs: ["ARM Cortex-M4 @ 168MHz", "1MB Flash / 192KB SRAM", "12 PWM channels"],
    protocols: ["UART", "SPI", "I2C", "CAN"],
  },
  {
    name: "ESP32-S3",
    role: "Wireless Comms & Sensor Hub",
    specs: ["Dual-core Xtensa @ 240MHz", "Wi-Fi 802.11 b/g/n", "BLE 5.0"],
    protocols: ["MQTT", "WebSocket", "BLE GATT"],
  },
  {
    name: "Raspberry Pi 4",
    role: "High-level Compute & ROS2 Host",
    specs: ["BCM2711 Quad-core @ 1.8GHz", "8GB LPDDR4", "USB 3.0 / Gigabit Eth"],
    protocols: ["ROS2 DDS", "SSH", "GPIO"],
  },
];

export default function HardwareTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePid, setActivePid] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".hw-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statusColor = (status: Process["status"]) => {
    if (status === "running") return "bg-accent";
    if (status === "idle") return "bg-foreground/30";
    return "bg-primary";
  };

  return (
    <section id="section-hardware" ref={sectionRef} className="py-24 md:py-32 bg-foreground text-background border-t-4 border-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-background text-foreground">
            <Cpu size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Embedded.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-background leading-[0.9]">
              Hardware & Robotics
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-background/50 max-w-xl mb-16">
          Real-time systems, sensor fusion, and autonomous navigation pipelines.
        </p>

        {/* Process table (terminal aesthetic) */}
        <div className="hw-card border-4 border-background mb-12">
          <div className="flex items-center gap-2 px-6 py-3 border-b-4 border-background">
            <Terminal size={14} className="text-background/60" />
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-background/60">
              process_table — active nodes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-background/20">
                  {["PID", "PROCESS", "TYPE", "STATUS", "MEM"].map((h) => (
                    <th key={h} className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-background/40">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processes.map((p) => (
                  <tr
                    key={p.pid}
                    className={`border-b border-background/10 cursor-pointer transition-colors duration-150 ${
                      activePid === p.pid ? "bg-background/10" : "hover:bg-background/5"
                    }`}
                    onClick={() => setActivePid(activePid === p.pid ? null : p.pid)}
                  >
                    <td className="px-6 py-3 font-mono text-sm text-background/60">{p.pid}</td>
                    <td className="px-6 py-3 font-mono text-sm text-background">{p.name}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 border-2 border-background/30 text-[10px] font-black uppercase tracking-[0.1em] text-background/70">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 ${statusColor(p.status)}`} />
                        <span className="text-xs font-mono uppercase text-background/60">{p.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-mono text-sm text-background/50">{p.memory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Microcontroller matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {microcontrollers.map((mcu, idx) => (
            <div
              key={mcu.name}
              className={`hw-card border-4 border-background p-6 ${
                idx > 0 ? "md:border-l-0" : ""
              }`}
            >
              <div className="flex items-center gap-2 pb-4 mb-4 border-b-2 border-background/20">
                <div className="flex items-center justify-center w-8 h-8 bg-background text-foreground">
                  <CircuitBoard size={16} />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-background">
                  {mcu.name}
                </h3>
              </div>

              <p className="text-xs font-mono text-background/50 uppercase tracking-[0.1em] mb-4">
                {mcu.role}
              </p>

              <div className="space-y-2 mb-4">
                {mcu.specs.map((spec) => (
                  <div key={spec} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                    <span className="text-xs text-background/60">{spec}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 pt-3 border-t-2 border-background/10">
                {mcu.protocols.map((proto) => (
                  <span key={proto} className="px-2 py-0.5 border-2 border-background/30 text-[10px] font-black uppercase tracking-[0.1em] text-background/60">
                    {proto}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Implementation callout */}
        <div className="mt-12 border-4 border-background p-6">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-background/20">
            <Zap size={18} className="text-background" />
            <span className="text-sm font-black uppercase tracking-tight text-background">
              Implementation Note
            </span>
          </div>
          <p className="text-sm text-background/60 leading-relaxed max-w-2xl">
            All embedded code follows bare-metal or RTOS paradigms — no bloated frameworks. 
            ROS2 nodes communicate via DDS middleware, sensor fusion uses complementary filters, 
            and motor control runs interrupt-driven PWM at microsecond precision.
          </p>
        </div>
      </div>
    </section>
  );
}