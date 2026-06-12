"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

// 3D model — client-only, lazy, desktop-only enhancement layer
const HeroModel = dynamic(() => import("@/components/three/HeroModel"), {
  ssr: false,
});

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

const NAV_LINKS = ["Labs", "Studio", "Openings", "Shop"] as const;
const SERVICE_OPTIONS = ["Brand", "Digital", "Campaign", "Other"] as const;

const HEADLINE = "we'd love to\nhear from you!";

/** Typewriter effect: builds `text` slice by slice after `startDelay`. */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = React.useState("");
  const [done, setDone] = React.useState(false);

  // Reset synchronously if `text` changes (adjust-state-during-render pattern)
  const [lastText, setLastText] = React.useState(text);
  if (lastText !== text) {
    setLastText(text);
    setDisplayed("");
    setDone(false);
  }

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/** Background video: mouse-scrubbed on desktop, autoplay loop on mobile. */
function BackgroundVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile (<1024px): plain autoplay, no scrubbing.
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {
        /* autoplay blocked — leave the poster frame */
      });
      return;
    }

    // Desktop: native scrubbing driven by horizontal mouse movement.
    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const applySeek = () => {
      if (seeking || !video.duration) return;
      seeking = true;
      video.currentTime = targetTime;
    };

    const onSeeked = () => {
      seeking = false;
      // chase the latest target for smoother frame-to-frame tracking
      if (Math.abs(video.currentTime - targetTime) > 0.01) applySeek();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!video.duration) return;
      targetTime += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.min(Math.max(targetTime, 0), video.duration);
      applySeek();
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src={VIDEO_SRC}
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      />
    </div>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="flex flex-row items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1"
            aria-hidden
          >
            &#10033;
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center text-[23px]" aria-label="Test hero navigation">
          {NAV_LINKS.map((link, i) => (
            <React.Fragment key={link}>
              <a href="#" className="hover:opacity-60 transition-opacity">
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && <span className="opacity-40">,&nbsp;</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="md:hidden relative z-[11] flex flex-col items-center justify-center gap-[5px] size-10"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav
          className="flex h-full flex-col items-center justify-center gap-8 text-2xl"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </>
  );
}

function ServicePills() {
  const [services, setServices] = React.useState<string[]>([]);

  const toggle = (option: string) =>
    setServices((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option],
    );

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight mb-2">What sort of service?</h2>
      <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>

      <div className="flex flex-wrap gap-3 mb-8">
        {SERVICE_OPTIONS.map((option) => {
          const active = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              whileTap={{ scale: 0.96 }}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors duration-200 ${
                active
                  ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform"
                  : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
              }`}
            >
              {active && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex"
                >
                  <Check className="size-4" aria-hidden />
                </motion.span>
              )}
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="opacity-50 italic text-xs"
          >
            Please click to select services above.
          </motion.p>
        ) : (
          <motion.div
            key="selected"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3 max-w-2xl">
              <p className="text-sm text-[#1C2E1E]">
                Ready to inquire about: {services.join(", ")}
              </p>
              <span className="text-[#4D6D47] uppercase text-xs font-medium tracking-wide">
                Let&apos;s Go
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TestHeroPage() {
  const { displayed, done } = useTypewriter(HEADLINE);

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <Navbar />
      <BackgroundVideo />

      {/* 3D model layer — desktop-only visual enhancement, never blocks text */}
      <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-[45vw] max-w-[720px] pointer-events-none z-[2]">
        <HeroModel />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br />
              drop us a message and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>

          <ServicePills />
        </main>
      </div>
    </div>
  );
}
