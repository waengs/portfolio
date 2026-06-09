import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "./ImageWithFallback";
import ClickableHeart from "./ClickableHeart";
import { getFandomCardCrop } from "../data/siteData";
import { springSnappy } from "../motion/presets";

/** Shared crop frame — home carousel + fandoms tab */
const FANDOM_CARD_IMAGE_HEIGHT = "h-[13rem] w-full sm:h-[14rem]";

interface FandomCardProps {
  label: string;
  blurb?: string;
  image: string;
  layout?: "wide" | "tall";
  index?: number;
  href?: string;
}

export default function FandomCard({
  label,
  blurb,
  image,
  layout = "wide",
  index = 0,
  href,
}: FandomCardProps) {
  const isWide = layout === "wide";
  const objectPosition = getFandomCardCrop(label);

  const card = (
    <motion.article
      whileHover={{ y: -4, rotate: index % 2 === 0 ? 1 : -1 }}
      transition={springSnappy}
      className="overflow-hidden rounded-[24px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
    >
      <div
        className={`relative isolate overflow-hidden rounded-[24px] ${FANDOM_CARD_IMAGE_HEIGHT}`}
      >
        <ImageWithFallback
          src={image}
          alt={label}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ objectPosition }}
        />

        <div
          className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t ${
            isWide
              ? "from-[#3d4f66]/85 via-[#3d4f66]/30 to-transparent"
              : "from-[#3d4f66]/55 via-transparent to-transparent"
          }`}
        />

        <div className={`absolute z-[5] overflow-visible ${isWide ? "top-3 right-3" : "top-3 right-3"}`}>
          <ClickableHeart />
        </div>

        {isWide ? (
          <div className="absolute bottom-0 left-0 right-0 z-[4] px-4 pb-4 pt-10">
            <h2 className="font-['Caveat'] text-2xl leading-tight text-white drop-shadow-md">
              {label}
            </h2>
            {blurb && (
              <p className="mt-1 text-xs leading-relaxed text-white drop-shadow-sm">
                {blurb}
              </p>
            )}
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 z-[4] p-3">
            <span className="inline-block rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#3d4f66] shadow-sm">
              {label}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {card}
      </Link>
    );
  }

  return card;
}
