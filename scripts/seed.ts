import mongoose from "mongoose";
import { CaseStudy } from "../src/lib/models/CaseStudy";
import { Testimonial } from "../src/lib/models/Testimonial";
import { BlogPost } from "../src/lib/models/BlogPost";

/**
 * Seed data: clearly-labeled sample/placeholder records for local development.
 * Testimonials are marked as placeholders and unpublished by default.
 * Blog posts are seeded as published DB posts.
 *
 * Run with: npm run db:seed  (loads .env via tsx --env-file)
 */
async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env before seeding.");
  }
  await mongoose.connect(uri);

  // ── Case study ─────────────────────────────────────────────────────────────
  await CaseStudy.findOneAndUpdate(
    { slug: "lms-platform" },
    {
      slug: "lms-platform",
      category: "LMS Platform",
      title: "Advanced LMS for a multi-branch training institute",
      challenge:
        "A growing institute was running courses across spreadsheets, WhatsApp groups, and a generic video tool.",
      approach:
        "Custom LMS with role-based dashboards, batch-wise live class scheduling, assignments, and integrated fee tracking.",
      results: [
        "One platform replacing four disconnected tools",
        "Real-time visibility into completion and revenue",
      ],
      stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    },
    { upsert: true, setDefaultsOnInsert: true },
  );

  // ── Placeholder testimonial ────────────────────────────────────────────────
  await Testimonial.findOneAndUpdate(
    { author: "[Placeholder — replace with real client]" },
    {
      author: "[Placeholder — replace with real client]",
      role: "Institute Director",
      quote:
        "[Placeholder testimonial: replace with a real, attributed quote before publishing.]",
      published: false,
    },
    { upsert: true, setDefaultsOnInsert: true },
  );

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const posts = [
    {
      slug: "custom-lms-vs-off-the-shelf",
      title: "Custom LMS vs Off-the-Shelf: What Training Institutes Should Actually Compare",
      excerpt:
        "Per-seat pricing looks cheap until you scale. Here's the real comparison framework we walk institutes through before they commit to a platform.",
      category: "LMS",
      tags: ["LMS", "EdTech", "Strategy"],
      readingTime: "7 min read",
      date: new Date("2026-05-18"),
      content: `Every training institute eventually hits the same wall: the spreadsheet-and-WhatsApp system that worked for 50 students breaks at 500. The question is never whether you need a learning platform — it's whether you rent one or own one.

Off-the-shelf LMS products are genuinely good at generic course delivery. Where they struggle is everything specific to how your institute runs: your batch structure, your fee plans, your trainer workflows, your reporting needs.

## The costs that don't show up on the pricing page

Per-seat pricing compounds with growth — the better your institute does, the more you pay. Workarounds compound too: every workflow the platform doesn't support becomes a manual process someone on your team owns forever.

A custom LMS inverts this. The upfront investment is higher, but the marginal cost of growth approaches zero, and the platform bends to your workflow instead of the reverse.

## When off-the-shelf is the right call

If you're under ~200 students, still iterating on your course model, or don't have anyone who can own a platform relationship, rent first. Custom platforms reward operational clarity — build one when you know exactly how your institute works.

When you cross that threshold, the comparison stops being about price and starts being about control: of data, of workflow, of student experience, and of your margins.`,
      published: true,
    },
    {
      slug: "edtech-crm-admissions-pipeline",
      title: "Why Education Businesses Lose Admissions to Spreadsheets",
      excerpt:
        "Most institutes don't have a lead problem — they have a follow-up problem. What an admissions-focused CRM changes, in practice.",
      category: "CRM",
      tags: ["CRM", "EdTech", "Admissions"],
      readingTime: "6 min read",
      date: new Date("2026-04-22"),
      content: `Ask any institute owner how many enquiries they got last month and you'll get an estimate. Ask how many were followed up within 24 hours and you'll get silence. That gap is where admissions are lost.

The pattern is consistent: enquiries arrive from ads, walk-ins, calls, and referrals into different notebooks and phones. Counsellors follow up from memory. Nobody can see the pipeline.

## What changes with an admissions pipeline

An education-focused CRM does three unglamorous things extremely well: it captures every enquiry into one place automatically, it tells each counsellor exactly who to call today, and it shows leadership stage-wise conversion numbers that are actually true.

Speed-to-first-contact is the single highest-leverage metric. Enquiries followed up within hours convert at a dramatically higher rate than those contacted days later — and a CRM makes that speed systematic instead of heroic.

## Generic CRM vs education CRM

Generic CRMs model deals and companies. Education businesses need enquiries, courses, batches, counsellors, fee plans, and admission stages. You can force one into the other, but every mismatch becomes a training burden and a data-quality leak.

Whether you buy or build, insist on a system whose nouns match your business. Your counsellors will use a tool that thinks like they do — and quietly abandon one that doesn't.`,
      published: true,
    },
    {
      slug: "saas-mvp-scope",
      title: "The MVP Scoping Mistake That Kills SaaS Budgets",
      excerpt:
        "Founders don't overspend on building — they overspend on building the wrong 60%. How we scope MVPs to validate, not impress.",
      category: "SaaS",
      tags: ["SaaS", "MVP", "Product"],
      readingTime: "8 min read",
      date: new Date("2026-03-30"),
      content: `The most expensive sentence in SaaS development is "while we're at it." An MVP exists to answer one question: will the people you built this for pay for it? Every feature that doesn't serve that answer is borrowed money.

When we run scope workshops, we sort every proposed feature into three buckets: proves the business case, supports the proof, or decorates it. Most first drafts are 60% decoration.

## Cut scope, not foundations

Cutting scope doesn't mean cutting quality. Auth, data modeling, validation, and deployment pipelines aren't features — they're the foundation everything after the MVP stands on. Skimping there is how MVPs become rewrites.

The discipline is: minimal surface area, production-grade depth. Few screens, built properly.

## What a well-scoped MVP timeline looks like

With ruthless scope, a real B2B MVP — multi-tenant, billed, deployed — is a matter of weeks, not quarters. The speed comes from what you refuse to build, not from how fast anyone types.

Ship it, charge for it, and let actual usage write your roadmap. The features users ask for after paying are almost never the ones founders planned before launch.`,
      published: true,
    },
    {
      slug: "fullstack-stack-2026",
      title: "Our Default Full-Stack Architecture in 2026 — and Why",
      excerpt:
        "Next.js, TypeScript, PostgreSQL, Prisma, Docker. Not because it's fashionable — because it minimizes the decisions that don't matter.",
      category: "Engineering",
      tags: ["Next.js", "TypeScript", "Architecture", "Full-Stack"],
      readingTime: "9 min read",
      date: new Date("2026-03-08"),
      content: `Clients sometimes ask why we keep reaching for the same stack. The honest answer: a default stack is a decision-elimination machine. Every hour not spent re-litigating infrastructure is an hour spent on the product.

Our default: Next.js with TypeScript for the application, PostgreSQL for data, Prisma for the data layer, Zod at every boundary, Tailwind for styling, Docker for deployment.

## The reasoning, component by component

TypeScript pays for itself the first time a refactor touches forty files. PostgreSQL is boring in the way infrastructure should be — decades of reliability and an answer for every data shape we've met. Zod means bad data is rejected at the edge instead of discovered in production.

Next.js earns its place by collapsing frontend, API, SEO, and rendering strategy into one framework with one deployment story. Fewer moving parts, fewer 2 a.m. surprises.

## When we deviate

Defaults are starting points, not dogma. Heavy real-time needs, unusual data shapes, or an existing team's expertise can all justify different choices — and we make them openly, with the trade-offs written down.

The stack is never the goal. A product your team can ship, maintain, and grow is the goal. The stack is just the least interesting decision on the way there.`,
      published: true,
    },
    {
      slug: "practical-training-job-ready",
      title: "What 'Job-Ready' Actually Means in Software Training",
      excerpt:
        "Watching tutorials produces tutorial-watchers. The specific, unglamorous skills that make a junior developer hireable — and how we train them.",
      category: "Training",
      tags: ["Training", "Career", "Software"],
      readingTime: "6 min read",
      date: new Date("2026-02-14"),
      content: `There is a gap between completing a course and being hireable, and most training programs pretend it doesn't exist. Companies don't hire people who know React. They hire people who can work inside a codebase they didn't write, with people they've just met.

That's why every Patashala.Dev track is built around the workflows of an actual engineering team: Git branches, code review, tickets, staging deployments.

## The skills interviews actually test

Reading unfamiliar code. Explaining a decision out loud. Debugging systematically instead of by superstition. Estimating honestly. These are trainable — but only inside real projects with real review, which is exactly what tutorials can't provide.

Our students finish with deployed projects they can defend line-by-line in an interview, because they wrote every line under review.

## Why working engineers make better trainers

Our trainers build client platforms during the day. When a student asks 'why do it this way?', the answer comes from a production incident, not a curriculum guide. That context is the difference between knowing syntax and having judgment.

Job-readiness isn't a module at the end of a course. It's the way the entire course is taught.`,
      published: true,
    },
    {
      slug: "agritech-software-opportunity",
      title: "AgriTech Needs Software Engineers Who Visit Farms",
      excerpt:
        "Why we started the Agri Rover project, what farmer-first design means in practice, and where we think rover-based field technology is heading.",
      category: "AgriTech",
      tags: ["AgriTech", "Innovation", "Rover"],
      readingTime: "7 min read",
      date: new Date("2026-01-20"),
      content: `Agriculture is one of the last major industries where the daily workflow is largely untouched by software — not because farmers resist technology, but because most agricultural technology is designed far from the field.

Agri Rover is our answer to that gap: an in-house innovation project exploring rover-based field monitoring and data collection, designed from the farmer's workflow outward.

## What farmer-first design means

It means the technology adapts to the field, not the reverse. Interfaces that work on the phones farmers already own. Data presented as decisions — irrigate, inspect, wait — rather than dashboards of raw numbers. Hardware designed for dust, heat, and distance from a service center.

It also means humility about claims. We talk about what Agri Rover is designed for and the capabilities the platform can include, because in AgriTech, overpromising is the fastest way to lose the only trust that matters.

## The innovation direction

Our conviction is that field robotics plus well-built software platforms will make precision agriculture accessible beyond large industrial farms. Rovers that monitor fields systematically, pipelines that turn observations into recommendations, and tools priced for smallholders.

Agri Rover is a long-term track, not a quarterly product. We'll share progress as it's real — and we're always glad to talk with researchers, farmers, and AgriTech teams working on the same problems.`,
      published: true,
    },
  ];

  for (const post of posts) {
    await BlogPost.findOneAndUpdate(
      { slug: post.slug },
      { ...post, author: "Patashala.Dev Team" },
      { upsert: true, setDefaultsOnInsert: true },
    );
  }

  console.log(`Seed complete: ${posts.length} blog posts seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
