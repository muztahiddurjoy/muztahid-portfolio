"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Table2, ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  experience: string;
  lastUsed: string;
}

const skills: Skill[] = [
  { name: "TypeScript", category: "Language", proficiency: 95, experience: "4+ yrs", lastUsed: "Daily" },
  { name: "React / Next.js", category: "Framework", proficiency: 93, experience: "3+ yrs", lastUsed: "Daily" },
  { name: "Python", category: "Language", proficiency: 90, experience: "5+ yrs", lastUsed: "Weekly" },
  { name: "NestJS", category: "Framework", proficiency: 85, experience: "2+ yrs", lastUsed: "Weekly" },
  { name: "C / C++", category: "Language", proficiency: 80, experience: "3+ yrs", lastUsed: "Weekly" },
  { name: "ROS2", category: "Robotics", proficiency: 78, experience: "2+ yrs", lastUsed: "Weekly" },
  { name: "PostgreSQL", category: "Database", proficiency: 82, experience: "3+ yrs", lastUsed: "Daily" },
  { name: "Prisma ORM", category: "Database", proficiency: 88, experience: "2+ yrs", lastUsed: "Daily" },
  { name: "Docker", category: "DevOps", proficiency: 75, experience: "2+ yrs", lastUsed: "Weekly" },
  { name: "AWS (SES, S3, EC2)", category: "Cloud", proficiency: 72, experience: "2+ yrs", lastUsed: "Monthly" },
  { name: "Tailwind CSS", category: "Styling", proficiency: 95, experience: "3+ yrs", lastUsed: "Daily" },
  { name: "Git / GitHub", category: "Tooling", proficiency: 92, experience: "5+ yrs", lastUsed: "Daily" },
  { name: "STM32 / ESP32", category: "Embedded", proficiency: 76, experience: "2+ yrs", lastUsed: "Weekly" },
  { name: "3D Printing / CAD", category: "Fabrication", proficiency: 70, experience: "2+ yrs", lastUsed: "Monthly" },
  { name: "SLAM / Navigation", category: "Robotics", proficiency: 72, experience: "1+ yr", lastUsed: "Monthly" },
  { name: "OpenCV", category: "Vision", proficiency: 68, experience: "1+ yr", lastUsed: "Monthly" },
  { name: "Node.js", category: "Runtime", proficiency: 90, experience: "4+ yrs", lastUsed: "Daily" },
  { name: "Linux / Bash", category: "System", proficiency: 85, experience: "4+ yrs", lastUsed: "Daily" },
];

type SortKey = keyof Skill;
type SortDir = "asc" | "desc";

export default function SkillDataTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sortKey, setSortKey] = useState<SortKey>("proficiency");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-table", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skill-table",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sorted = useMemo(() => {
    return [...skills].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={10} className="text-foreground/30" />;
    return sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const columns: { key: SortKey; label: string; hideOnMobile?: boolean }[] = [
    { key: "name", label: "Skill" },
    { key: "category", label: "Category" },
    { key: "proficiency", label: "Level" },
    { key: "experience", label: "Exp", hideOnMobile: true },
    { key: "lastUsed", label: "Freq", hideOnMobile: true },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <Table2 size={20} />
          </div>
          <div>
            <span className="font-script text-xl text-primary -rotate-2 inline-block">Raw data.</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Skill Matrix
            </h2>
          </div>
        </div>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Every skill, ranked and sortable. Click any column header to reorder.
        </p>

        {/* Data table */}
        <div className="skill-table border-4 border-foreground overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-4 border-foreground">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 md:px-6 py-3 cursor-pointer select-none hover:bg-foreground/5 transition-colors duration-150 ${
                      col.hideOnMobile ? "hidden md:table-cell" : ""
                    }`}
                    onClick={() => toggleSort(col.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
                        {col.label}
                      </span>
                      <SortIcon col={col.key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((skill, idx) => (
                <tr
                  key={skill.name}
                  className={`border-b border-foreground/10 hover:bg-foreground/5 transition-colors duration-150 ${
                    idx % 2 === 0 ? "bg-foreground/[0.02]" : ""
                  }`}
                >
                  <td className="px-4 md:px-6 py-3">
                    <span className="text-sm font-black text-foreground">{skill.name}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3">
                    <span className="px-2 py-0.5 border-2 border-foreground/20 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/60">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 md:w-24 h-2 bg-foreground/10">
                        <div
                          className="h-full bg-foreground transition-all duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-foreground/50 w-8">
                        {skill.proficiency}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 hidden md:table-cell">
                    <span className="text-xs font-mono text-foreground/50">{skill.experience}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 hidden md:table-cell">
                    <span className="text-xs font-mono text-foreground/50">{skill.lastUsed}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
            {skills.length} skills indexed
          </span>
          <span className="text-[10px] font-mono text-foreground/30">
            sorted by {sortKey} ({sortDir})
          </span>
        </div>
      </div>
    </section>
  );
}