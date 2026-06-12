import {
  GraduationCap,
  Users,
  Rocket,
  Tractor,
  CalendarRange,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export interface Solution {
  id: string;
  href: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  summary: string;
  highlights: string[];
}

export const solutions: Solution[] = [
  {
    id: "lms",
    href: "/solutions/lms",
    icon: GraduationCap,
    title: "Advanced LMS",
    tagline: "Your institute's learning platform, owned outright",
    summary:
      "A complete learning management system: courses, live and recorded classes, assessments, certificates, payments, and dashboards for every role.",
    highlights: ["Multi-role dashboards", "Live + recorded classes", "Assessments & certificates", "Payments & reports"],
  },
  {
    id: "crm",
    href: "/solutions/crm",
    icon: Users,
    title: "CRM for EdTech",
    tagline: "From first enquiry to confirmed admission",
    summary:
      "An admissions-focused CRM for institutes and EdTech teams: lead capture, counsellor pipelines, follow-up reminders, batch and payment tracking.",
    highlights: ["Admissions pipeline", "Counsellor dashboard", "Follow-up automation", "WhatsApp/email-ready"],
  },
  {
    id: "saas",
    href: "/services#saas",
    icon: Rocket,
    title: "SaaS Products",
    tagline: "From validated idea to scaling platform",
    summary:
      "Multi-tenant SaaS products engineered for real workflows — subscriptions, roles, billing, analytics, and infrastructure that grows with you.",
    highlights: ["Multi-tenancy", "Subscription billing", "Usage analytics", "Scalable architecture"],
  },
  {
    id: "agritech",
    href: "/solutions/agritech",
    icon: Tractor,
    title: "Agri Rover & AgriTech",
    tagline: "Farmer-first agricultural innovation",
    summary:
      "Our AgriTech innovation track, led by the Agri Rover project — exploring rover-based field monitoring, data collection, and smart farming systems.",
    highlights: ["Rover-based monitoring", "Field data collection", "Smart farming vision", "Farmer-first design"],
  },
  {
    id: "training-platforms",
    href: "/solutions#training-platforms",
    icon: CalendarRange,
    title: "Training Management Platforms",
    tagline: "Run your training business on one system",
    summary:
      "Operations platforms for training companies: batch scheduling, trainer allocation, attendance, assessments, fee tracking, and placement workflows.",
    highlights: ["Batch scheduling", "Trainer allocation", "Attendance & assessments", "Fee & placement tracking"],
  },
  {
    id: "dashboards",
    href: "/solutions#dashboards",
    icon: LayoutDashboard,
    title: "Role-Based Dashboards",
    tagline: "The right view for every stakeholder",
    summary:
      "Purpose-built dashboards for students, trainers, admins, counsellors, and institute owners — each role sees exactly what it needs to act on.",
    highlights: ["Student dashboard", "Trainer dashboard", "Admin dashboard", "Institute analytics"],
  },
];

/** Feature grids for the dedicated LMS page. */
export const lmsFeatures = [
  { title: "Course Management", description: "Create structured courses with modules, lessons, resources, and prerequisites — organized the way your curriculum actually flows." },
  { title: "Student Dashboard", description: "A focused learning home: enrolled courses, upcoming classes, pending assignments, progress, and certificates in one view." },
  { title: "Trainer Dashboard", description: "Trainers manage batches, schedule classes, publish materials, grade submissions, and track student progress without admin back-and-forth." },
  { title: "Admin Dashboard", description: "Full operational control — users, courses, batches, payments, and platform-wide analytics with role-based permissions." },
  { title: "Assignments & Quizzes", description: "Timed quizzes, coding assignments, file submissions, auto-grading where possible, and structured manual review where it matters." },
  { title: "Progress Tracking", description: "Lesson-level completion, scores, attendance, and learning streaks — visible to students and reportable for admins." },
  { title: "Live Classes", description: "Schedule and run live sessions with integration-ready architecture for Zoom, Google Meet, or your preferred platform." },
  { title: "Recorded Classes", description: "Secure video hosting and playback with watch-progress tracking, so self-paced learners never lose their place." },
  { title: "Certificates", description: "Auto-generated, verifiable certificates issued on completion — branded to your institute with unique verification IDs." },
  { title: "Payments", description: "Course fees, EMI-style installments, and batch payments with gateway integration and automatic receipts." },
  { title: "Reports & Analytics", description: "Enrollment trends, completion rates, revenue, and trainer performance — the numbers institute owners actually ask for." },
  { title: "Multi-Role Access", description: "Students, trainers, counsellors, admins, and institute owners — every role scoped with proper permissions from day one." },
] as const;

/** Feature grids for the dedicated CRM page. */
export const crmFeatures = [
  { title: "Lead Management", description: "Capture leads from your website, ads, walk-ins, and referrals into one clean pipeline — no enquiry lost in a spreadsheet." },
  { title: "Student Enquiry Tracking", description: "Every enquiry tracked with source, course interest, conversation history, and status — searchable in seconds." },
  { title: "Admissions Pipeline", description: "A visual pipeline from new enquiry to enrolled student, with stage-wise conversion metrics your team can act on." },
  { title: "Follow-Up Reminders", description: "Scheduled follow-ups with due-today views and overdue alerts, so counsellors call at the right moment, every time." },
  { title: "WhatsApp & Email Ready", description: "Integration-ready architecture for WhatsApp Business API and transactional email — templated messages from inside the CRM." },
  { title: "Counsellor Dashboard", description: "Each counsellor sees their leads, today's follow-ups, and personal conversion stats — focused, not overwhelming." },
  { title: "Batch Management", description: "Map admissions to batches with capacity tracking, start dates, and trainer allocation built in." },
  { title: "Payment Status", description: "Fee plans, installments, paid/pending status, and receipts — finance visibility tied directly to each student record." },
  { title: "Analytics & Reports", description: "Source-wise conversion, counsellor performance, revenue projections, and admission trends in clear dashboards." },
  { title: "Automation-Ready Workflows", description: "Rule-based actions — auto-assign leads, trigger follow-up sequences, and escalate stale enquiries automatically." },
] as const;
