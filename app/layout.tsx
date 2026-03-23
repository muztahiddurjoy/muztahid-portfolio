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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Suppress hydration warnings if you add next-themes for dark mode later
      suppressHydrationWarning 
      className={cn(
        "h-full antialiased", 
        inter.variable, 
        geistMono.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}