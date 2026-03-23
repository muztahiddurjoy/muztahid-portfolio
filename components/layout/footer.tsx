"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://github.com/muztahiddurjoy",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/muztahiddurjoy",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://x.com/muztahiddurjoy",
    label: "X / Twitter",
    icon: Twitter,
  },
  {
    href: "mailto:muztahid@example.com",
    label: "Email",
    icon: Mail,
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Top section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-black">
                MR
              </span>
              <span className="text-sm font-bold tracking-wide text-foreground">
                Muztahid Rahman
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Software &amp; Robotics Engineer crafting scalable web platforms
              and autonomous robotic systems.
            </p>
            {/* Status */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Currently building at BOT Engineers
            </div>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                    }
                    aria-label={label}
                    className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Muztahid Rahman. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <span className="text-foreground font-medium">Next.js</span> &amp;{" "}
            <span className="text-foreground font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
