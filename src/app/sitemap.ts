import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedPosts } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/solutions",
    "/solutions/lms",
    "/solutions/crm",
    "/solutions/agritech",
    "/training",
    "/portfolio",
    "/about",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = await getPublishedPosts().catch(() => []);
  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
