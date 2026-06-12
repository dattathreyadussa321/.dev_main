import { Check } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

/** Compact feature card used in LMS/CRM feature grids. */
export function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <Card variant="interactive" className={cn("h-full", className)}>
      <div className="mb-3 grid size-9 place-items-center rounded-lg bg-primary/10">
        <Check className="size-4 text-primary" aria-hidden />
      </div>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </Card>
  );
}
