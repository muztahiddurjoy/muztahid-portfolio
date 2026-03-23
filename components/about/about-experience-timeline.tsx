"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Briefcase, Lightbulb, Bot, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    icon: Award,
    title: "NASA Space Apps Challenge",
    subtitle: "The Competitive Spark",
    period: "2023",
    description:
      "Competed in NASA's global hackathon, building a data-visualization prototype that processed satellite telemetry data for environmental monitoring. This 48-hour sprint crystallized my ability to ship under extreme pressure and collaborate across disciplines.",
    tags: ["Hackathon", "Data Viz", "Python", "Teamwork"],
  },
  {
    icon: Briefcase,
    title: "Software Engineer Intern",
    subtitle: "Bindulogic Limited — Industry Footing",
    period: "2023",
    description:
      "Gained my first taste of professional software engineering at a production-grade consultancy. Worked across the stack on client-facing applications, learning the discipline of code reviews, sprint planning, and writing software that real users depend on.",
    tags: ["Professional Dev", "Full-Stack", "Agile", "Code Review"],
  },
  {
    icon: Lightbulb,
    title: "Founded Appbaksho",
    subtitle: "Entrepreneurship & End-to-End Delivery",
    period: "2023 — Present",
    description:
      "Launched a software agency delivering full-stack web products for local businesses across Bangladesh. Handling end-to-end delivery — from client discovery and database design to deployment on AWS and post-launch monitoring.",
    tags: ["Entrepreneurship", "Prisma", "PostgreSQL", "AWS SES", "Product"],
  },
  {
    icon: Bot,
    title: "BRACU Mongol-tori",
    subtitle: "AI, ROS2 & Autonomous Navigation",
    period: "2023 — Present",
    description:
      "Joined the university's autonomous vehicle team, programming navigation stacks using ROS2, SLAM algorithms, and LiDAR-based obstacle avoidance. Writing low-level motor drivers on STM32 microcontrollers.",
    tags: ["ROS2", "SLAM", "LiDAR", "STM32", "C/C++"],
  },
  {
    icon: Rocket,
    title: "Chief Software Engineer",
    subtitle: "BOT Engineers — Current Leadership Role",
    period: "2024 — Present",
    description:
      "Leading a cross-functional engineering team building production-grade web applications and internal tooling. Architected CI/CD pipelines, enforced code-review culture, and drove monorepo migration with Turborepo.",
    tags: ["Leadership", "Next.js", "NestJS", "AWS", "CI/CD", "Turborepo"],
  },
];

export default function AboutExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.utils.toArray<HTMLElement>(".about-tl-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          x: card.dataset.side === "left" ? -30 : 30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".about-tl-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 85%",
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
          The grind, mapped.
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-4 leading-[0.9]">
          Builder&apos;s{" "}
          <span className="bg-foreground text-background px-3 pt-3 pb-1 inline-block">
            Timeline
          </span>
        </h2>
        <p className="text-sm font-mono uppercase tracking-[0.1em] text-foreground/50 max-w-xl mb-16">
          Five inflection points that shaped my engineering trajectory.
        </p>

        {/* Timeline */}
        <div className="relative">
          <div className="about-timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-foreground/20 md:-translate-x-px" />

          <div className="flex flex-col gap-16">
            {milestones.map((ms, idx) => {
              const Icon = ms.icon;
              const isLeft = idx % 2 === 0;
              const side = isLeft ? "left" : "right";

              return (
                <div
                  key={idx}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8"
                >
                  {isLeft ? (
                    <div className="about-tl-card ml-12 md:ml-0 md:text-right" data-side="left">
                      <MilestoneCard milestone={ms} align="right" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  <div className="absolute left-4 md:relative md:left-auto flex items-start justify-center">
                    <span className="about-tl-dot relative z-10 flex h-8 w-8 items-center justify-center border-4 border-foreground bg-background">
                      <Icon size={14} className="text-foreground" />
                    </span>
                  </div>

                  {!isLeft ? (
                    <div className="about-tl-card ml-12 md:ml-0" data-side={side}>
                      <MilestoneCard milestone={ms} align="left" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  align,
}: {
  milestone: (typeof milestones)[number];
  align: "left" | "right";
}) {
  return (
    <div className={`border-4 border-foreground bg-background ${align === "right" ? "md:mr-0" : "md:ml-0"}`}>
      {/* Card header */}
      <div className={`flex flex-wrap items-center gap-2 p-4 border-b-4 border-foreground bg-muted/10 ${align === "right" ? "md:justify-end" : ""}`}>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
          {milestone.period}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
          {milestone.title}
        </h3>
        <p className="text-xs font-black uppercase tracking-[0.1em] text-accent mb-3">
          {milestone.subtitle}
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mb-4">
          {milestone.description}
        </p>
      </div>

      {/* Card footer — tags */}
      <div className={`flex flex-wrap gap-1.5 p-4 border-t-2 border-foreground/20 ${align === "right" ? "md:justify-end" : ""}`}>
        {milestone.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 border-2 border-foreground/30 text-[10px] font-black uppercase tracking-[0.1em]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}