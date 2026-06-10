import { motion } from "motion/react";
import { Link } from "react-router";
import { PINK_ACCENT, PINK_PANEL_SHADOW, PROJECT_PANEL, PaperClip } from "./ScrapbookDecor";
import { STICKY_PAPER_CLIP } from "../data/siteData";
import { springSnappy } from "../motion/presets";

interface StickyNotesProps {
  compact?: boolean;
}

export default function StickyNotes({ compact = false }: StickyNotesProps) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.02 }}
      animate={{ rotate: [-1, -2, -1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`relative rounded-[18px] p-3 ${PROJECT_PANEL.pink} ${PINK_PANEL_SHADOW} ${
        compact ? "flex h-full min-h-[11rem] flex-1 flex-col" : ""
      }`}
    >
      <PaperClip
        className={STICKY_PAPER_CLIP.className}
        color={STICKY_PAPER_CLIP.color}
      />

      <p className={`mb-1.5 font-['Caveat'] text-xl ${PINK_ACCENT}`}>leave a note!</p>

      {compact ? (
        <div className="mb-2 space-y-1.5 text-[11px] leading-relaxed text-[#3d4f66]/80">
          <p>say hi! open for requests ⊂(・▽・)⊃ recs and rants are also accepted!
          </p>
          <p className="font-medium text-[#3d4f66]/90">
            I&apos;ll read every message (人*´∀`*)｡*ﾟ+
          </p>
        </div>
      ) : (
        <p className="mb-3 text-[11px] leading-relaxed text-[#3d4f66]/75">
          say hi — i read every message (｡•̀ᴗ-)✧
        </p>
      )}

      <Link to="/about#guestbook" className={compact ? "mt-auto" : "mt-0"}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={springSnappy}
          className="block w-full rounded-full bg-white px-3 py-1.5 text-center text-xs font-semibold text-[#5a8fc9] shadow-sm"
        >
          open guestbook!
        </motion.span>
      </Link>
    </motion.div>
  );
}
