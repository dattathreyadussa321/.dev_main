"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

/** Accessible accordion FAQ, styled per the redesign prototype. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="mx-auto grid max-w-3xl gap-2.5">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold transition-colors hover:text-primary"
            >
              {item.question}
              <span aria-hidden className="font-mono text-lg text-primary">
                {open ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.21, 0.65, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
