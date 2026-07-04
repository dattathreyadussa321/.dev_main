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

/** Ekkalavya is a separate product — every Ekkalavya CTA redirects here. */
export const ekkalavyaUrl = "https://code.patashala.dev";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Training", href: "/training" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavigation = {
  pages: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Training", href: "/training" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  platforms: [
    { label: "Ekkalavya ✦", href: ekkalavyaUrl, external: true },
    { label: "Advanced LMS", href: "/solutions/lms" },
    { label: "CRM for EdTech", href: "/solutions/crm" },
    { label: "Agri Rover", href: "/solutions/agritech" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/patashaladotdev", external: true },
    { label: "X / Twitter", href: "https://x.com/patashala_dev", external: true },
    { label: "Instagram", href: "https://instagram.com/patashala.dev", external: true },
  ],
} as const;
