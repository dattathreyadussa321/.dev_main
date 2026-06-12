export const siteConfig = {
  name: "Patashala.Dev",
  tagline: "Learn. Build. Deliver.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://patashala.dev",
  description:
    "Patashala.Dev builds production-ready SaaS, LMS, CRM, and full-stack platforms — and trains engineers with practical, industry-focused programs. Based in Hyderabad, India.",
  email: "info@patashala.dev",
  location: "Hyderabad, India",
  social: {
    instagram: "https://instagram.com/patashala.dev",
    x: "https://x.com/patashala_dev",
    linkedin: "https://linkedin.com/company/patashaladotdev",
    github: "https://github.com/patashala-dev",
  },
  keywords: [
    "SaaS development company",
    "LMS development company",
    "CRM development for education",
    "EdTech software development",
    "full-stack web application development",
    "software training with real projects",
    "Next.js development company",
    "custom LMS platform",
    "custom CRM software",
    "AgriTech software development",
    "Patashala.Dev",
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "LMS", href: "/solutions/lms" },
  { label: "CRM", href: "/solutions/crm" },
  { label: "Training", href: "/training" },
  { label: "AgriTech", href: "/solutions/agritech" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavigation = {
  services: [
    { label: "SaaS Development", href: "/services#saas" },
    { label: "Full-Stack Web Apps", href: "/services#fullstack" },
    { label: "LMS Development", href: "/services#lms" },
    { label: "CRM Development", href: "/services#crm" },
    { label: "UI/UX Design", href: "/services#uiux" },
    { label: "MVP Development", href: "/services#mvp" },
  ],
  solutions: [
    { label: "Advanced LMS", href: "/solutions/lms" },
    { label: "CRM for EdTech", href: "/solutions/crm" },
    { label: "Agri Rover", href: "/solutions/agritech" },
    { label: "Training Programs", href: "/training" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
