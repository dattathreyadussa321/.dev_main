import Link from "next/link";
import { siteConfig, footerNavigation } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/layout/logo";

const columns = [
  { title: "Pages", links: footerNavigation.pages },
  { title: "Platforms", links: footerNavigation.platforms },
  { title: "Social", links: footerNavigation.social },
] as const;

type FooterLink = { label: string; href: string; external?: boolean };

function FooterAnchor({ link }: { link: FooterLink }) {
  const highlight = link.label.includes("Ekkalavya");
  const className = highlight
    ? "text-sm font-bold text-primary transition-colors hover:text-foreground"
    : "text-sm text-foreground/65 transition-colors hover:text-primary";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pb-8">
      <Container className="max-w-[1200px] px-0 sm:px-0 lg:px-0">
        <div className="flex flex-wrap justify-between gap-8 px-2 pb-6 pt-14">
          {/* Brand */}
          <div className="max-w-[320px]">
            <Logo className="text-[22px]" />
            <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/50">
              {siteConfig.tagline} — SaaS, LMS, CRM platforms, placement-ready training, and
              AgriTech innovation from {siteConfig.location}.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block font-mono text-[13px] text-primary hover:text-foreground"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {columns.map((col) => (
              <nav key={col.title} aria-label={`Footer — ${col.title}`}>
                <h3 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/40">
                  {col.title}
                </h3>
                <ul className="grid gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-white/[0.07] px-2 py-5 text-[12.5px] text-foreground/40">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. ·{" "}
            <Link href="/admin/login" className="transition-colors hover:text-foreground/70">
              Admin
            </Link>
          </p>
          <p className="font-mono">
            {siteConfig.location} · Consulting · Development · Training · Innovation
          </p>
        </div>
      </Container>
    </footer>
  );
}
