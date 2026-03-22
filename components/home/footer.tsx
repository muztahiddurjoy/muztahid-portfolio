"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status line */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span>Currently building at BOT Engineers.</span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/muztahiddurjoy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:muztahid@example.com"
            aria-label="Email"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
