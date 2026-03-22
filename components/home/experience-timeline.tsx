"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Rocket, Lightbulb, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: Briefcase,
    role: "Chief Software Engineer",
    org: "BOT Engineers",
    period: "2024 — Present",
    description:
      "Leading a cross-functional engineering team building production-grade web applications and internal tooling. Architected CI/CD pipelines, enforced code-review culture, and drove migration to a monorepo with Turborepo.",
    tags: ["Leadership", "Next.js", "NestJS", "AWS", "CI/CD"],
    side: "left" as const,
  },
  {
    icon: Rocket,
    role: "AI & Autonomy Engineer",
    org: "BRACU Mongol-tori",
    period: "2023 — Present",
    description:
      "Developing autonomous navigation stacks using ROS2 and SLAM algorithms for unstructured terrains. Programming low-level motor drivers on STM32 micro-controllers and integrating LiDAR-based obstacle avoidance.",
    tags: ["ROS2", "SLAM", "C/C++", "STM32", "LiDAR"],
    side: "right" as const,
  },
  {
    icon: Lightbulb,
    role: "Founder & Lead Developer",
    org: "Appbaksho",
    period: "2023 — Present",
    description:
      "Founded a software agency delivering full-stack web products for local businesses. Handled end-to-end delivery from client discovery through database design, deployment on AWS, and post-launch monitoring.",
    tags: ["Entrepreneurship", "Prisma", "PostgreSQL", "AWS SES"],
    side: "left" as const,
  },
  {
    icon: GraduationCap,
    role: "NASA Space Apps Challenger",
    org: "NASA International Space Apps Challenge",
    period: "2023",
    description:
      "Competed in the global hackathon, building a data-visualization prototype that processed satellite telemetry data for environmental monitoring. Collaborated across disciplines within a 48-hour sprint.",
    tags: ["Hackathon", "Data Viz", "Teamwork", "Python"],
    side: "right" as const,
  },
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line drawing
      gsap.from(".timeline-line", {
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

      // Stagger-reveal each card
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
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

      // Pop the dots
      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
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
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          Experience &amp; Journey
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          Key roles that shaped my engineering perspective across software and hardware.
        </p>

        {/* Timeline container */}
        <div className="relative">
          {/* Center line — visible on md+ */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              const isLeft = exp.side === "left";

              return (
                <div
                  key={idx}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8"
                >
                  {/* Left card or spacer */}
                  {isLeft ? (
                    <div
                      className="timeline-card ml-12 md:ml-0 md:text-right"
                      data-side="left"
                    >
                      <TimelineContent exp={exp} Icon={Icon} align="right" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Center dot */}
                  <div className="absolute left-4 md:relative md:left-auto flex items-start justify-center">
                    <span className="timeline-dot relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <Icon size={14} className="text-primary" />
                    </span>
                  </div>

                  {/* Right card or spacer */}
                  {!isLeft ? (
                    <div
                      className="timeline-card ml-12 md:ml-0"
                      data-side="right"
                    >
                      <TimelineContent exp={exp} Icon={Icon} align="left" />
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

function TimelineContent({
  exp,
  align,
}: {
  exp: (typeof experiences)[number];
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  align: "left" | "right";
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 ${
        align === "right" ? "md:mr-0" : "md:ml-0"
      }`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 mb-2 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {exp.period}
        </span>
      </div>
      <h3 className="text-lg font-extrabold text-card-foreground">{exp.role}</h3>
      <p className="text-sm font-semibold text-primary/80 dark:text-primary/90 mb-3">
        {exp.org}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {exp.description}
      </p>
      <div
        className={`flex flex-wrap gap-1.5 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        {exp.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
