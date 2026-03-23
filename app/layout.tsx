import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Inter is configured as a variable font and mapped to --font-sans 
// to perfectly sync with your global.css setup.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Keeping a mono font just in case you want to display code snippets later
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muztahid Rahman | Software & Robotics Engineer",
  description: "Portfolio showcasing scalable enterprise web architectures and autonomous robotic systems.",
};

// This script runs synchronously before the browser paints the UI.
// It prevents the "flash of unstyled content" (FOUC) when reloading.
const themeScript = `
  (function() {
    try {
      const themes = [
        'theme-default', // Triggers the :root Oxford Blue
        'theme-vanilla-coffee', 
        'theme-champagne-chocolate', 
        'theme-rose-maroon', 
        'theme-almond-coffee', 
        'theme-smoke-wine', 
        'theme-milk-sage', 
        'theme-offwhite-olive', 
        'theme-cream-indigo',
        'theme-amber-cocoa',
        'theme-floral-olive',
        'theme-butter-espresso'
      ];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      if (randomTheme !== 'theme-default') {
        document.documentElement.classList.add(randomTheme);
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // Prevents Next.js from throwing errors when the script modifies the HTML class
      className={cn(
        "h-full antialiased", 
        inter.variable, 
        geistMono.variable
      )}
    >
      <head>
        {/* Inject the blocking script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}