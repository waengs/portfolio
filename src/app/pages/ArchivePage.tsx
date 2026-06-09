import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import PageHeader from "../components/PageHeader";
import FandomChips from "../components/FandomChips";
import ArtLightbox from "../components/ArtLightbox";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { filterArchiveByFandom, shuffleArray } from "../data/archiveData";
import { ARCHIVE_FANDOM_TAGS } from "../data/siteData";
import { springSnappy } from "../motion/presets";
import { artFrameClass, artImageClass } from "../utils/imageFormat";

const gridTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

export default function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fandomParam = searchParams.get("fandom");
  const activeFandom =
    fandomParam && (ARCHIVE_FANDOM_TAGS as readonly string[]).includes(fandomParam)
      ? fandomParam
      : null;

  const items = useMemo(() => {
    const filtered = filterArchiveByFandom(activeFandom);
    if (activeFandom) return filtered;
    return shuffleArray(filtered);
  }, [activeFandom]);

  const handleSelect = (tag: string | null) => {
    setLightboxIndex(null);
    if (tag) {
      setSearchParams({ fandom: tag }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const filterKey = activeFandom ?? "all";
  const lightboxItem =
    lightboxIndex !== null && items[lightboxIndex]
      ? {
          src: items[lightboxIndex].src,
          alt: `${items[lightboxIndex].fandom} art`,
          label: items[lightboxIndex].fandom,
        }
      : null;

  return (
    <div>
      <PageHeader
        title="the archive"
        subtitle={
          activeFandom
            ? `${items.length} piece${items.length === 1 ? "" : "s"} tagged ${activeFandom}`
            : `${items.length} pieces! peek anytime!`
        }
        emoji="📚"
      />

      <div className="mb-5 px-5">
        <FandomChips tags={ARCHIVE_FANDOM_TAGS} activeTag={activeFandom} onSelect={handleSelect} />
      </div>

      <AnimatePresence mode="sync" initial={false}>
        {items.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={gridTransition}
            className="px-5 pb-8 text-center text-sm text-[#3d4f66]/70"
          >
            no pieces for this fandom yet — try another tag!
          </motion.p>
        ) : (
          <motion.div
            key={filterKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={gridTransition}
            className="grid grid-cols-2 gap-3 px-5 pb-8 md:grid-cols-3 lg:grid-cols-4 md:gap-4"
          >
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                aria-label={`View ${item.fandom} art`}
                onClick={() => setLightboxIndex(index)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ...springSnappy,
                  delay: Math.min(index * 0.015, 0.12),
                }}
                whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 2 : -2, zIndex: 10 }}
                whileTap={{ scale: 0.96 }}
                className={`${artFrameClass(item.transparent)} cursor-zoom-in text-left`}
              >
                <ImageWithFallback
                  src={item.src}
                  alt={`${item.fandom} art`}
                  loading="lazy"
                  className={`${artImageClass(item.transparent)} pointer-events-none transition duration-300 group-hover:scale-105`}
                />
                {!item.transparent && (
                  <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold capitalize text-[#3d4f66] opacity-0 transition group-hover:opacity-100">
                    {item.fandom}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ArtLightbox
        item={lightboxItem}
        onClose={() => setLightboxIndex(null)}
        onPrev={
          lightboxIndex !== null && lightboxIndex > 0
            ? () => setLightboxIndex((index) => (index !== null ? index - 1 : null))
            : undefined
        }
        onNext={
          lightboxIndex !== null && lightboxIndex < items.length - 1
            ? () => setLightboxIndex((index) => (index !== null ? index + 1 : null))
            : undefined
        }
      />
    </div>
  );
}
