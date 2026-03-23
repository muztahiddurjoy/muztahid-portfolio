"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/journal", label: "Journal" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b-4 border-foreground"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Muztahid Rahman – Home"
        >
          <span
            className={cn(
              "flex items-center justify-center w-9 h-9 text-sm font-black tracking-tight transition-colors duration-300 border-2",
              scrolled || !isHeroPage(pathname)
                ? "bg-foreground text-background border-foreground"
                : "bg-primary-foreground text-primary border-primary-foreground"
            )}
          >
            MR
          </span>
          <span
            className={cn(
              "hidden sm:block text-sm font-black uppercase tracking-[0.15em] transition-colors duration-300",
              scrolled || !isHeroPage(pathname)
                ? "text-foreground"
                : "text-primary-foreground"
            )}
          >
            Muztahid
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "relative px-4 py-2 text-xs font-black uppercase tracking-[0.15em] transition-colors duration-200",
                  isActive(href)
                    ? scrolled || !isHeroPage(pathname)
                      ? "text-background bg-foreground"
                      : "text-primary bg-primary-foreground"
                    : scrolled || !isHeroPage(pathname)
                    ? "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] transition-all duration-200 border-2",
              scrolled || !isHeroPage(pathname)
                ? "bg-foreground text-background border-foreground hover:bg-transparent hover:text-foreground"
                : "bg-primary-foreground text-primary border-primary-foreground hover:bg-transparent hover:text-primary-foreground"
            )}
          >
            Let&apos;s Talk
            <ArrowUpRight size={14} strokeWidth={3} />
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "md:hidden flex items-center justify-center w-10 h-10 border-2 transition-colors duration-200",
                scrolled || !isHeroPage(pathname)
                  ? "text-foreground border-foreground hover:bg-foreground hover:text-background"
                  : "text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              )}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background px-0 border-l-4 border-foreground rounded-none">
            <SheetHeader className="px-6 pb-4 border-b-4 border-foreground">
              <SheetTitle className="text-left text-xs font-black uppercase tracking-[0.2em] text-foreground">
                Navigation
              </SheetTitle>
            </SheetHeader>

            <ul className="flex flex-col py-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.1em] transition-colors duration-150 border-b-2 border-foreground/10",
                      isActive(href)
                        ? "text-background bg-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/30"
                    )}
                  >
                    {isActive(href) && (
                      <span className="w-2 h-2 bg-accent" />
                    )}
                    {!isActive(href) && <span className="w-2" />}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-6 pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-background text-xs font-black uppercase tracking-[0.15em] border-4 border-foreground hover:bg-transparent hover:text-foreground transition-colors duration-200"
              >
                Let&apos;s Talk
                <ArrowUpRight size={14} strokeWidth={3} />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

function isHeroPage(pathname: string) {
  return pathname === "/";
}