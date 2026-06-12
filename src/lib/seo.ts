import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Build consistent per-page metadata with OG/Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Organization structured data for the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    sameAs: Object.values(siteConfig.social),
    knowsAbout: [
      "SaaS development",
      "LMS development",
      "CRM development",
      "EdTech software",
      "Full-stack web development",
      "Software training",
      "AgriTech innovation",
    ],
  };
}

/** Service structured data for the services page. */
export function servicesJsonLd(services: { title: string; summary: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.summary,
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    })),
  };
}

/** FAQ structured data. */
export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Blog post structured data. */
export function blogPostJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}
