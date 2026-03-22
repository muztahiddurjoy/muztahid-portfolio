"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Table, ChevronUp, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type SortKey = "technology" | "domain" | "useCase" | "years";

interface SkillRow {
  technology: string;
  domain: string;
  useCase: string;
  years: string;
  yearsNum: number;
}

const skills: SkillRow[] = [
  {
    technology: "Next.js",
    domain: "Full-Stack Web",
    useCase: "Server-rendered React apps, ISR, edge functions",
    years: "3+",
    yearsNum: 3,
  },
  {
    technology: "React",
    domain: "Full-Stack Web",
    useCase: "Component-driven UI architecture",
    years: "3+",
    yearsNum: 3,
  },
  {
    technology: "NestJS",
    domain: "Full-Stack Web",
    useCase: "Modular backend services, REST APIs",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "Prisma ORM",
    domain: "Full-Stack Web",
    useCase: "Type-safe database access, migrations",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "PostgreSQL",
    domain: "Full-Stack Web",
    useCase: "Relational data modeling, query optimization",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "TypeScript",
    domain: "Full-Stack Web",
    useCase: "End-to-end type safety across stack",
    years: "3+",
    yearsNum: 3,
  },
  {
    technology: "Tailwind CSS",
    domain: "Full-Stack Web",
    useCase: "Utility-first styling, design systems",
    years: "3+",
    yearsNum: 3,
  },
  {
    technology: "ROS2",
    domain: "Autonomy & Embedded",
    useCase: "Navigation stacks, SLAM, sensor fusion",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "C/C++",
    domain: "Autonomy & Embedded",
    useCase: "Firmware, real-time control, ROS2 nodes",
    years: "4+",
    yearsNum: 4,
  },
  {
    technology: "STM32",
    domain: "Autonomy & Embedded",
    useCase: "Motor control, PID loops, sensor polling",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "ESP32",
    domain: "Autonomy & Embedded",
    useCase: "WiFi telemetry, BLE, edge processing",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "Python",
    domain: "Autonomy & Embedded",
    useCase: "ROS2 scripts, ML prototyping, automation",
    years: "4+",
    yearsNum: 4,
  },
  {
    technology: "Java",
    domain: "Core CS & Math",
    useCase: "Data structures, algorithms, OOP fundamentals",
    years: "3+",
    yearsNum: 3,
  },
  {
    technology: "MATLAB",
    domain: "Core CS & Math",
    useCase: "Signal processing, control system modeling",
    years: "1+",
    yearsNum: 1,
  },
  {
    technology: "3D Printing",
    domain: "Rapid Prototyping",
    useCase: "Sensor mounts, chassis, enclosures",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "SolidWorks",
    domain: "Rapid Prototyping",
    useCase: "Parametric CAD, assembly modeling",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "Docker",
    domain: "Full-Stack Web",
    useCase: "Containerized dev environments, CI/CD",
    years: "2+",
    yearsNum: 2,
  },
  {
    technology: "AWS",
    domain: "Full-Stack Web",
    useCase: "SES, S3, EC2, Route 53, deployment",
    years: "2+",
    yearsNum: 2,
  },
];

export default function SkillDataTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sortKey, setSortKey] = useState<SortKey>("yearsNum" as SortKey);
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".table-reveal", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
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

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...skills].sort((a, b) => {
    const realKey = sortKey === ("yearsNum" as SortKey) ? "yearsNum" : sortKey;
    let aVal: string | number;
    let bVal: string | number;

    if (realKey === "yearsNum") {
      aVal = a.yearsNum;
      bVal = b.yearsNum;
    } else {
      aVal = a[realKey as keyof SkillRow] as string;
      bVal = b[realKey as keyof SkillRow] as string;
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="opacity-20" />;
    return sortAsc ? (
      <ChevronUp size={12} className="text-secondary" />
    ) : (
      <ChevronDown size={12} className="text-secondary" />
    );
  };

  return (
    <section ref={sectionRef} className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="table-reveal flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Table size={20} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Proficiency Matrix
          </h2>
        </div>
        <p className="table-reveal text-muted-foreground max-w-xl mb-12">
          No arbitrary progress bars. Honest, data-driven technology
          proficiency.
        </p>

        {/* Data Table */}
        <div className="table-reveal rounded-xl border-2 border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  {[
                    { key: "technology" as SortKey, label: "Technology" },
                    { key: "domain" as SortKey, label: "Domain" },
                    { key: "useCase" as SortKey, label: "Primary Use Case" },
                    { key: "yearsNum" as SortKey, label: "Years Active" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="text-left px-5 py-4 font-extrabold text-xs uppercase tracking-wider cursor-pointer select-none hover:bg-primary-foreground/10 transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon col={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, idx) => (
                  <tr
                    key={row.technology}
                    className={`border-t border-border transition-colors hover:bg-secondary/5 ${
                      idx % 2 === 0 ? "bg-card" : "bg-background"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-bold text-foreground whitespace-nowrap">
                      {row.technology}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/5 px-2 py-0.5 text-xs font-semibold text-foreground/80">
                        {row.domain}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {row.useCase}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-secondary whitespace-nowrap">
                      {row.years}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between px-5 py-3 bg-muted/40 border-t border-border">
            <span className="text-xs text-muted-foreground">
              {skills.length} technologies tracked
            </span>
            <span className="text-xs text-muted-foreground">
              Click column headers to sort
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
