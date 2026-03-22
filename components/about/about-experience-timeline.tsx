"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  Briefcase,
  Lightbulb,
  Bot,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    icon: Award,
    title: "NASA Space Apps Challenge",
    subtitle: "The Competitive Spark",
    period: "2023",
    description:
      "Competed in NASA's global hackathon, building a data-visualization prototype that processed satellite telemetry data for environmental monitoring. This 48-hour sprint crystallized my ability to ship under extreme pressure and collaborate across disciplines. The experience ignited a competitive drive that has fueled every project since.",
    tags: ["Hackathon", "Data Viz", "Python", "Teamwork"],
    accent: "primary" as const,
  },
  {
    icon: Briefcase,
    title: "Software Engineer Intern",
    subtitle: "Bindulogic Limited — Industry Footing",
    period: "2023",
    description:
      "Gained my first taste of professional software engineering at a production-grade consultancy. Worked across the stack on client-facing applications, learning the discipline of code reviews, sprint planning, and writing software that real users depend on. This internship established my baseline for production quality.",
    tags: ["Professional Dev", "Full-Stack", "Agile", "Code Review"],
    accent: "secondary" as const,
  },
  {
    icon: Lightbulb,
    title: "Founded Appbaksho",
    subtitle: "Entrepreneurship & End-to-End Delivery",
    period: "2023 — Present",
    description:
      "Launched a software agency delivering full-stack web products for local businesses across Bangladesh. Handling end-to-end delivery — from client discovery and database design to deployment on AWS and post-launch monitoring. Appbaksho forced me to think beyond code: about product-market fit, client communication, and the business side of engineering.",
    tags: ["Entrepreneurship", "Prisma", "PostgreSQL", "AWS SES", "Product"],
    accent: "primary" as const,
  },
  {
    icon: Bot,
    title: "BRACU Mongol-tori",
    subtitle: "Bridging into AI, ROS2 & Autonomous Navigation",
    period: "2023 — Present",
    description:
      "Joined the university's autonomous vehicle team, programming navigation stacks using ROS2, SLAM algorithms, and LiDAR-based obstacle avoidance. Writing low-level motor drivers on STM32 microcontrollers. This role bridged my software skills into the physical world — making sense of unstructured environments with code that has real-world consequences.",
    tags: ["ROS2", "SLAM", "LiDAR", "STM32", "C/C++", "Autonomous Navigation"],
    accent: "secondary" as const,
  },
  {
    icon: Rocket,
    title: "Chief Software Engineer",
    subtitle: "BOT Engineers — Current Leadership Role",
    period: "2024 — Present",
    description:
      "Leading a cross-functional engineering team building production-grade web applications and internal tooling. Architected CI/CD pipelines, enforced code-review culture, and drove monorepo migration with Turborepo. This is the culmination of every prior experience — translating hard-won technical depth into architectural leadership at scale.",
    tags: ["Leadership", "Next.js", "NestJS", "AWS", "CI/CD", "Turborepo"],
    accent: "primary" as const,
  },
];

export default function AboutExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical line as user scrolls
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

      // Slide in each card
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

      // Pop the dots
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
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          The Builder&apos;s Timeline
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          Five inflection points that shaped my engineering trajectory — from competitive
          hackathons to leading production teams.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="about-timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

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
                  {/* Left card or spacer */}
                  {isLeft ? (
                    <div
                      className="about-tl-card ml-12 md:ml-0 md:text-right"
                      data-side="left"
                    >
                      <MilestoneCard milestone={ms} align="right" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Center dot */}
                  <div className="absolute left-4 md:relative md:left-auto flex items-start justify-center">
                    <span
                      className={`about-tl-dot relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background ${
                        ms.accent === "primary"
                          ? "border-primary"
                          : "border-secondary"
                      }`}
                    >
                      <Icon
                        size={14}
                        className={
                          ms.accent === "primary"
                            ? "text-primary"
                            : "text-secondary dark:text-secondary"
                        }
                      />
                    </span>
                  </div>

                  {/* Right card or spacer */}
                  {!isLeft ? (
                    <div
                      className="about-tl-card ml-12 md:ml-0"
                      data-side={side}
                    >
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
          {milestone.period}
        </span>
      </div>
      <h3 className="text-lg font-extrabold text-card-foreground">
        {milestone.title}
      </h3>
      <p
        className={`text-sm font-semibold mb-3 ${
          milestone.accent === "primary"
            ? "text-primary/80 dark:text-primary/90"
            : "text-secondary-foreground/70 dark:text-secondary/90"
        }`}
      >
        {milestone.subtitle}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {milestone.description}
      </p>
      <div
        className={`flex flex-wrap gap-1.5 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        {milestone.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
