import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import ArtLightbox from "./ArtLightbox";
import { ImageWithFallback } from "./ImageWithFallback";
import { ScrollReveal, ScrollRevealStagger, scrollStaggerItem } from "./ScrollReveal";
import { springSnappy } from "../motion/presets";
import { artFrameClass, artImageClass, isTransparentImage } from "../utils/imageFormat";

interface ArtGridProps {
  title: string;
  titleEmoji?: string;
  images: string[];
  columns?: 2 | 4;
  linkTo?: string;
}

export default function ArtGrid({
  title,
  titleEmoji,
  images,
  columns = 4,
  linkTo,
}: ArtGridProps) {
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItem =
    lightboxIndex !== null && images[lightboxIndex]
      ? {
          src: images[lightboxIndex],
          alt: `Art ${lightboxIndex + 1}`,
        }
      : null;

  return (
    <section className="px-5 pb-4">
      <ScrollReveal direction="up">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="flex items-center gap-2 font-['Caveat'] text-3xl text-[#3d4f66]">
            {title}
            {titleEmoji ? (
              <motion.span
                className="text-2xl"
                animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                {titleEmoji}
              </motion.span>
            ) : null}
          </h2>
          {linkTo ? (
            <motion.span whileHover={{ x: 4 }} transition={springSnappy}>
              <Link
                to={linkTo}
                className="font-['Caveat'] text-lg text-[#8fb8ed] hover:underline"
              >
                peek inside →
              </Link>
            </motion.span>
          ) : (
            <motion.button
              type="button"
              whileHover={{ x: 4 }}
              transition={springSnappy}
              className="font-['Caveat'] text-lg text-[#8fb8ed]"
            >
              peek inside →
            </motion.button>
          )}
        </div>
      </ScrollReveal>

      <ScrollRevealStagger className={`grid ${colClass} gap-2`}>
        {images.map((src, index) => {
          const transparent = isTransparentImage(src);

          return (
            <motion.button
              key={src}
              type="button"
              aria-label={`View art piece ${index + 1}`}
              onClick={() => setLightboxIndex(index)}
              variants={scrollStaggerItem}
              whileHover={{ scale: 1.06, rotate: index % 2 === 0 ? 3 : -3, zIndex: 10 }}
              whileTap={{ scale: 0.94 }}
              transition={springSnappy}
              className={`${artFrameClass(transparent)} cursor-zoom-in text-left`}
            >
              <ImageWithFallback
                src={src}
                alt={`Art ${index + 1}`}
                className={`pointer-events-none ${artImageClass(
                  transparent,
                  transparent ? "" : "saturate-[0.85] hue-rotate-[10deg]",
                )}`}
              />
            </motion.button>
          );
        })}
      </ScrollRevealStagger>

      <ArtLightbox
        item={lightboxItem}
        onClose={() => setLightboxIndex(null)}
        onPrev={
          lightboxIndex !== null && lightboxIndex > 0
            ? () => setLightboxIndex((index) => (index !== null ? index - 1 : null))
            : undefined
        }
        onNext={
          lightboxIndex !== null && lightboxIndex < images.length - 1
            ? () => setLightboxIndex((index) => (index !== null ? index + 1 : null))
            : undefined
        }
      />
    </section>
  );
}
