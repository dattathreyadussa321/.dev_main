"use client";

import * as React from "react";
import { LikeButton } from "./like-button";
import { ShareButton } from "./share-button";
import { cn } from "@/lib/utils";

interface EngagementRailProps {
  slug: string;
  title: string;
  likeCount?: number;
  className?: string;
}

/** Desktop sticky side rail — vertical stack. */
export function EngagementRailDesktop({ slug, title, likeCount }: EngagementRailProps) {
  return (
    <aside
      aria-label="Post engagement"
      className="hidden xl:sticky xl:top-28 xl:flex xl:h-fit xl:flex-col xl:items-center xl:gap-3"
    >
      <LikeButton slug={slug} initialCount={likeCount} />
      <ShareButton slug={slug} title={title} />
    </aside>
  );
}

/** Inline bar for mobile / tablet. */
export function EngagementInline({
  slug,
  title,
  likeCount,
  className,
}: EngagementRailProps) {
  return (
    <div
      aria-label="Post engagement"
      className={cn("flex items-center gap-6 xl:hidden", className)}
    >
      <LikeButton slug={slug} initialCount={likeCount} />
      <ShareButton slug={slug} title={title} />
    </div>
  );
}
