import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./ImageWithFallback";
import { WashiTape } from "./ScrapbookDecor";
import { MIHOYO_ASSETS } from "../data/imageAssets";
import { useHeartBurst } from "../hooks/useHeartBurst";
import { floatY, springSnappy } from "../motion/presets";

/**
 * ═══════════════════════════════════════════════════════════════
 *  TAPE — edit here (relative to the white polaroid frame below)
 * ═══════════════════════════════════════════════════════════════
 *  • className  → position (Tailwind: top/left/right/bottom, offsets)
 *  • rotate     → degrees
 *  • width      → px number or CSS string (default 64px / w-16)
 *  • height     → px number or CSS string (default 24px / h-6)
 *  • style      → any extra CSS (e.g. { top: "12px", left: "-6px" })
 */
const HERO_TAPES = [
  {
    id: "top-left",
    className: "-left-4 -top-2",
    rotate: -20,
  },
  {
    id: "top-right",
    className: "-right-5 -top-2",
    rotate: 20,
  },
  {
    id: "bottom-right",
    className: "bottom-18 -right-5",
    rotate: -8,
  },

] as const;

/** Chibi sticker on the home polaroid — edit width / position here */
const CHIBI_STICKER = {
  /** Tailwind width classes per breakpoint */
  widthClass: "w-[88px] md:w-[96px] lg:w-[110px]",
  /** Position on the polaroid (md+) */
  className: "md:absolute md:-left-7 md:-bottom-8 lg:-left-9 lg:-bottom-10",
} as const;

const CHIBI_WINK_MS = 1000;

export default function HeroSection() {
  const { targetRef, spawnBurst, BurstLayer, popping } = useHeartBurst();
  const [winking, setWinking] = useState(false);
  const winkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (winkTimeoutRef.current) clearTimeout(winkTimeoutRef.current);
    };
  }, []);

  const handleChibiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    spawnBurst();
    setWinking(true);
    if (winkTimeoutRef.current) clearTimeout(winkTimeoutRef.current);
    winkTimeoutRef.current = setTimeout(() => {
      setWinking(false);
      winkTimeoutRef.current = null;
    }, CHIBI_WINK_MS);
  };

  return (
    <section className="relative px-5 pt-2 pb-6 md:pt-24 md:pb-4 lg:pt-[6.5rem]">
      <motion.div
        className="relative mx-auto max-w-[280px] md:max-w-[300px] lg:max-w-[340px]"
        animate={floatY}
        transition={springSnappy}
      >
        {/* Polaroid frame */}
        <div className="relative rotate-[-1deg] rounded-[20px] bg-white p-3 pb-10 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          {HERO_TAPES.map((tape) => (
            <WashiTape
              key={tape.id}
              id={tape.id}
              className={tape.className}
              rotate={tape.rotate}
            />
          ))}

          <div className="overflow-hidden rounded-2xl bg-[#e8f0fa]">
            <ImageWithFallback
              src={MIHOYO_ASSETS.polaroid}
              alt="Featured fanart"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <p className="mt-6 text-center font-['Caveat'] text-2xl text-[#5a8fc9] md:mt-7 md:text-[1.65rem] lg:mt-8 lg:text-3xl">
          building things I love
          </p>
        </div>

        {/* Chibi sticker — tap for hearts; stacked below polaroid on mobile */}
        <div
          className={`relative z-20 mt-5 flex w-full items-center justify-center gap-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:mt-0 md:block ${CHIBI_STICKER.className} ${CHIBI_STICKER.widthClass}`}
        >
          <motion.p
            className="shrink-0 font-['Caveat'] text-lg text-[#5a8fc9] drop-shadow-sm md:pointer-events-none md:absolute md:top-1/2 md:-left-[4.5rem] md:z-30 md:-translate-y-1/2 md:whitespace-nowrap md:text-xl lg:-left-[5rem]"
            animate={{ x: [0, 4, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            click me →
          </motion.p>

          <motion.button
            ref={targetRef as RefObject<HTMLButtonElement>}
            type="button"
            onClick={handleChibiClick}
            aria-label="Chibi sticker — tap for hearts"
            className="relative z-20 w-full shrink-0 cursor-pointer border-0 bg-transparent p-0"
            animate={
              popping
                ? { scale: [1, 1.12, 1], y: 0, rotate: -4 }
                : { y: [0, -5, 0], rotate: [-6, -2, -6] }
            }
            transition={
              popping
                ? springSnappy
                : {
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    scale: springSnappy,
                  }
            }
            whileHover={{
              scale: 1.1,
              rotate: 0,
              y: -4,
              transition: { type: "spring", stiffness: 600, damping: 28 },
            }}
            whileTap={{ scale: 0.92, transition: springSnappy }}
          >
            <img
              src={winking ? MIHOYO_ASSETS.chibiWink : MIHOYO_ASSETS.chibi}
              alt=""
              aria-hidden
              className="pointer-events-none w-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            />
          </motion.button>
        </div>
        {BurstLayer}
      </motion.div>
    </section>
  );
}
