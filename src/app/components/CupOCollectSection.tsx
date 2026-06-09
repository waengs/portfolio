import { motion } from "motion/react";
import { ExternalLink, FolderKanban } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import { PROJECT_PANEL, PURPLE_ACCENT, PURPLE_PANEL_SHADOW } from "./ScrapbookDecor";
import { ANIME_ASSETS, MIHOYO_ASSETS } from "../data/imageAssets";
import { CUP_O_COLLECT } from "../data/cupOCollectData";
import { springSnappy } from "../motion/presets";

const CUP_O_COLLECT_IMAGES = [...ANIME_ASSETS.cupOCollect, ...MIHOYO_ASSETS.cupOCollect];

export default function CupOCollectSection() {
  return (
    <ScrollReveal direction="up" className="px-5 pb-6">
      <div className={`rounded-[22px] p-4 md:p-5 ${PROJECT_PANEL.purple} ${PURPLE_PANEL_SHADOW}`}>
        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 ${PURPLE_ACCENT}`}
          >
            <FolderKanban className="h-4 w-4" />
          </div>
          <div>
            <h2 className={`font-['Caveat'] text-2xl md:text-3xl ${PURPLE_ACCENT}`}>
              {CUP_O_COLLECT.name}
            </h2>
            <div className="mt-2 space-y-2.5 text-sm leading-relaxed text-[#3d4f66]/80">
              {CUP_O_COLLECT.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {CUP_O_COLLECT_IMAGES.map((src) => (
            <motion.div
              key={src}
              whileHover={{ scale: 1.02 }}
              transition={springSnappy}
              className="flex justify-center"
            >
              <ImageWithFallback
                src={src}
                alt="cup.o.collect merch"
                className="h-auto max-h-[200px] w-auto max-w-full object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:max-h-[220px] md:max-h-[240px]"
              />
            </motion.div>
          ))}
        </div>

        <a
          href={CUP_O_COLLECT.instagram.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#8fb8ed] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7aa8e0]"
        >
          @{CUP_O_COLLECT.instagram.username} on instagram
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </ScrollReveal>
  );
}
