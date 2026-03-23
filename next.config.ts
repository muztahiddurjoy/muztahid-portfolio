import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All pages use local JSON files via fs.readFileSync,
  // so Next.js will automatically prerender them as static HTML at build time.
  // This gives the fastest possible loading and best SEO.
};

export default nextConfig;
