import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "./ImageWithFallback";
import { WashiTape } from "./ScrapbookDecor";
import { ScrollReveal } from "./ScrollReveal";
import { ABOUT_ASSETS } from "../data/imageAssets";
import { ABOUT_HOME_PHOTO } from "../data/aboutPageData";
import { springSnappy } from "../motion/presets";

export default function AboutSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      className={`flex gap-4 px-5 md:gap-6 ${
        embedded ? "pb-4 pt-0 md:pb-6" : "py-2 md:py-4"
      }`}
    >
      <ScrollReveal direction="left" className="shrink-0">
        <motion.div
          className="relative"
          whileHover={{ rotate: -3, scale: 1.03 }}
          transition={springSnappy}
        >
          <div className="relative rotate-[-2deg] rounded-2xl bg-white p-2 shadow-[0_4px_15px_rgba(0,0,0,0.08)]">
            <WashiTape className="-left-1 -top-1 -rotate-6" />
            <div className="h-[200px] w-[120px] overflow-hidden rounded-xl bg-[#dce9f7] md:h-[175px] md:w-[140px]">
              <ImageWithFallback
                src={ABOUT_ASSETS.home}
                alt="Cindy"
                className="h-full w-full object-cover"
                style={{ objectPosition: ABOUT_HOME_PHOTO.objectPosition }}
              />
            </div>
          </div>
        </motion.div>
      </ScrollReveal>

      <ScrollReveal direction="right" className="min-w-0 flex-1 pt-1">
        <h2 className="mb-2 font-['Caveat'] text-2xl leading-tight text-[#3d4f66]">
          drawn with coffee, 
          <br />
          a little bit of insanity
          <br />
          &amp; lots of love 💕
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-[#3d4f66]/85 md:text-sm">
          I draw fanart, ocs (sometimes), just whatever my current hyperfixation wants me to
          draw. Fully digital art. Don&apos;t come for me 🙏.
        </p>
        <div className="flex items-center gap-2">
          <Link to="/about">
            <motion.span
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
              className="inline-block rounded-full bg-[#8fb8ed] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              about me →
            </motion.span>
          </Link>
          <motion.span
            className="text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            aria-hidden
          >
            😼
          </motion.span>
        </div>
      </ScrollReveal>
    </section>
  );
}
