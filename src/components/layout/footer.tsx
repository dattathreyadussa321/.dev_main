import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siteConfig, footerNavigation } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const columns = [
  { title: "Services", links: footerNavigation.services },
  { title: "Solutions", links: footerNavigation.solutions },
  { title: "Company", links: footerNavigation.company },
] as const;

/* Brand icons — inline SVGs (lucide-react no longer ships brand logos). */
const iconProps = {
  className: "size-4",
  fill: "currentColor",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

function LinkedinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} — We build production-ready SaaS, LMS, CRM, and full-stack
              platforms, train engineers on real projects, and push AgriTech innovation forward.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-primary" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" aria-hidden />
                {siteConfig.location}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: siteConfig.social.x, label: "X (Twitter)", Icon: XIcon },
                { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <nav key={col.title} aria-label={`Footer — ${col.title}`}>
                <h3 className="mb-4 text-sm font-semibold">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="mb-2 text-sm font-semibold">Engineering insights, monthly</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Practical notes on SaaS, LMS, CRM, and AgriTech engineering. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {/* <p>Built with Next.js — by the team that builds for you.</p> */}
        </div>
      </Container>
    </footer>
  );
}
