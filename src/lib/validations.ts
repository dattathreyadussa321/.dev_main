import { z } from "zod";
import { timelineOptions } from "@/config/content";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number")
    .max(20)
    .regex(/^[+\d\s\-()]*$/, "Please enter a valid phone number"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  serviceInterest: z
    .string()
    .trim()
    .min(1, "Please select or describe what you need")
    .max(200),
  budget: z.string().trim().max(150).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(5000, "Message is too long"),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(200),
});

// ── Blog ──────────────────────────────────────────────────────────────────────

export const blogPostSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().trim().min(10, "Excerpt is required").max(500),
  category: z.string().trim().min(1, "Category is required").max(80),
  tags: z.array(z.string().trim().max(50)).max(10).default([]),
  content: z.string().trim().min(1, "Content is required"),
  coverImage: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  author: z.string().trim().max(120).default("Patashala.Dev Team"),
  readingTime: z.string().trim().max(30).optional().or(z.literal("")),
  published: z.boolean().default(false),
  // Accepts datetime-local format (YYYY-MM-DDTHH:mm) or a full ISO string.
  // Values without a timezone offset are treated as IST (UTC+05:30).
  date: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val): string | undefined => {
      if (!val) return undefined;
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(val)) return `${val}:00+05:30`;
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(val)) return `${val}+05:30`;
      return val;
    }),
  metaTitle: z.string().trim().max(120).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(320).optional().or(z.literal("")),
  ogImage: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const blogPostUpdateSchema = blogPostSchema.partial();
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
