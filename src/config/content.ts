/** Shared marketing content: process, differentiators, stats, FAQs, form options. */

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map your business workflow, users, and success metrics before any code is written. You get a clear scope and honest effort estimates.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes, UI design, and a clickable prototype — so you see and approve the product experience before development begins.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Weekly demo-driven sprints with a typed, tested codebase. You watch the product grow in a staging environment, not a slide deck.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Production deployment with monitoring, backups, and performance verification. We launch with you, not at you.",
  },
  {
    step: "05",
    title: "Scale",
    description:
      "Post-launch iteration, feature roadmaps, and maintenance retainers — a long-term engineering partner as you grow.",
  },
] as const;

export const whyUs = [
  {
    title: "We run an academy on our own platforms",
    description:
      "Our LMS and CRM thinking comes from operating a real training business — we build education software we'd use ourselves.",
  },
  {
    title: "Product engineering mindset",
    description:
      "We think in user outcomes and business metrics, not billable features. Every sprint maps to something your users will feel.",
  },
  {
    title: "Consulting + training + innovation",
    description:
      "One team that ships client platforms, trains engineers on real workflows, and runs innovation projects like Agri Rover. That mix keeps our practice sharp.",
  },
  {
    title: "Production-ready, not demo-ready",
    description:
      "Typed code, validation at every boundary, monitoring, and docs. The version we hand over is the version that runs your business.",
  },
] as const;

export const stats = [
  { value: 30, suffix: "+", label: "Programs & training tracks" },
  { value: 10, suffix: "+", label: "Platform builds & engagements" },
  { value: 5, suffix: "+", label: "Industries served" },
  { value: 100, suffix: "%", label: "Project-based learning" },
] as const;

export const trustPoints = [
  "Production-grade code, typed and tested",
  "Transparent weekly demos",
  "EdTech domain depth",
  "Long-term maintenance partners",
] as const;

export const faqs = [
  {
    question: "What does Patashala.Dev actually do?",
    answer:
      "Three things, deliberately connected: we build production software (SaaS, LMS, CRM, full-stack platforms) for clients; we run practical, project-based software training; and we invest in innovation projects like Agri Rover. Each strengthens the others.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Startups validating products, education businesses and training institutes that need LMS/CRM platforms, enterprises modernizing legacy systems, and AgriTech innovators. If you need reliable software and a team that explains its decisions, we're a fit.",
  },
  {
    question: "How do engagements usually start?",
    answer:
      "With a free consultation call. We understand your goals, give you an honest read on scope and budget, and propose a path — usually a discovery sprint or a focused MVP. No obligation, no pressure.",
  },
  {
    question: "Do you take over existing codebases?",
    answer:
      "Yes. Product modernization is a core service. We audit your current system, propose an incremental migration plan, and rebuild without a risky big-bang rewrite.",
  },
  {
    question: "What makes your training different?",
    answer:
      "It's run by engineers who ship client platforms during the day. You learn by building real projects inside real workflows — Git, code review, deployment — with interview and job-readiness support built in.",
  },
  {
    question: "What is Agri Rover?",
    answer:
      "Agri Rover is our in-house AgriTech innovation project — a rover-based platform designed for field monitoring and data collection, built with farmer-first design principles. It represents our long-term commitment to applying software engineering to agriculture.",
  },
] as const;

export const serviceInterestOptions = [
  "SaaS Application Development",
  "Full-Stack Web App Development",
  "Custom LMS Development",
  "Custom CRM Development",
  "EdTech Product Development",
  "UI/UX Design & Frontend",
  "API / Backend Development",
  "MVP Development",
  "Product Modernization",
  "Cloud Deployment & Maintenance",
  "Software Training Programs",
  "AgriTech / Agri Rover",
  "Other",
] as const;

export const budgetOptions = [
  "Under ₹1 Lakh",
  "₹1–3 Lakhs",
  "₹3–8 Lakhs",
  "₹8–20 Lakhs",
  "₹20 Lakhs+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "ASAP (within a month)",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Just exploring",
] as const;
