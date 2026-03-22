export type LogCategory =
  | "all"
  | "cs-algorithms"
  | "cloud-architecture"
  | "autonomy-ros2"
  | "analog-mechanics";

export interface JournalEntry {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: LogCategory;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export const categories: { id: LogCategory; label: string }[] = [
  { id: "all", label: "All Logs" },
  { id: "cs-algorithms", label: "Core CS & Algorithms" },
  { id: "cloud-architecture", label: "Cloud Architecture" },
  { id: "autonomy-ros2", label: "Autonomy (ROS2)" },
  { id: "analog-mechanics", label: "Analog Mechanics" },
];

export const journalEntries: JournalEntry[] = [
  {
    slug: "demystifying-hash-tables-java",
    title: "Demystifying Data Structures: Building Hash Tables in Java",
    excerpt:
      "A deep dive into collision resolution, load factors, and calculating exact O(1) vs O(n) time complexities from scratch, bridging academic theory with production logic.",
    date: "2026-03-15",
    category: "cs-algorithms",
    readTime: "18 min",
    tags: ["Java", "Hash Tables", "Time Complexity", "Data Structures"],
    featured: true,
  },
  {
    slug: "aws-ses-production-access",
    title:
      "AWS SES Production Access: Navigating DNS and Identity Verification for zf-emart",
    excerpt:
      "A detailed walkthrough of escaping the SES sandbox — configuring SPF, DKIM, and DMARC records, handling bounce/complaint notifications, and automating identity verification for a production e-commerce mailer.",
    date: "2026-02-28",
    category: "cloud-architecture",
    readTime: "12 min",
    tags: ["AWS SES", "DNS", "DKIM", "Production"],
  },
  {
    slug: "stm32-sensor-polling",
    title:
      "STM32 Microcontrollers: High-Frequency Sensor Polling for Line-Following Robots",
    excerpt:
      "Exploring interrupt-driven vs. polling-based approaches on ARM Cortex-M4 for real-time IR sensor arrays, with oscilloscope measurements and timing analysis at 10kHz+ sample rates.",
    date: "2026-02-10",
    category: "autonomy-ros2",
    readTime: "15 min",
    tags: ["STM32", "Embedded C", "Sensors", "Real-Time"],
  },
  {
    slug: "mechanical-purity-w123",
    title:
      "The Mechanical Purity of the W123: What Software Engineers Can Learn from Vintage Mercedes",
    excerpt:
      "An essay on over-engineering, mechanical redundancy, and the philosophy of building systems that outlast their creators — drawing parallels between Daimler-Benz mechanical injection and fault-tolerant software design.",
    date: "2026-01-22",
    category: "analog-mechanics",
    readTime: "10 min",
    tags: ["Mercedes W123", "Engineering Philosophy", "Reliability"],
  },
  {
    slug: "binary-search-tree-balancing",
    title: "AVL Trees & Red-Black Trees: When O(log n) Actually Matters",
    excerpt:
      "Implementing self-balancing BSTs from scratch, proving rotation correctness with induction, and benchmarking insertion performance against Java's TreeMap under adversarial input patterns.",
    date: "2026-01-05",
    category: "cs-algorithms",
    readTime: "22 min",
    tags: ["AVL Trees", "Red-Black Trees", "Balancing", "Proofs"],
  },
  {
    slug: "ros2-slam-navigation",
    title: "ROS2 Nav2 Stack: Configuring SLAM for Unstructured Terrain",
    excerpt:
      "Tuning costmap parameters, integrating LiDAR point clouds with IMU data, and handling localization drift in GPS-denied environments during the BRACU Mongol-tori rover project.",
    date: "2025-12-18",
    category: "autonomy-ros2",
    readTime: "16 min",
    tags: ["ROS2", "SLAM", "Nav2", "LiDAR"],
  },
  {
    slug: "nextjs-aws-deployment-pipeline",
    title: "Building a Zero-Downtime CI/CD Pipeline: Next.js on AWS ECS",
    excerpt:
      "Architecting blue-green deployments with Fargate, implementing health checks, managing environment secrets with SSM Parameter Store, and automating rollbacks through CodePipeline.",
    date: "2025-12-01",
    category: "cloud-architecture",
    readTime: "14 min",
    tags: ["Next.js", "AWS ECS", "CI/CD", "Fargate"],
  },
];
