"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://github.com/muztahiddurjoy", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/muztahiddurjoy", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/muztahiddurjoy", label: "X / Twitter", icon: Twitter },
  { href: "mailto:muztahid@example.com", label: "Email", icon: Mail },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-foreground bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <span className="flex items-center justify-center w-9 h-9 bg-foreground text-background text-sm font-black border-2 border-foreground">
                MR
              </span>
              <span className="text-sm font-black uppercase tracking-[0.15em] text-foreground">
                Muztahid Rahman
              </span>
            </Link>
            <p className="text-sm font-bold text-foreground/70 leading-snug max-w-xs border-l-4 border-foreground/20 pl-4">
              Software &amp; Robotics Engineer crafting scalable web platforms
              and autonomous robotic systems.
            </p>
            {/* Status */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-foreground/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-green-500" />
              </span>
              Building at BOT Engineers
            </div>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50 border-b-2 border-foreground/10 pb-2">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-foreground transition-colors duration-150 group"
                  >
                    <span className="w-1.5 h-0.5 bg-foreground/20 group-hover:bg-foreground group-hover:w-3 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50 border-b-2 border-foreground/10 pb-2">
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-foreground/60 hover:text-foreground transition-colors duration-150 group"
                  >
                    <Icon size={15} strokeWidth={2.5} />
                    {label}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" strokeWidth={3} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t-4 border-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-foreground/50">
            &copy; {year} Muztahid Rahman. All rights reserved.
          </p>
          <p className="text-xs font-black uppercase tracking-[0.1em] text-foreground/50">
            Built with{" "}
            <span className="text-foreground">Next.js</span> &amp;{" "}
            <span className="text-foreground">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}