"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface EducationData {
  degree?: string;
  university?: string;
  status?: string;
  summary?: string;
  coursework?: string[];
  achievements?: string[];
}

interface EducationProps {
  data: EducationData | null;
}

export default function Education({ data }: EducationProps) {
  const ref = useRef<HTMLElement>(null);
  const coursework = data?.coursework ?? [];
  const achievements = data?.achievements ?? [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".edu-reveal").forEach((el) => {
        gsap.from(el, {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="edu-reveal text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          Education
        </h2>
        <p className="edu-reveal text-muted-foreground max-w-xl mb-14">
          Academic foundation underpinning both my software and hardware engineering work.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Degree Card */}
          <div className="edu-reveal lg:col-span-1 rounded-2xl border border-border bg-card p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-card-foreground leading-tight">
                  {data?.degree ?? "B.Sc. in Computer Science"}
                </h3>
                <p className="text-sm text-muted-foreground">{data?.university ?? "BRAC University"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                {data?.status ?? "Ongoing"}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {data?.summary ?? "Focused on theoretical CS fundamentals alongside hands-on systems engineering. Actively combining academic rigor with industry-grade project delivery."}
            </p>
          </div>

          {/* Relevant Coursework */}
          <div className="edu-reveal lg:col-span-1 rounded-2xl border border-border bg-card p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-1">
              <BookOpen size={18} className="text-primary" />
              <h3 className="text-lg font-extrabold text-card-foreground">
                Relevant Coursework
              </h3>
            </div>

            <ul className="grid grid-cols-1 gap-2.5">
              {coursework.map((course) => (
                <li
                  key={course}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="edu-reveal lg:col-span-1 rounded-2xl border border-border bg-card p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-1">
              <Award size={18} className="text-primary" />
              <h3 className="text-lg font-extrabold text-card-foreground">
                Achievements
              </h3>
            </div>

            <ul className="flex flex-col gap-4">
              {achievements.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary/30 shrink-0 ring-2 ring-primary/10" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex flex-wrap gap-1.5">
                {["Problem Solving", "Teamwork", "Research"].map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
