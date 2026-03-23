"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MathBlock, CodeCompare, TLDRBox } from "./academic-explainers";

gsap.registerPlugin(ScrollTrigger);

export default function ExplainerShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".explainer-reveal", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="explainer-reveal mb-12">
          <span className="font-script text-accent text-lg mb-2 block">components</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-4">
            ARTICLE COMPONENTS PREVIEW
          </h2>
          <p className="text-foreground/50 max-w-xl font-mono text-xs tracking-[0.15em] uppercase">
            Specialized components for breaking down complex academic
            concepts — the building blocks inside every research log.
          </p>
        </div>

        <div className="explainer-reveal max-w-4xl">
          <TLDRBox>
            A hash table achieves <strong>O(1)</strong> average-case lookups by
            mapping keys through a hash function to array indices. When collisions
            occur (two keys mapping to the same index), we resolve them via
            chaining or open addressing. The load factor (n/m) determines when to
            resize.
          </TLDRBox>

          <MathBlock label="Time Complexity Analysis">
{`Average case (uniform hashing assumption):
  Search:  O(1 + α)  where α = n/m (load factor)
  Insert:  O(1)      amortized (with dynamic resizing)
  Delete:  O(1 + α)

Worst case (all keys collide):
  Search:  O(n)
  Insert:  O(n)
  Delete:  O(n)

Load factor threshold for resize: α > 0.75
New capacity: 2m (double the bucket array)`}
          </MathBlock>

          <CodeCompare
            standardLabel="Java HashMap"
            standardCode={`// Using Java's built-in HashMap
import java.util.HashMap;

HashMap<String, Integer> map
  = new HashMap<>();
map.put("courses", 42);
map.put("credits", 128);

int val = map.get("courses"); // 42
map.remove("credits");`}
            customLabel="Custom Hash Table"
            customCode={`// Built from scratch — separate chaining
public class HashTable<K, V> {
  private Node<K,V>[] buckets;
  private int size;
  private static final double LOAD = 0.75;

  private int hash(K key) {
    return (key.hashCode() & 0x7fffffff)
           % buckets.length;
  }

  public void put(K key, V value) {
    if ((double)size/buckets.length > LOAD)
      resize();
    int idx = hash(key);
    // chain at buckets[idx]...
  }
}`}
          />
        </div>
      </div>
    </section>
  );
}