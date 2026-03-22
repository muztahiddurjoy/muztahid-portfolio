// ─── Project types (keep backward-compatible with existing components) ───

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
}

// ─── Journal types ───

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
