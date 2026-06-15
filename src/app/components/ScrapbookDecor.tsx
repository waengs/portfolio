import type { CSSProperties, FormHTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { STICKY_PAPER_CLIP } from "../data/siteData";
import { scrollRevealUp, scrollViewport } from "../motion/presets";

/** Pink–lavender scrapbook panel (poll card, homepage, etc.) */
export const SCRAPBOOK_GRADIENT =
  "bg-gradient-to-br from-[#fce4ec] via-[#f5e8ff] to-[#ede8ff]";
export const SCRAPBOOK_GRADIENT_SHADOW = "shadow-[0_6px_22px_rgba(219,39,119,0.12)]";

/** Inner cards inside poll panels — options, vote totals */
export const POLL_INNER_CARD =
  "rounded-[18px] border-2 border-white/80 bg-white/75 px-4 py-3 shadow-sm md:px-5 md:py-4";
export const POLL_INNER_TITLE = "mb-2 font-['Caveat'] text-lg text-[#9d4b6a] md:text-xl";
export const POLL_INNER_BODY = "font-['Nunito'] text-sm leading-relaxed text-[#3d4f66]";

/** Pin-of-shame pink — CreateInk, shame board, etc. */
export const PINK_PANEL_SHADOW = "shadow-[0_4px_15px_rgba(219,39,119,0.1)]";
export const PINK_INNER_CARD =
  "rounded-xl border border-[#f9a8d4]/40 bg-white/80 px-4 py-3 shadow-sm md:px-5 md:py-4";
export const PINK_INNER_TITLE = "mb-2 font-['Caveat'] text-xl text-[#9d4b6a] md:text-2xl";
export const PINK_INNER_BODY = "font-['Nunito'] text-sm leading-relaxed text-[#3d4f66]";
export const PINK_ACCENT = "text-[#9d4b6a]";
export const PINK_HIGHLIGHT = "text-[#db2777]";

/** Spire-of-Azael purple — mood board, spire section, etc. */
export const PURPLE_PANEL_SHADOW = "shadow-[0_4px_15px_rgba(0,0,0,0.06)]";
export const PURPLE_ACCENT = "text-[#7c5c9a]";
export const PURPLE_LABEL = "text-[#8b7ab8]";

/** BookMatch blue — bookmatch, forms, logo sections, etc. */
export const BLUE_PANEL_SHADOW = "shadow-[0_4px_15px_rgba(90,143,201,0.12)]";
export const BLUE_INNER_CARD =
  "rounded-xl border border-[#8fb8ed]/40 bg-white/80 px-4 py-3 shadow-sm md:px-5 md:py-4";
export const BLUE_INNER_TITLE = "mb-2 font-['Caveat'] text-xl text-[#5a8fc9] md:text-2xl";
export const BLUE_INNER_BODY = "font-['Nunito'] text-sm leading-relaxed text-[#3d4f66]";
export const BLUE_ACCENT = "text-[#5a8fc9]";

/** Anime page panel fills — watching / top anime / rec form */
export const PROJECT_PANEL = {
  blue: "bg-[#e3eef9]",
  pink: "bg-[#fce7f3]",
  purple: "bg-[#ede8ff]",
  poll: `${SCRAPBOOK_GRADIENT} ${SCRAPBOOK_GRADIENT_SHADOW}`,
  shadow: "shadow-[0_4px_15px_rgba(0,0,0,0.06)]",
} as const;

/** Shared scrapbook form — anime rec, guestbook, etc. */
export const SCRAPBOOK_FORM = {
  shell:
    "relative rounded-[20px] bg-[#e3eef9] p-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)]",
  input:
    "rounded-xl border border-[#8fb8ed]/25 bg-white px-3 py-2 text-sm text-[#3d4f66] outline-none placeholder:text-[#3d4f66]/45 focus:border-[#8fb8ed]",
  textarea:
    "w-full resize-none rounded-xl border border-[#8fb8ed]/25 bg-white px-3 py-2 text-sm text-[#3d4f66] outline-none placeholder:text-[#3d4f66]/45 focus:border-[#8fb8ed]",
  submit:
    "mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#8fb8ed] py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7aa8e0]",
  success: "mt-2 text-center font-['Caveat'] text-lg text-[#5a8fc9]",
  paperClipColor: "#8fb8ed",
} as const;

export function ScrapbookForm({
  className = "",
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement> & { children: ReactNode }) {
  return (
    <form
      className={`${SCRAPBOOK_FORM.shell}${className ? ` ${className}` : ""}`}
      {...props}
    >
      <PaperClip
        className={STICKY_PAPER_CLIP.className}
        color={SCRAPBOOK_FORM.paperClipColor}
      />
      {children}
    </form>
  );
}

export interface WashiTapeProps {
  className?: string;
  /** Degrees — e.g. -12, 6, -8 */
  rotate?: number;
  /** Override size: default is h-6 (24px) × w-16 (64px) */
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  /** Label for devtools / comments only */
  id?: string;
}

export function WashiTape(_props: WashiTapeProps) {
  return null;
}

const WAVE_PATH =
  "M8 12 C48 4, 88 20, 128 12 S168 4, 208 12 S248 20, 288 12 S328 4, 368 12 S408 20, 448 12";

const waveSvgProps = {
  viewBox: "0 0 456 24",
  fill: "none" as const,
  overflow: "visible" as const,
  preserveAspectRatio: "xMidYMid meet" as const,
  className: "mx-auto my-6 block h-auto w-[94%] max-w-none text-[#8fb8ed]/50",
  "aria-hidden": true,
};

export function WavyDivider() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="w-full overflow-visible px-3">
        <svg {...waveSvgProps}>
          <path
            d={WAVE_PATH}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full overflow-visible px-3">
      <motion.svg
        {...waveSvgProps}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        variants={scrollRevealUp}
      >
        <path
          d={WAVE_PATH}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

/** Paper clip on yellow sticky notes — defaults from STICKY_PAPER_CLIP in siteData */
export function PaperClip({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`rounded-sm shadow-sm ${className ?? ""}`}
      style={{
        backgroundColor: color ?? "#c9a0d4",
        clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)",
      }}
      aria-hidden
    />
  );
}

export function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1l1.2 3.8H12l-3 2.2 1.1 3.5L7 8.3 3.9 10.5 5 7 2 5.8h3.8L7 1z"
        stroke="#8fb8ed"
        strokeWidth="1.2"
        fill="#fad980"
      />
    </svg>
  );
}
