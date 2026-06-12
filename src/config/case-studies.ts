export interface CaseStudy {
  id: string;
  type: "Solution Snapshot" | "Sample Engagement";
  category: string;
  title: string;
  challenge: string;
  approach: string;
  results: string[];
  stack: string[];
}

/**
 * Case studies are presented as anonymized engagement snapshots.
 * No client names are invented; each card is clearly labeled.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "lms-platform",
    type: "Solution Snapshot",
    category: "LMS Platform",
    title: "Advanced LMS for a multi-branch training institute",
    challenge:
      "A growing institute was running courses across spreadsheets, WhatsApp groups, and a generic video tool — with no single view of student progress, attendance, or fee status.",
    approach:
      "We designed and built a custom LMS with role-based dashboards for students, trainers, and admins; batch-wise live class scheduling; assignments with structured review; and integrated fee tracking with receipts.",
    results: [
      "One platform replacing four disconnected tools",
      "Batch operations and attendance handled without manual registers",
      "Owners gained real-time visibility into completion and revenue",
    ],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Razorpay-ready payments"],
  },
  {
    id: "crm-platform",
    type: "Solution Snapshot",
    category: "EdTech CRM",
    title: "Admissions CRM for an education business",
    challenge:
      "Enquiries arrived from ads, walk-ins, and referrals into separate notebooks and phones. Follow-ups were missed, and leadership had no reliable conversion numbers.",
    approach:
      "We built an admissions-focused CRM with automatic lead capture, a stage-wise pipeline, counsellor dashboards with due-today follow-ups, and source-wise conversion reporting.",
    results: [
      "Every enquiry tracked from first touch to admission decision",
      "Follow-up discipline enforced by reminders, not memory",
      "Leadership reviews driven by pipeline data instead of guesswork",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "WhatsApp-integration-ready"],
  },
  {
    id: "saas-application",
    type: "Sample Engagement",
    category: "SaaS Application",
    title: "Multi-tenant SaaS platform from MVP to paying users",
    challenge:
      "A founding team needed to validate a B2B product idea quickly — without building throwaway code they'd regret six months later.",
    approach:
      "We ran a scope workshop to cut the MVP to its proof points, then built a multi-tenant platform with subscription billing, role-based access, and usage analytics on a stack designed to grow.",
    results: [
      "MVP shipped on a foundation that survived past validation",
      "Tenancy, auth, and billing solved once — correctly",
      "Iteration cycles measured in days after launch",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe-ready billing"],
  },
  {
    id: "fullstack-webapp",
    type: "Sample Engagement",
    category: "Full-Stack Web App",
    title: "Legacy platform modernization to a modern stack",
    challenge:
      "A business-critical web application on an aging PHP stack had become slow to change, risky to deploy, and unattractive to new engineering hires.",
    approach:
      "We audited the legacy system, migrated data to PostgreSQL with verification scripts, and incrementally rebuilt the application in Next.js and TypeScript — keeping users live throughout.",
    results: [
      "Zero-downtime migration with verified data integrity",
      "Page loads and deploy times cut dramatically",
      "A codebase modern engineers are happy to maintain",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    id: "agritech-innovation",
    type: "Solution Snapshot",
    category: "AgriTech Innovation",
    title: "Agri Rover — farmer-first field technology",
    challenge:
      "Smallholder farming depends on manual field inspection — time-consuming, inconsistent, and hard to scale across acreage.",
    approach:
      "Agri Rover is our in-house AgriTech innovation project: a rover-based platform designed for field monitoring and data collection, paired with software dashboards that turn field observations into decisions farmers can act on.",
    results: [
      "An active innovation track combining hardware direction and software platforms",
      "Farmer-first design principles guiding every iteration",
      "A foundation for future smart-farming capabilities",
    ],
    stack: ["Embedded systems direction", "Data collection pipelines", "React dashboards", "Cloud telemetry-ready"],
  },
];
