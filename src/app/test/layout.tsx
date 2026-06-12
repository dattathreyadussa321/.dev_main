import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Test Hero — Alternative Design",
  robots: { index: false, follow: false },
};

/**
 * Standalone /test route for an alternative hero design experiment.
 * Hides the main-site navbar/footer for this route only and scopes the
 * Inter font + blink keyframes locally — nothing outside /test is touched.
 */
export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={inter.variable}
      style={{ ["--font-sans" as string]: "var(--font-inter), 'Inter', sans-serif" }}
    >
      <style>{`
        /* Hide the main site chrome on this experimental route only */
        body > header, body > footer { display: none !important; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
      {children}
    </div>
  );
}
