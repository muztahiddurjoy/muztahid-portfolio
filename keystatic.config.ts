import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "longDescription" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Software", value: "software" },
            { label: "Hardware", value: "hardware" },
          ],
          defaultValue: "software",
        }),
        type: fields.select({
          label: "Display Type",
          options: [
            { label: "Spotlight (Case Study)", value: "spotlight" },
            { label: "Bento (Grid Card)", value: "bento" },
          ],
          defaultValue: "bento",
        }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
        }),
        longDescription: fields.markdoc({
          label: "Long Description",
        }),
        challengeTitle: fields.text({
          label: "Challenge Title",
          defaultValue: "The Challenge",
        }),
        challengeDescription: fields.text({
          label: "Challenge Description",
          multiline: true,
        }),
        solutionTitle: fields.text({
          label: "Solution Title",
          defaultValue: "The Solution",
        }),
        solutionDescription: fields.text({
          label: "Solution Description",
          multiline: true,
        }),
        stack: fields.array(
          fields.object({
            name: fields.text({ label: "Technology Name" }),
            color: fields.text({ label: "Color (optional)" }),
          }),
          {
            label: "Tech Stack",
            itemLabel: (props) => props.fields.name.value || "Technology",
          }
        ),
        codeSnippetFilename: fields.text({
          label: "Code Snippet Filename",
        }),
        codeSnippetLanguage: fields.text({
          label: "Code Snippet Language",
        }),
        codeSnippetCode: fields.text({
          label: "Code Snippet Code",
          multiline: true,
        }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        liveUrl: fields.url({ label: "Live URL" }),
        keyMetrics: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Key Metrics",
            itemLabel: (props) => props.fields.label.value || "Metric",
          }
        ),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
          itemLabel: (props) => props.value || "Feature",
        }),
        year: fields.text({ label: "Year" }),
        role: fields.text({ label: "Role" }),
        duration: fields.text({ label: "Duration" }),
        sortOrder: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
          description: "Lower numbers appear first",
        }),
      },
    }),

    journal: collection({
      label: "Journal Entries",
      slugField: "title",
      path: "content/journal/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
        }),
        date: fields.date({ label: "Date" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Core CS & Algorithms", value: "cs-algorithms" },
            { label: "Cloud Architecture", value: "cloud-architecture" },
            { label: "Autonomy (ROS2)", value: "autonomy-ros2" },
            { label: "Analog Mechanics", value: "analog-mechanics" },
          ],
          defaultValue: "cs-algorithms",
        }),
        readTime: fields.text({ label: "Read Time", defaultValue: "10 min" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        featured: fields.checkbox({
          label: "Featured",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),

    experiences: collection({
      label: "Experiences",
      slugField: "role",
      path: "content/experiences/*",
      schema: {
        role: fields.slug({ name: { label: "Role" } }),
        org: fields.text({ label: "Organization" }),
        period: fields.text({ label: "Period" }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "Briefcase", value: "Briefcase" },
            { label: "Rocket", value: "Rocket" },
            { label: "Lightbulb", value: "Lightbulb" },
            { label: "GraduationCap", value: "GraduationCap" },
            { label: "Code", value: "Code" },
            { label: "Cpu", value: "Cpu" },
          ],
          defaultValue: "Briefcase",
        }),
        side: fields.select({
          label: "Timeline Side",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
          defaultValue: "left",
        }),
        sortOrder: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),

    skills: collection({
      label: "Skill Categories",
      slugField: "title",
      path: "content/skills/*",
      schema: {
        title: fields.slug({ name: { label: "Category Title" } }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "Globe (Web)", value: "Globe" },
            { label: "Cpu (Hardware)", value: "Cpu" },
            { label: "Box (Prototyping)", value: "Box" },
            { label: "Database", value: "Database" },
            { label: "Code", value: "Code" },
          ],
          defaultValue: "Globe",
        }),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills",
          itemLabel: (props) => props.value || "Skill",
        }),
        sortOrder: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),
  },

  singletons: {
    siteSettings: singleton({
      label: "Site Settings",
      path: "content/site-settings",
      schema: {
        name: fields.text({ label: "Name", defaultValue: "Muztahid Rahman" }),
        title: fields.text({
          label: "Site Title",
          defaultValue: "Muztahid Rahman | Software & Robotics Engineer",
        }),
        siteDescription: fields.text({
          label: "Site Description",
          multiline: true,
          defaultValue:
            "Portfolio showcasing scalable enterprise web architectures and autonomous robotic systems.",
        }),
        heroTagline: fields.text({
          label: "Hero Tagline",
          multiline: true,
        }),
        heroSubtitle: fields.text({
          label: "Hero Subtitle",
          multiline: true,
        }),
        philosophyQuote: fields.text({
          label: "Philosophy Quote",
          multiline: true,
        }),
        philosophyAttribution: fields.text({
          label: "Philosophy Attribution",
        }),
      },
    }),

    metrics: singleton({
      label: "Portfolio Metrics",
      path: "content/metrics",
      schema: {
        items: fields.array(
          fields.object({
            value: fields.integer({ label: "Value" }),
            suffix: fields.text({ label: "Suffix (e.g. +)" }),
            label: fields.text({ label: "Label" }),
          }),
          {
            label: "Metrics",
            itemLabel: (props) => props.fields.label.value || "Metric",
          }
        ),
      },
    }),

    education: singleton({
      label: "Education",
      path: "content/education",
      schema: {
        degree: fields.text({
          label: "Degree",
          defaultValue: "B.Sc. in Computer Science",
        }),
        university: fields.text({
          label: "University",
          defaultValue: "BRAC University",
        }),
        status: fields.text({
          label: "Status",
          defaultValue: "Ongoing",
        }),
        degreeDescription: fields.text({
          label: "Degree Description",
          multiline: true,
        }),
        coursework: fields.array(fields.text({ label: "Course" }), {
          label: "Relevant Coursework",
          itemLabel: (props) => props.value || "Course",
        }),
        achievements: fields.array(fields.text({ label: "Achievement" }), {
          label: "Achievements",
          itemLabel: (props) => props.value || "Achievement",
        }),
      },
    }),

    featuredCases: singleton({
      label: "Featured Case Studies (Home)",
      path: "content/featured-cases",
      schema: {
        cases: fields.array(
          fields.object({
            id: fields.text({ label: "ID" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({
              label: "Description",
              multiline: true,
            }),
            tags: fields.array(fields.text({ label: "Tag" }), {
              label: "Tags",
              itemLabel: (props) => props.value || "Tag",
            }),
            accent: fields.select({
              label: "Accent Color",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
              ],
              defaultValue: "primary",
            }),
          }),
          {
            label: "Cases",
            itemLabel: (props) => props.fields.title.value || "Case",
          }
        ),
      },
    }),

    projectShowcase: singleton({
      label: "Project Showcase (Home)",
      path: "content/project-showcase",
      schema: {
        projects: fields.array(
          fields.object({
            id: fields.text({ label: "ID" }),
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle" }),
            description: fields.text({
              label: "Description",
              multiline: true,
            }),
            tags: fields.array(fields.text({ label: "Tag" }), {
              label: "Tags",
              itemLabel: (props) => props.value || "Tag",
            }),
            icon: fields.select({
              label: "Icon",
              options: [
                { label: "ShoppingCart", value: "ShoppingCart" },
                { label: "Navigation", value: "Navigation" },
                { label: "Printer", value: "Printer" },
                { label: "Bot", value: "Bot" },
                { label: "Satellite", value: "Satellite" },
                { label: "Database", value: "Database" },
                { label: "Code", value: "Code" },
                { label: "Cpu", value: "Cpu" },
              ],
              defaultValue: "Code",
            }),
            span: fields.select({
              label: "Grid Span",
              options: [
                { label: "Normal (1 column)", value: "" },
                { label: "Wide (2 columns)", value: "md:col-span-2" },
              ],
              defaultValue: "",
            }),
            metricValue: fields.text({ label: "Metric Value" }),
            metricLabel: fields.text({ label: "Metric Label" }),
          }),
          {
            label: "Projects",
            itemLabel: (props) => props.fields.title.value || "Project",
          }
        ),
      },
    }),

    prototypingSteps: singleton({
      label: "Prototyping Workflow Steps",
      path: "content/prototyping-steps",
      schema: {
        steps: fields.array(
          fields.object({
            step: fields.integer({ label: "Step Number" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({
              label: "Description",
              multiline: true,
            }),
          }),
          {
            label: "Steps",
            itemLabel: (props) =>
              props.fields.title.value
                ? `Step ${props.fields.step.value}: ${props.fields.title.value}`
                : "Step",
          }
        ),
      },
    }),
  },
});
