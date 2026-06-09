import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, Send, Sparkles, Tv } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ArtLightbox from "../components/ArtLightbox";
import Corkboard from "../components/Corkboard";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import { SCRAPBOOK_FORM, ScrapbookForm, WavyDivider } from "../components/ScrapbookDecor";
import { ANIME_ASSETS } from "../data/imageAssets";
import {
  ANIME_BANNER,
  ANIME_FOOTER,
  ANIME_INTRO,
  ANIME_MAL,
  ANIME_PS,
  ANIME_REC_COPY,
  ANIME_TOP,
  ANIME_WATCHING,
} from "../data/animePageData";
import { ANIME_REC_CARD_COLORS, ANIME_REC_LIMITS } from "../data/animeRecData";
import { SOCIAL_CHIP_CLASS } from "../data/socialData";
import {
  canSubmitAnimeRec,
  fetchApprovedAnimeRecs,
  markAnimeRecSubmitted,
  submitAnimeRec,
  type PublicAnimeRec,
} from "../lib/animeRecs";
import { isFirebaseConfigured } from "../lib/firebase";
import { springSnappy } from "../motion/presets";

function AnimeListCard({
  title,
  genres,
  note,
  variant = "watching",
}: {
  title: string;
  genres: readonly string[];
  note: string;
  variant?: "watching" | "top";
}) {
  const chipClass =
    variant === "watching"
      ? "border-[#c9b8ef]/55 bg-white/60 text-[#8b7ab8]"
      : "border-[#db2777]/40 bg-white/60 text-[#9d4b6a]";

  return (
    <li className="rounded-xl bg-white/80 px-3 py-2.5 shadow-sm">
      <p className="font-semibold text-[#3d4f66]">{title}</p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {genres.map((genre) => (
          <span
            key={genre}
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${chipClass}`}
          >
            {genre}
          </span>
        ))}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-[#3d4f66]/80">{note}</p>
    </li>
  );
}

export default function AnimePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [recName, setRecName] = useState("");
  const [recAnime, setRecAnime] = useState("");
  const [recMessage, setRecMessage] = useState("");
  const [recWebsite, setRecWebsite] = useState("");
  const [recs, setRecs] = useState<PublicAnimeRec[]>([]);
  const [recSubmitted, setRecSubmitted] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [recSubmitting, setRecSubmitting] = useState(false);
  const [formReadyAt] = useState(() => Date.now());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    void fetchApprovedAnimeRecs()
      .then(setRecs)
      .catch(() => {
        // keep empty when firebase is unavailable
      });
  }, []);

  const lightboxItem =
    lightboxIndex !== null && ANIME_ASSETS.gallery[lightboxIndex]
      ? {
          src: ANIME_ASSETS.gallery[lightboxIndex],
          alt: `Anime art ${lightboxIndex + 1}`,
        }
      : null;

  const handleRecSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setRecError(null);

    const spamCheck = canSubmitAnimeRec(formReadyAt);
    if (!spamCheck.ok) {
      setRecError(spamCheck.error);
      return;
    }

    if (!recAnime.trim()) {
      setRecError("add an anime title first!");
      return;
    }

    setRecSubmitting(true);
    try {
      await submitAnimeRec({
        name: recName.trim(),
        anime: recAnime.trim(),
        message: recMessage.trim(),
        website: recWebsite,
      });
      markAnimeRecSubmitted();
      setRecName("");
      setRecAnime("");
      setRecMessage("");
      setRecWebsite("");
      setRecSubmitted(true);
      setTimeout(() => setRecSubmitted(false), 3000);
    } catch (err) {
      setRecError(err instanceof Error ? err.message : "could not send rec");
    } finally {
      setRecSubmitting(false);
    }
  };

  return (
    <div className="pb-10">
      <PageHeader
        title="anime zone"
        subtitle="mismatched beloved compilation"
        emoji="📺"
      />

      <ScrollReveal direction="scale" className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
            <ImageWithFallback
              src={ANIME_ASSETS.banner}
              alt="Anime banner"
              className="h-full w-full object-cover"
              style={{ objectPosition: ANIME_BANNER.objectPosition }}
            />
          </div>
          <div className="absolute bottom-3 left-4 rounded-full bg-[#fff9e5]/95 px-3 py-1 font-['Caveat'] text-xl text-[#5a8fc9] shadow-sm">
            waengs&apos; anime corner
          </div>
        </div>
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-6">
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">
            the master watchlist
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
            {ANIME_INTRO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={ANIME_MAL.profileUrl}
            target="_blank"
            rel="noreferrer"
            className={`mt-4 ${SOCIAL_CHIP_CLASS}`}
          >
            @{ANIME_MAL.username} on myanimelist
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="grid gap-4 px-5 pb-6 md:grid-cols-2 md:gap-6">
        <div className="rounded-[22px] bg-[#ede8ff] p-4 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-5">
          <h2 className="mb-3 flex items-center gap-2 font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">
            <Tv className="h-5 w-5 text-[#b39ddb]" />
            currently watching
          </h2>
          <ul className="space-y-2">
            {ANIME_WATCHING.map((item) => (
              <AnimeListCard
                key={item.title}
                title={item.title}
                genres={item.genres}
                note={item.note}
                variant="watching"
              />
            ))}
          </ul>
        </div>

        <div className="rounded-[22px] bg-[#fce4ec] p-4 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-5">
          <h2 className="mb-3 flex items-center gap-2 font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">
            <Sparkles className="h-5 w-5 text-[#db2777]" />
            top anime of all time
          </h2>
          <ul className="space-y-2">
            {ANIME_TOP.map((item) => (
              <AnimeListCard
                key={item.title}
                title={item.title}
                genres={item.genres}
                note={item.note}
                variant="top"
              />
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <h2 className="mb-3 font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">
          {ANIME_REC_COPY.title}
        </h2>
        <p className="mb-4 text-sm text-[#3d4f66]/75">{ANIME_REC_COPY.blurb}</p>

        <ScrapbookForm onSubmit={handleRecSubmit} className="mb-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={recName}
              onChange={(e) => setRecName(e.target.value)}
              placeholder="your name (optional)"
              maxLength={ANIME_REC_LIMITS.nameMax}
              className={SCRAPBOOK_FORM.input}
            />
            <input
              value={recAnime}
              onChange={(e) => setRecAnime(e.target.value)}
              placeholder="anime title *"
              required
              maxLength={ANIME_REC_LIMITS.animeMax}
              className={SCRAPBOOK_FORM.input}
            />
          </div>
          <textarea
            value={recMessage}
            onChange={(e) => setRecMessage(e.target.value)}
            placeholder="why i'll love it..."
            rows={2}
            maxLength={ANIME_REC_LIMITS.messageMax}
            className={`mt-2 ${SCRAPBOOK_FORM.textarea}`}
          />
          <input
            tabIndex={-1}
            autoComplete="off"
            value={recWebsite}
            onChange={(event) => setRecWebsite(event.target.value)}
            aria-hidden
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <motion.button
            type="submit"
            disabled={recSubmitting}
            whileHover={recSubmitting ? undefined : { scale: 1.02 }}
            whileTap={recSubmitting ? undefined : { scale: 0.96 }}
            transition={springSnappy}
            className={`${SCRAPBOOK_FORM.submit} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Send className="h-4 w-4" />
            {recSubmitting ? "sending..." : ANIME_REC_COPY.submitLabel}
          </motion.button>

          {recError ? (
            <p className="mt-2 text-center text-sm text-[#9d4b6a]">{recError}</p>
          ) : null}
          <AnimatePresence>
            {recSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={SCRAPBOOK_FORM.success}
              >
                {ANIME_REC_COPY.successMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </ScrapbookForm>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {recs.map((rec, i) => (
              <motion.div
                key={rec.id ?? `${rec.name}-${rec.anime}-${rec.message}-${i}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`${ANIME_REC_CARD_COLORS[i % ANIME_REC_CARD_COLORS.length]} relative rounded-xl p-4 shadow-md`}
                style={{ rotate: i % 2 === 0 ? -1 : 2 }}
              >
                <div className="absolute -top-2 left-4 text-lg" aria-hidden>
                  📌
                </div>
                <p className="text-xs font-semibold text-[#5a8fc9]">{rec.name}</p>
                <p className="font-['Caveat'] text-xl text-[#3d4f66]">{rec.anime}</p>
                <p className="text-sm text-[#3d4f66]/90">{rec.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">corkboard</h2>
          <Link
            to="/archive?fandom=anime"
            className="font-['Caveat'] text-lg text-[#8fb8ed] hover:underline"
          >
            full archive →
          </Link>
        </div>
        <Corkboard
          storageKey="waengs-anime-corkboard"
          items={ANIME_ASSETS.gallery.map((src, index) => ({
            id: src,
            src,
            alt: `anime art ${index + 1}`,
          }))}
          onItemTap={setLightboxIndex}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-4">
        <div className="mx-auto max-w-2xl rounded-[18px] bg-[#3d4f66]/[0.06] px-5 py-3 md:max-w-3xl">
          <p className="font-['Caveat'] text-lg leading-relaxed text-[#3d4f66]/55 sm:text-xl">
            {ANIME_PS}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6 text-center">
        <p className="font-['Caveat'] text-xl leading-relaxed text-[#5a8fc9] sm:text-2xl">{ANIME_FOOTER}</p>
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
          lightboxIndex !== null && lightboxIndex < ANIME_ASSETS.gallery.length - 1
            ? () => setLightboxIndex((index) => (index !== null ? index + 1 : null))
            : undefined
        }
      />
    </div>
  );
}
