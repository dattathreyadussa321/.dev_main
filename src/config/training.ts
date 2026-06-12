import {
  Monitor,
  Server,
  Layers,
  Braces,
  Atom,
  ArrowRightLeft,
  Database,
  Palette,
  GitBranch,
  Hammer,
  BriefcaseBusiness,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export interface TrainingTrack {
  id: string;
  icon: LucideIcon;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  summary: string;
  topics: string[];
}

export const trainingTracks: TrainingTrack[] = [
  {
    id: "frontend",
    icon: Monitor,
    title: "Frontend Development",
    level: "Beginner",
    summary: "HTML, CSS, JavaScript, and React — taught by building real interfaces, not slideshows.",
    topics: ["Semantic HTML & modern CSS", "Responsive layouts", "JavaScript fundamentals", "React component patterns"],
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Development",
    level: "Intermediate",
    summary: "Node.js, Express, and PostgreSQL — design APIs, model data, and handle auth like a working engineer.",
    topics: ["Node.js & Express APIs", "PostgreSQL & data modeling", "Authentication & security", "Testing & error handling"],
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full-Stack Development",
    level: "All levels",
    summary: "The complete path: frontend, backend, database, and deployment — finishing with portfolio-grade projects.",
    topics: ["End-to-end project builds", "REST API integration", "Database design", "Production deployment"],
  },
  {
    id: "javascript",
    icon: Braces,
    title: "JavaScript Deep Dive",
    level: "Beginner",
    summary: "The language behind everything — closures, async, the event loop, and modern ES features, explained with code you write.",
    topics: ["Core language mechanics", "Async/await & promises", "DOM & browser APIs", "Modern ES syntax"],
  },
  {
    id: "react",
    icon: Atom,
    title: "React",
    level: "Intermediate",
    summary: "Component thinking, hooks, state management, and performance — the patterns production teams actually use.",
    topics: ["Hooks & custom hooks", "State management", "Data fetching patterns", "Performance & testing"],
  },
  {
    id: "nextjs",
    icon: ArrowRightLeft,
    title: "Next.js",
    level: "Advanced",
    summary: "Server components, routing, data fetching, SEO, and deployment — build the kind of apps companies hire for.",
    topics: ["App Router & server components", "Data fetching & caching", "SEO & metadata", "Production deployment"],
  },
  {
    id: "node",
    icon: Boxes,
    title: "Node.js & Express",
    level: "Intermediate",
    summary: "Server-side JavaScript from fundamentals to production APIs with middleware, validation, and security.",
    topics: ["Express routing & middleware", "Validation & error handling", "File handling & uploads", "API security"],
  },
  {
    id: "postgresql",
    icon: Database,
    title: "PostgreSQL",
    level: "Intermediate",
    summary: "Relational thinking, schema design, queries, and indexing — the database skills behind every serious backend.",
    topics: ["Schema design", "Joins & aggregations", "Indexes & performance", "ORMs (Prisma)"],
  },
  {
    id: "uiux",
    icon: Palette,
    title: "UI/UX Design",
    level: "Beginner",
    summary: "Design thinking, layout, typography, and Figma-to-code workflows for developers who want design sense.",
    topics: ["Design principles", "Figma workflows", "Design systems", "Handoff to code"],
  },
  {
    id: "git-deploy",
    icon: GitBranch,
    title: "Git & Deployment",
    level: "All levels",
    summary: "Version control, collaboration workflows, CI/CD, and shipping to real hosting — skills every team expects on day one.",
    topics: ["Git & GitHub workflows", "Branching & code review", "CI/CD basics", "Cloud deployment"],
  },
  {
    id: "projects",
    icon: Hammer,
    title: "Real-World Project Building",
    level: "All levels",
    summary: "Build complete products — an LMS module, a CRM pipeline, a SaaS dashboard — with code review from working engineers.",
    topics: ["Production project briefs", "Code reviews", "Team workflows", "Portfolio polish"],
  },
  {
    id: "career",
    icon: BriefcaseBusiness,
    title: "Interview & Job-Readiness",
    level: "All levels",
    summary: "Resume engineering, portfolio review, mock interviews, and the practical prep that converts skills into offers.",
    topics: ["Technical interview prep", "Portfolio & resume review", "Mock interviews", "Communication skills"],
  },
];

export const trainingPrinciples = [
  {
    title: "Learning by building, not just watching",
    description:
      "Every track is project-driven. You write code from the first session and finish with work you can show in interviews.",
  },
  {
    title: "Industry workflows from day one",
    description:
      "Git, code review, tickets, deployment — you learn inside the same workflows our consulting team uses on client projects.",
  },
  {
    title: "Taught by working engineers",
    description:
      "Your mentors build production SaaS, LMS, and CRM platforms during the day. Their answers come from shipped systems, not slides.",
  },
  {
    title: "Job-readiness built in",
    description:
      "Interview prep, portfolio reviews, and communication practice are part of the program — not an afterthought.",
  },
] as const;
