"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, BookOpen, Plus, LogOut } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/contact-submissions", label: "Submissions", icon: Inbox, exact: false },
  { href: "/admin/blog", label: "Blog", icon: BookOpen, exact: false },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Admin topbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Left: brand + nav */}
          <div className="flex items-center gap-1">
            <div className="mr-3 flex items-center gap-2">
              <Logo />
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Admin
              </span>
            </div>
            <nav className="hidden items-center gap-0.5 sm:flex">
              {navLinks.map(({ href, label, icon: Icon, exact }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive(href, exact)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: new post + logout */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog/new"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              <Plus className="size-4" aria-hidden />
              <span className="hidden sm:inline">New post</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-0.5 overflow-x-auto border-t border-border px-5 py-2 sm:hidden">
          {navLinks.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(href, exact)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">{children}</main>

      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          ← Back to Patashala.Dev
        </Link>
      </footer>
    </div>
  );
}
