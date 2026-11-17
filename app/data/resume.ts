/**
 * Everything on /resume comes from this file; name, role and email are shared
 * with the rest of the site through app.config.ts.
 *
 * The page and the downloadable PDF are two renderings of the same data, but
 * the PDF is a committed file: run `pnpm resume:pdf` after editing.
 */

export interface ResumeLink {
  /** Shown as written, so keep it readable on paper: "github.com/nei7". */
  label: string;
  href: string;
}

export interface ResumeEntry {
  /** Role, project name or degree. */
  title: string;
  /** Links the title: the project's own site or repository. */
  href?: string;
  /** Company, school or event, shown after the title. */
  org?: string;
  /** Links the company, school or event. */
  orgHref?: string;
  /** Free text: "Oct 2023 – Present", "2025". */
  period?: string;
  location?: string;
  summary?: string;
  bullets?: string[];
  /** Technologies, shown as one muted line. */
  tags?: string[];
}

export interface ResumeSection {
  title: string;
  entries: ResumeEntry[];
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface Resume {
  location?: string;
  links: ResumeLink[];
  summary: string;
  /** Rendered in this order; a section without entries is left out. Summaries up to ~110 characters stay on one line in the PDF. */
  sections: ResumeSection[];
  skills: ResumeSkillGroup[];
}

export const resume: Resume = {
  // e.g. "Kraków, Poland"
  location: "",

  links: [
    { label: "fszarek.dev", href: "https://fszarek.dev" },
    { label: "github.com/nei7", href: "https://github.com/nei7" },
  ],

  summary:
    "Computer Science student specializing in web development. Beyond shipping web apps with Nuxt and TypeScript, I keep exploring broader software engineering domains: backend services in Go, Kubernetes, Raspberry Pi clusters and Linux.",

  sections: [
    {
      title: "Experience",
      entries: [
        // {
        //   title: "Software Engineer Intern",
        //   org: "Company",
        //   orgHref: "https://example.com",
        //   period: "Jul 2026 – Sep 2026",
        //   location: "Remote",
        //   bullets: ["What you built and what it changed."],
        //   tags: ["TypeScript", "Vue"],
        // },
      ],
    },
    {
      title: "Projects",
      entries: [
        {
          title: "Quizit",
          href: "https://quizit.online",
          period: "2025 - Present",
          summary:
            "An online tool and Chrome extension that provides rapid answers and AI-driven solutions for school and platform quizzes. Serves 150k monthly visits and handles payments.",
          tags: ["Nuxt", "TypeScript", "Kubernetes", "Linux"],
        },
        {
          title: "Fire Activity Calendar API",
          href: "https://nullrunners.space",
          org: "NASA Space Apps Challenge",
          period: "Nov 2026",
          location: "Rzeszów",
          summary:
            "Backend of our team's entry: 26 years of NASA MODIS and VIIRS fire detections as one activity calendar.",
          tags: ["TypeScript", "Hono", "DuckDB", "OpenAPI"],
        },
        {
          title: "nuxt-notion",
          href: "https://github.com/nei7/nuxt-notion",
          period: "2025",
          summary:
            "Nuxt module that turns Notion databases into typed, cached collections with a full block renderer.",
          tags: ["Nuxt", "TypeScript", "Notion API"],
        },
        {
          title: "fszarek.dev",
          href: "https://github.com/nei7/website",
          period: "2026",
          summary:
            "Notion-backed portfolio and blog with GitHub sign-in, comments and first-party analytics on Cloudflare Workers.",
          tags: ["Nuxt", "Tailwind CSS", "Cloudflare Workers", "D1", "Notion API"],
        },
        {
          title: "ntube",
          href: "https://github.com/nei7/ntube",
          period: "2023",
          summary:
            "Work-in-progress video streaming backend: auth and user microservices on gRPC, PostgreSQL, Redis and Kafka.",
          tags: ["Go", "Kratos", "gRPC", "PostgreSQL", "Kafka", "OpenTelemetry"],
        },
        {
          title: "bank",
          href: "https://github.com/nei7/bank",
          period: "2022 - 2023",
          summary:
            "REST API for a bank: accounts and transfers on PostgreSQL, token auth, mocked-database tests in CI.",
          tags: ["Go", "Gin", "PostgreSQL", "sqlc", "Docker"],
        },
      ],
    },
    {
      title: "Education",
      entries: [
        {
          title: "Computer Science, 2nd year",
          org: "Rzeszów University of Technology",
          orgHref: "https://w.prz.edu.pl",
          period: "Oct 2025 - Present",
        },
        {
          title: "IT Technician (technik informatyk)",
          org: "ZSTiO Jarosław",
          orgHref: "https://zstiojar.edu.pl",
          period: "Sep 2020 - Apr 2025",
          summary:
            "Vocational qualifications INF.02 (computer systems and local networks) and INF.03 (web apps and databases).",
        },
      ],
    },
  ],

  skills: [
    { label: "Languages", items: ["TypeScript", "Go", "Java"] },
    { label: "Frontend", items: ["Vue", "Nuxt", "Tailwind CSS"] },
    { label: "Backend", items: ["Cloudflare Workers", "PostgreSQL", "SQLite / D1", "gRPC"] },
    { label: "Infrastructure", items: ["Kubernetes", "Docker", "Linux", "Nix", "GitHub Actions"] },
  ],
};
