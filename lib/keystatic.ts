import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";
import type {
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
} from "./keystatic-types";

// Re-export all types and values from keystatic-types
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
};
export { categories } from "./keystatic-types";

export const reader = createReader(process.cwd(), keystaticConfig);

// ─── Readers ───

export async function getProjects(): Promise<Project[]> {
  const slugs = await reader.collections.projects.list();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.projects.read(slug, {
        resolveLinkedFiles: true,
      });
      if (!entry) return null;

      const longDesc =
        typeof entry.longDescription === "function"
          ? ""
          : Array.isArray(entry.longDescription)
            ? (entry.longDescription as { children?: { text?: string }[] }[])
                .map((node) =>
                  (node.children || []).map((c) => c.text || "").join("")
                )
                .join("\n")
            : String(entry.longDescription || "");

      const project: Project = {
        slug,
        title: entry.title as string,
        subtitle: entry.subtitle,
        category: entry.category as "software" | "hardware",
        type: entry.type as "spotlight" | "bento",
        description: entry.description,
        longDescription: longDesc,
        challenge: {
          title: entry.challengeTitle,
          description: entry.challengeDescription,
        },
        solution: {
          title: entry.solutionTitle,
          description: entry.solutionDescription,
        },
        stack: entry.stack.map((s) => ({
          name: s.name,
          color: s.color || undefined,
        })),
        codeSnippet:
          entry.codeSnippetFilename && entry.codeSnippetCode
            ? {
                filename: entry.codeSnippetFilename,
                language: entry.codeSnippetLanguage || "",
                code: entry.codeSnippetCode,
              }
            : undefined,
        githubUrl: entry.githubUrl || undefined,
        liveUrl: entry.liveUrl || undefined,
        keyMetrics: entry.keyMetrics.length > 0 ? [...entry.keyMetrics] : undefined,
        features: entry.features.length > 0 ? [...entry.features] : undefined,
        year: entry.year,
        role: entry.role,
        duration: entry.duration,
      };

      return { project, sortOrder: entry.sortOrder ?? 999 };
    })
  );

  return projects
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((p) => p.project);
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const slugs = await reader.collections.journal.list();
  const results: JournalEntry[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.journal.read(slug);
    if (!entry) continue;
    results.push({
      slug,
      title: entry.title as string,
      excerpt: entry.excerpt,
      date: entry.date || "",
      category: entry.category as LogCategory,
      readTime: entry.readTime,
      tags: [...entry.tags],
      featured: entry.featured || false,
    });
  }
  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getExperiences(): Promise<ExperienceEntry[]> {
  const slugs = await reader.collections.experiences.list();
  const results: ExperienceEntry[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.experiences.read(slug);
    if (!entry) continue;
    results.push({
      slug,
      role: entry.role as string,
      org: entry.org,
      period: entry.period,
      description: entry.description,
      tags: [...entry.tags],
      icon: entry.icon as string,
      side: entry.side as "left" | "right",
      sortOrder: entry.sortOrder ?? 999,
    });
  }
  return results.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getSkills(): Promise<SkillCategory[]> {
  const slugs = await reader.collections.skills.list();
  const results: SkillCategory[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.skills.read(slug);
    if (!entry) continue;
    results.push({
      slug,
      title: entry.title as string,
      icon: entry.icon as string,
      skills: [...entry.skills],
      sortOrder: entry.sortOrder ?? 999,
    });
  }
  return results.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getSiteSettings() {
  return await reader.singletons.siteSettings.read();
}

export async function getMetrics() {
  return await reader.singletons.metrics.read();
}

export async function getEducation() {
  return await reader.singletons.education.read();
}

export async function getFeaturedCases() {
  return await reader.singletons.featuredCases.read();
}

export async function getProjectShowcase() {
  return await reader.singletons.projectShowcase.read();
}

export async function getPrototypingSteps(): Promise<WorkflowStep[]> {
  const data = await reader.singletons.prototypingSteps.read();
  if (!data) return [];
  return data.steps.map((s) => ({
    step: s.step ?? 0,
    title: s.title,
    description: s.description,
  }));
}
