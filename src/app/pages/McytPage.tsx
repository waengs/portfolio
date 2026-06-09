import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, Pickaxe, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ArtLightbox from "../components/ArtLightbox";
import Corkboard from "../components/Corkboard";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  PaperClip,
  SCRAPBOOK_GRADIENT,
  SCRAPBOOK_GRADIENT_SHADOW,
  WashiTape,
  WavyDivider,
} from "../components/ScrapbookDecor";
import { MCYT_ASSETS } from "../data/imageAssets";
import {
  MCYT_ANIMATICS_CREDIT,
  MCYT_ANIMATICS_INTRO,
  MCYT_BANNER,
  MCYT_FANFICS,
  MCYT_FOOTER,
  MCYT_INSTAGRAM,
  MCYT_INTRO,
  MCYT_INTRO_TITLE,
  MCYT_VIDEOS,
} from "../data/mcytPageData";
import { SOCIAL_CHIP_CLASS } from "../data/socialData";
import { springSnappy } from "../motion/presets";
import { ImageWithFallback } from "../components/ImageWithFallback";

const FIC_RESPONSE_BOX =
  "relative w-full min-h-[4.25rem] rounded-[18px] px-4 py-3";

const FIC_EMOJI: Record<string, string> = {
  teaming: "🏫",
  "purple-clematis": "💜",
  "no-solution": "💔",
};

export default function McytPage() {
  const [selectedFic, setSelectedFic] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItem =
    lightboxIndex !== null && MCYT_ASSETS.gallery[lightboxIndex]
      ? {
          src: MCYT_ASSETS.gallery[lightboxIndex],
          alt: `MCYT art ${lightboxIndex + 1}`,
        }
      : null;

  const activeFic = MCYT_FANFICS.find((fic) => fic.id === selectedFic);

  return (
    <div className="pb-10">
      <PageHeader title="mcyt zone" subtitle="block game fanart & pandemic brainrot" emoji="⛏️" />

      <ScrollReveal direction="scale" className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
            <ImageWithFallback
              src={MCYT_ASSETS.banner}
              alt="MCYT banner"
              className="h-full w-full object-cover"
              style={{ objectPosition: MCYT_BANNER.objectPosition }}
            />
          </div>
          <div className="absolute bottom-3 left-4 rounded-full bg-[#fff9e5]/95 px-3 py-1 font-['Caveat'] text-xl text-[#5a8fc9] shadow-sm">
            waengs&apos; mcyt corner
          </div>
        </div>
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-6">
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">
            {MCYT_INTRO_TITLE}
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
            {MCYT_INTRO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <a
            href={MCYT_INSTAGRAM.url}
            target="_blank"
            rel="noreferrer"
            className={`mt-4 ${SOCIAL_CHIP_CLASS}`}
          >
            @{MCYT_INSTAGRAM.newHandle} on instagram
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div
          className={`relative overflow-visible rounded-[24px] p-4 md:p-6 ${SCRAPBOOK_GRADIENT} ${SCRAPBOOK_GRADIENT_SHADOW}`}
        >
          <WashiTape className="-right-2 top-3 z-10 rotate-12" width={52} height={16} />
          <motion.span
            className="pointer-events-none absolute -left-1 top-8 text-lg opacity-40"
            animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            📖
          </motion.span>

          <div className="mb-4 flex items-start gap-2">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#db2777]" />
            <div>
              <h2 className="font-['Caveat'] text-3xl leading-tight text-[#3d4f66] md:text-4xl">
                fanfic recs
              </h2>
            </div>
          </div>

          <div className="space-y-2.5">
            {MCYT_FANFICS.map((fic, index) => {
              const active = selectedFic === fic.id;
              const emoji = FIC_EMOJI[fic.id] ?? "📖";

              return (
                <motion.button
                  key={fic.id}
                  type="button"
                  onClick={() => setSelectedFic((current) => (current === fic.id ? null : fic.id))}
                  whileHover={{ x: 5, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springSnappy}
                  className={`group flex w-full items-center gap-3 rounded-full border-2 px-3 py-2.5 text-left shadow-sm transition md:px-4 md:py-3 ${
                    active
                      ? "border-[#b39ddb] bg-white/95 shadow-[0_4px_14px_rgba(179,157,219,0.35)]"
                      : "border-white/80 bg-white/75 hover:border-[#f9a8d4]/60 hover:bg-white/90"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? "bg-[#ede8ff] text-[#8b7ab8]"
                        : "bg-[#fce4ec] text-[#9d4b6a]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-['Nunito'] text-sm font-semibold text-[#3d4f66] md:text-base">
                      {fic.title}
                    </span>
                    {fic.author ? (
                      <span className="block text-xs text-[#3d4f66]/70">by {fic.author}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-base opacity-90" aria-hidden>
                    {emoji}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="relative mt-4">
            <AnimatePresence mode="wait">
              {activeFic ? (
                <motion.div
                  key={activeFic.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={springSnappy}
                  className={`${FIC_RESPONSE_BOX} bg-[#ede8ff] shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-[#c9b8ef]/50`}
                >
                  <PaperClip className="absolute -right-1 -top-3 z-10" color="#b39ddb" />
                  <p className="text-sm leading-relaxed text-[#6b5b95] md:text-base">
                    {activeFic.blurb}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeFic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-[#5a4a8a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {activeFic.url ? (
                    <a
                      href={activeFic.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#5a4a8a] shadow-sm transition hover:bg-white"
                    >
                      read on ao3
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${FIC_RESPONSE_BOX} flex items-center justify-center border border-dashed border-[#db2777]/25 bg-white/40 text-center font-['Caveat'] text-lg text-[#9d4b6a]/80`}
                >
                  pick a fic to read my ramble ♡
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <h2 className="mb-2 font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">animatics</h2>
        <p className="mb-4 text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
          {MCYT_ANIMATICS_INTRO}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {MCYT_VIDEOS.map((video, index) => {
            const src = MCYT_ASSETS.videos[index];
            return (
              <div
                key={video.title}
                className="overflow-hidden rounded-[22px] bg-[#e8f0fa] p-3 shadow-[0_4px_15px_rgba(0,0,0,0.06)]"
              >
                <p className="mb-2 font-['Caveat'] text-lg text-[#5a8fc9]">{video.title}</p>
                {src ? (
                  <div className="aspect-video overflow-hidden rounded-xl bg-black">
                    <video
                      src={src}
                      title={video.title}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl bg-[#eef4fc] p-4 text-center">
                    <Pickaxe className="h-8 w-8 text-[#8fb8ed]/70" aria-hidden />
                    <p className="text-xs text-[#3d4f66]/75">video coming soon</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center font-['Caveat'] text-lg text-[#3d4f66]/80">
          {MCYT_ANIMATICS_CREDIT}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">corkboard</h2>
          <Link
            to="/archive?fandom=mcyt"
            className="font-['Caveat'] text-lg text-[#8fb8ed] hover:underline"
          >
            full archive →
          </Link>
        </div>
        <Corkboard
          storageKey="waengs-mcyt-corkboard"
          items={MCYT_ASSETS.gallery.map((src, index) => ({
            id: src,
            src,
            alt: `mcyt art ${index + 1}`,
          }))}
          onItemTap={setLightboxIndex}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6 text-center">
        <p className="font-['Caveat'] text-xl leading-relaxed text-[#5a8fc9] sm:text-2xl">
          {MCYT_FOOTER}
        </p>
      </ScrollReveal>

      <div className="px-5">
        <Link
          to="/fandoms"
          className="inline-flex items-center gap-2 rounded-full bg-[#8fb8ed]/25 px-4 py-2 text-sm font-medium text-[#5a8fc9] transition hover:bg-[#8fb8ed]/40"
        >
          <ArrowLeft className="h-4 w-4" />
          back to interests
        </Link>
      </div>

      <ArtLightbox
        item={lightboxItem}
        onClose={() => setLightboxIndex(null)}
        onPrev={
          lightboxIndex !== null && lightboxIndex > 0
            ? () => setLightboxIndex((index) => (index !== null ? index - 1 : null))
            : undefined
        }
        onNext={
          lightboxIndex !== null && lightboxIndex < MCYT_ASSETS.gallery.length - 1
            ? () => setLightboxIndex((index) => (index !== null ? index + 1 : null))
            : undefined
        }
      />
    </div>
  );
}
