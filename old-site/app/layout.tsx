import type { Metadata } from "next";
import { Inter, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muztahid Rahman (Muz) | Software, Robotics & Vintage Cars",
  description: "Chief Software Engineer at BOT Engineers & Appbaksho. BRACU CS student building scalable web architectures (Next.js, NestJS), autonomous robotic systems (ROS2), and obsessed with 3D printing and classic cars.",
  keywords: [
    "Muztahid Rahman", 
    "Muz", 
    "Software Engineer", 
    "Robotics", 
    "ROS2", 
    "Next.js", 
    "NestJS", 
    "BOT Engineers", 
    "Appbaksho", 
    "BRAC University", 
    "Vintage Cars", 
    "3D Printing"
  ],
  authors: [{ name: "Muztahid Rahman" }],
  creator: "Muztahid Rahman",
};

const themeScript = `
  (function() {
    try {
      const themes = [
        'theme-default',
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
      suppressHydrationWarning
      className={cn(
        "h-full antialiased", 
        inter.variable, 
        caveat.variable,
        geistMono.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}