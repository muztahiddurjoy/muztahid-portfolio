import path from "path";
import fs from "fs";
import type {
  Project,
  JournalEntry,
  ExperienceEntry,
  SkillCategory,
  SiteSettings,
  MetricsData,
  EducationData,
  FeaturedCasesData,
  ProjectShowcaseData,
  WorkflowStep,
} from "./types";

// Re-export all types
export type {
  Project,
  ProjectCategory,
  ProjectStack,
  ProjectChallenge,
  WorkflowStep,
  CodeSnippet,
  JournalEntry,
  LogCategory,
  ExperienceEntry,
  SkillCategory,
} from "./types";
export { categories } from "./types";

const contentDir = path.join(process.cwd(), "content");

function readJSON<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

// ─── Collection Readers ───

export function getProjects(): Project[] {
  const projects = readJSON<Project[]>("projects.json");
  return projects.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

export function getProject(slug: string): Project | null {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getJournalEntries(): JournalEntry[] {
  const entries = readJSON<JournalEntry[]>("journal.json");
  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getExperiences(): ExperienceEntry[] {
  const entries = readJSON<ExperienceEntry[]>("experiences.json");
  return entries.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getSkills(): SkillCategory[] {
  const entries = readJSON<SkillCategory[]>("skills.json");
  return entries.sort((a, b) => a.sortOrder - b.sortOrder);
}

// ─── Singleton Readers ───

export function getSiteSettings(): SiteSettings {
  return readJSON<SiteSettings>("site-settings.json");
}

export function getMetrics(): MetricsData {
  return readJSON<MetricsData>("metrics.json");
}

export function getEducation(): EducationData {
  return readJSON<EducationData>("education.json");
}

export function getFeaturedCases(): FeaturedCasesData {
  return readJSON<FeaturedCasesData>("featured-cases.json");
}

export function getProjectShowcase(): ProjectShowcaseData {
  return readJSON<ProjectShowcaseData>("project-showcase.json");
}

export function getPrototypingSteps(): WorkflowStep[] {
  const data = readJSON<{ steps: WorkflowStep[] }>("prototyping-steps.json");
  return data.steps;
}
