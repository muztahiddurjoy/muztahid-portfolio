"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, BookOpen, Award } from "lucide-react";

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
    <section ref={ref} className="py-24 md:py-32 bg-muted/20 border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Brutalist Header */}
        <div className="relative mb-16 max-w-4xl">
          <span className="font-script text-3xl md:text-4xl text-primary absolute -top-8 left-0 md:-top-10 -rotate-3 z-10">
            The foundation.
          </span>
          <h2 className="edu-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mt-6">
            <span className="text-foreground">Academic</span>{" "}
            <span className="bg-foreground text-background px-3 pt-3 pb-1 md:px-5 md:pt-4 md:pb-2 inline-block">
              Education
            </span>
          </h2>
          <p className="edu-reveal mt-6 text-sm md:text-base font-bold uppercase tracking-wide text-foreground/80 leading-snug max-w-2xl border-l-8 border-accent pl-5">
            Academic foundation underpinning both my software and hardware engineering work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Degree Card */}
          <div className="edu-reveal lg:col-span-1 border-4 border-foreground bg-background flex flex-col">
            <div className="flex items-center gap-4 border-b-4 border-foreground p-5 bg-muted/20">
              <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background">
                <GraduationCap size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground leading-none">
                  {data?.degree ?? "B.Sc. in Computer Science"}
                </h3>
                <p className="text-xs font-bold text-foreground/50 uppercase tracking-wide mt-1">
                  {data?.university ?? "BRAC University"}
                </p>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="h-0.5 flex-1 bg-foreground/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 px-3 py-1 border-2 border-foreground/20">
                  {data?.status ?? "Ongoing"}
                </span>
                <span className="h-0.5 flex-1 bg-foreground/10" />
              </div>

              <p className="text-sm font-bold text-foreground/70 leading-snug border-l-4 border-foreground/20 pl-4">
                {data?.summary ?? "Focused on theoretical CS fundamentals alongside hands-on systems engineering."}
              </p>
            </div>
          </div>

          {/* Relevant Coursework */}
          <div className="edu-reveal lg:col-span-1 border-4 border-foreground bg-background flex flex-col">
            <div className="flex items-center gap-4 border-b-4 border-foreground p-5 bg-muted/20">
              <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background">
                <BookOpen size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-foreground leading-none">
                Coursework
              </h3>
            </div>

            <div className="p-6 flex-grow">
              <ul className="flex flex-col gap-2.5">
                {coursework.map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-sm font-bold text-foreground/70"
                  >
                    <span className="w-2 h-0.5 bg-foreground/30 shrink-0" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t-4 border-foreground p-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                {coursework.length} courses
              </span>
            </div>
          </div>

          {/* Achievements */}
          <div className="edu-reveal lg:col-span-1 border-4 border-foreground bg-background flex flex-col">
            <div className="flex items-center gap-4 border-b-4 border-foreground p-5 bg-muted/20">
              <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background">
                <Award size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-foreground leading-none">
                Achievements
              </h3>
            </div>

            <div className="p-6 flex-grow">
              <ul className="flex flex-col gap-4">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-foreground/20 shrink-0" />
                    <span className="text-sm font-bold text-foreground/70 leading-snug">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t-4 border-foreground p-4">
              <div className="flex flex-wrap gap-1.5">
                {["Problem Solving", "Teamwork", "Research"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em] text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}