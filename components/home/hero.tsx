"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for the text elements
      gsap.from(".hero-text", {
        y: 30, // Sliding in from below, but NOT on hover
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // Smooth fade-in for the right-side graphics
      gsap.from(graphicRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[linear-gradient(105deg,#002147_60%,#d2b48c_60%)] max-md:bg-[linear-gradient(160deg,#002147_65%,#d2b48c_65%)]"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between w-full z-10">
        
        {/* Left Content Column */}
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col space-y-6 text-tan pt-20 md:pt-0">
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-tight">
            Muztahid <br /> Rahman
          </h1>
          
          <p className="hero-text text-lg md:text-xl max-w-lg font-sans text-tan/90 font-light">
            Architecting Scalable Web Platforms & Autonomous Systems.
          </p>

          <div className="hero-text flex items-center gap-4 pt-4 border-t border-tan/20 w-max">
            <span className="text-4xl font-serif">01</span>
            <div className="flex flex-col text-sm uppercase tracking-widest font-semibold">
              <span>Engineering</span>
              <span>Niches</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="hero-text flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-tan text-oxford font-medium rounded-md transition-colors duration-300 hover:bg-[#bca07c]">
              Explore My Work
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-tan text-tan font-medium rounded-md transition-colors duration-300 hover:bg-tan/10">
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        {/* Right Graphic/Tech Stack Column */}
        <div 
          ref={graphicRef} 
          className="w-full md:w-1/2 flex justify-center md:justify-end mt-16 md:mt-0"
        >
          {/* Conceptual Tech Stack Visual */}
          <div className="relative w-full max-w-md aspect-square rounded-2xl bg-tan/20 backdrop-blur-sm border border-oxford/10 p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-oxford font-serif text-3xl">Project Universe</h3>
              <p className="text-oxford/80 font-sans text-sm">
                Bridging Next.js enterprise architecture with ROS2 autonomous robotics.
              </p>
            </div>
            
            {/* Abstract representation of stack - can be replaced with actual SVG later */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg bg-oxford/5 flex items-center justify-center border border-oxford/20">
                <span className="font-bold text-oxford">Web</span>
              </div>
              <div className="aspect-square rounded-lg bg-oxford/5 flex items-center justify-center border border-oxford/20">
                <span className="font-bold text-oxford">Autonomy</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}