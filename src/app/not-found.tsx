import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <div className="glow-orbs relative flex min-h-[70vh] items-center overflow-hidden pt-20">
      <Container className="relative text-center">
        <p className="font-mono text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          This page wandered off the roadmap
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          to something useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <ArrowLeft aria-hidden /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services">
              <Compass aria-hidden /> Explore Services
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
