// ─── Project types ───

export type ProjectCategory = "all" | "software" | "hardware";

export interface ProjectStack {
  name: string;
  color?: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  type: "spotlight" | "bento";
  description: string;
  longDescription: string;
  challenge: ProjectChallenge;
  solution: ProjectChallenge;
  stack: ProjectStack[];
  codeSnippet?: CodeSnippet;
  workflowSteps?: WorkflowStep[];
  githubUrl?: string;
  liveUrl?: string;
  keyMetrics?: { label: string; value: string }[];
  features?: string[];
  gallery?: string[];
  year: string;
  role: string;
  duration: string;
  sortOrder?: number;
}

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

// ─── Experience types ───

export interface ExperienceEntry {
  slug: string;
  role: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
  icon: string;
  side: "left" | "right";
  sortOrder: number;
}

// ─── Skill types ───

export interface SkillCategory {
  slug: string;
  title: string;
  icon: string;
  skills: string[];
  sortOrder: number;
}

// ─── Site Settings types ───

export interface SiteSettings {
  name: string;
  title: string;
  siteDescription: string;
  heroTagline: string;
  heroSubtitle: string;
  philosophyQuote: string;
  philosophyAttribution: string;
  [key: string]: unknown;
}

// ─── Metrics types ───

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
}

export interface MetricsData {
  items: MetricItem[];
}

// ─── Education types ───

export interface EducationData {
  degree: string;
  university: string;
  status: string;
  degreeDescription: string;
  coursework: string[];
  achievements: string[];
}

// ─── Featured Cases types ───

export interface FeaturedCase {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: "primary" | "secondary";
}

export interface FeaturedCasesData {
  cases: FeaturedCase[];
}

// ─── Project Showcase types ───

export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: string;
  span: string;
  metricValue: string;
  metricLabel: string;
}

export interface ProjectShowcaseData {
  projects: ShowcaseProject[];
}

// ─── Prototyping Steps types ───

export interface PrototypingStepsData {
  steps: WorkflowStep[];
}
