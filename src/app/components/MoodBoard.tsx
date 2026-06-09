import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PROJECT_PANEL, PURPLE_ACCENT, PURPLE_LABEL, PURPLE_PANEL_SHADOW } from "./ScrapbookDecor";
import { CURRENT_OBSESSION } from "../data/siteData";

function ObsessionLine({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <p className="text-xs leading-relaxed text-[#3d4f66]">
      <span className={`font-['Nunito'] font-semibold ${PURPLE_LABEL}`}>{label}</span>{" "}
      {children}
    </p>
  );
}

export default function MoodBoard() {
  const { character, series, song, mood } = CURRENT_OBSESSION;

  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.02 }}
      animate={{ rotate: [-1, -2, -1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`relative flex h-full min-h-[11rem] flex-1 flex-col rounded-[22px] p-3 ${PROJECT_PANEL.purple} ${PURPLE_PANEL_SHADOW}`}
    >
      <p className={`mb-3 font-['Caveat'] text-xl leading-tight ${PURPLE_ACCENT}`}>
        <span aria-hidden>☁ </span>
        currently obsessed with
      </p>

      <div className="space-y-2 text-[#3d4f66]">
        <ObsessionLine label="♡ character:">
          <span className="font-['Caveat'] text-lg">{character.name}</span>
          <motion.span
            className="ml-1 inline-block text-base"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden
          >
            🐰
          </motion.span>
        </ObsessionLine>

        <ObsessionLine label="♡ series:">
          <span className="text-[#3d4f66]/90">{series}</span>
        </ObsessionLine>

        <ObsessionLine label="♡ song on repeat:">
          <span className="font-['Caveat'] text-base">{song.title}</span>{" "}
          <span className="text-[11px] text-[#3d4f66]/75">by {song.artist}</span>
        </ObsessionLine>

        <ObsessionLine label="♡ mood:">
          <span className="text-[#3d4f66]/90">
            <span aria-hidden>✦ </span>
            {mood}
            <span aria-hidden> ✦</span>
          </span>
        </ObsessionLine>
      </div>
    </motion.div>
  );
}
