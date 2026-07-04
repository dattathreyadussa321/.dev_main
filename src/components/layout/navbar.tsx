"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close menu on route change (adjust-state-during-render pattern)
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div className="w-full max-w-[1200px] rounded-2xl border border-white/[0.08] bg-[rgba(10,11,14,0.72)] backdrop-blur-[18px]">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between gap-4 py-3 pl-5 pr-3"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-[10px] px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white/[0.06] text-foreground"
                      : "text-foreground/65 hover:bg-white/[0.06] hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-[10px] bg-primary px-4.5 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_24px_rgba(83,243,207,0.25)] transition-all hover:-translate-y-px hover:shadow-[0_0_36px_rgba(83,243,207,0.45)] lg:inline-flex"
            >
              Start a project
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-[10px] border border-white/[0.08] text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.65, 0.36, 1] }}
              className="overflow-hidden border-t border-white/[0.08] lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                className="max-h-[calc(100dvh-6rem)] space-y-1 overflow-y-auto px-4 py-5"
              >
                {navigation.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -14 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-white/[0.06] text-foreground"
                          : "text-foreground/65 hover:bg-white/[0.06] hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={{ hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0 } }}
                  className="pt-3"
                >
                  <Link
                    href="/contact"
                    className="block rounded-[12px] bg-primary px-4 py-3 text-center text-base font-bold text-primary-foreground shadow-[0_0_24px_rgba(83,243,207,0.25)]"
                  >
                    Start a project
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
