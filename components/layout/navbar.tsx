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
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
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
              "flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black tracking-tight transition-colors duration-300",
              scrolled || !isHeroPage(pathname)
                ? "bg-primary text-primary-foreground"
                : "bg-primary-foreground text-primary"
            )}
          >
            MR
          </span>
          <span
            className={cn(
              "hidden sm:block text-sm font-bold tracking-wide transition-colors duration-300",
              scrolled || !isHeroPage(pathname)
                ? "text-foreground"
                : "text-primary-foreground"
            )}
          >
            Muztahid
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                  "after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:rounded-full after:transition-opacity after:duration-200",
                  isActive(href)
                    ? scrolled || !isHeroPage(pathname)
                      ? "text-foreground after:bg-primary after:opacity-100"
                      : "text-primary-foreground after:bg-primary-foreground after:opacity-100"
                    : scrolled || !isHeroPage(pathname)
                    ? "text-muted-foreground hover:text-foreground after:opacity-0"
                    : "text-primary-foreground/70 hover:text-primary-foreground after:opacity-0"
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
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
              scrolled || !isHeroPage(pathname)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            )}
          >
            Let&apos;s Talk
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200",
                scrolled || !isHeroPage(pathname)
                  ? "text-foreground hover:bg-muted"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              )}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background px-0">
            <SheetHeader className="px-6 pb-4 border-b border-border">
              <SheetTitle className="text-left text-base font-black tracking-tight text-foreground">
                Navigation
              </SheetTitle>
            </SheetHeader>

            <ul className="flex flex-col py-4">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors duration-150",
                      isActive(href)
                        ? "text-foreground bg-muted font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {isActive(href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    {!isActive(href) && <span className="w-1.5" />}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-6 pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Let&apos;s Talk
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

/** True when the user is on a page that starts with the Oxford-blue hero */
function isHeroPage(pathname: string) {
  return pathname === "/";
}
