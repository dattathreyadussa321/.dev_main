import {
  Rocket,
  Layers,
  GraduationCap,
  Users,
  Lightbulb,
  Palette,
  Server,
  Zap,
  RefreshCw,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: "saas",
    icon: Rocket,
    title: "SaaS Application Development",
    summary:
      "Multi-tenant SaaS platforms built for real business workflows — subscriptions, role-based access, billing, and dashboards that scale from first customer to thousands.",
    outcomes: [
      "Launch-ready product with auth, billing, and tenancy solved",
      "Architecture that scales without a rewrite",
      "Clear analytics on activation and retention",
    ],
    deliverables: ["Product architecture", "Multi-tenant data model", "Subscription billing", "Admin & user dashboards"],
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full-Stack Web Application Development",
    summary:
      "End-to-end web applications with modern frontends, robust APIs, and reliable databases — designed, built, tested, and shipped by one accountable team.",
    outcomes: [
      "One team owning frontend, backend, and database",
      "Typed, tested codebases your team can maintain",
      "Production deployments with CI/CD from day one",
    ],
    deliverables: ["Next.js/React frontends", "Node/Express APIs", "PostgreSQL data layers", "CI/CD pipelines"],
  },
  {
    id: "lms",
    icon: GraduationCap,
    title: "Custom LMS Development",
    summary:
      "Learning management systems built around how your institute actually teaches — courses, batches, live classes, assessments, certificates, and payments in one platform.",
    outcomes: [
      "A platform shaped by your teaching workflow, not a template",
      "Student, trainer, and admin roles handled properly",
      "Owned infrastructure instead of per-seat license fees",
    ],
    deliverables: ["Course & batch management", "Assessments & certificates", "Live + recorded classes", "Payment integration"],
  },
  {
    id: "crm",
    icon: Users,
    title: "Custom CRM Development",
    summary:
      "CRM systems tuned to education and services businesses — enquiry capture, admissions pipelines, counsellor workflows, follow-ups, and revenue visibility.",
    outcomes: [
      "Every enquiry tracked from first touch to admission",
      "Counsellors working from one pipeline, not spreadsheets",
      "Management dashboards with real conversion numbers",
    ],
    deliverables: ["Lead & pipeline management", "Counsellor dashboards", "Follow-up automation", "Reports & analytics"],
  },
  {
    id: "edtech",
    icon: Lightbulb,
    title: "EdTech Product Development",
    summary:
      "Product engineering for education businesses — from online academies and assessment engines to full learning ecosystems with mobile-first experiences.",
    outcomes: [
      "Product decisions informed by real EdTech operating experience",
      "Learning experiences students actually complete",
      "Platforms ready for institutional scale",
    ],
    deliverables: ["Product strategy & roadmap", "Learning platform builds", "Assessment systems", "Mobile-responsive experiences"],
  },
  {
    id: "uiux",
    icon: Palette,
    title: "UI/UX Design & Frontend Engineering",
    summary:
      "Interfaces that look premium and ship as production code — design systems, prototypes, and pixel-perfect React frontends from the same team.",
    outcomes: [
      "Design and engineering aligned from the first screen",
      "A reusable design system, not one-off mockups",
      "Accessible, responsive UI verified on real devices",
    ],
    deliverables: ["UX research & flows", "Design systems", "Interactive prototypes", "Production React frontends"],
  },
  {
    id: "backend",
    icon: Server,
    title: "API & Backend Development",
    summary:
      "Secure, well-documented APIs and backend services — authentication, integrations, background jobs, and data pipelines built for reliability.",
    outcomes: [
      "APIs your frontend and partner teams can trust",
      "Security and validation handled at every boundary",
      "Documentation that makes onboarding fast",
    ],
    deliverables: ["REST/GraphQL APIs", "Auth & RBAC", "Third-party integrations", "Background jobs & queues"],
  },
  {
    id: "mvp",
    icon: Zap,
    title: "MVP Development",
    summary:
      "Validate your idea fast with a focused MVP — scoped to what proves the business case, built on foundations you won't have to throw away.",
    outcomes: [
      "Working product in weeks, not quarters",
      "Scope ruthlessly focused on validation",
      "A codebase ready to grow past the MVP stage",
    ],
    deliverables: ["Scope & roadmap workshop", "Clickable prototype", "Production MVP build", "Launch & iteration support"],
  },
  {
    id: "modernization",
    icon: RefreshCw,
    title: "Product Modernization",
    summary:
      "Rebuild aging platforms on modern stacks — migrate legacy PHP/WordPress/jQuery systems to Next.js, React, and PostgreSQL without losing your data or users.",
    outcomes: [
      "Faster, safer platform without a risky big-bang rewrite",
      "Data migrated and verified, users uninterrupted",
      "A stack today's engineers want to work on",
    ],
    deliverables: ["Legacy audit", "Incremental migration plan", "Data migration", "Modern rebuild"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Deployment & Maintenance",
    summary:
      "Production infrastructure, monitoring, and ongoing care — Docker, CI/CD, backups, and the maintenance retainers that keep platforms healthy.",
    outcomes: [
      "Deployments that are boring — in the best way",
      "Monitoring and alerts before users notice issues",
      "A long-term partner, not a handover-and-disappear vendor",
    ],
    deliverables: ["Docker & CI/CD setup", "Cloud hosting", "Monitoring & backups", "Maintenance retainers"],
  },
];
