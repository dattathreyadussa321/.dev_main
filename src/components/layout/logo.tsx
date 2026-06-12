import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Patashala.Dev — Home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <div className="flex flex-col leading-none">
        <p className="text-[1.25rem] font-semibold tracking-tight">
          <span className="text-[#3d3d3d] dark:text-[#e4e4e4]">patashala</span>
          <span style={{ color: "#2ab5a3" }}>.dev</span>
        </p>
        <p className="mt-0.5 text-[0.6rem] tracking-widest text-[#888888]">
          Learn. Build. Deliver.
        </p>
      </div>
    </Link>
  );
}
