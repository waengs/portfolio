import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PageHeader from "../components/PageHeader";
import FandomCard from "../components/FandomCard";
import FandomChips from "../components/FandomChips";
import { WavyDivider } from "../components/ScrapbookDecor";
import { OBSESSIONS, getFandomDetailPath } from "../data/siteData";
import { springSnappy } from "../motion/presets";

const listTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

export default function FandomsPage() {
  const [activeFandom, setActiveFandom] = useState<string | null>(null);

  const visibleObsessions = useMemo(
    () =>
      activeFandom
        ? OBSESSIONS.filter((item) => item.label === activeFandom)
        : OBSESSIONS,
    [activeFandom],
  );

  const filterKey = activeFandom ?? "all";

  return (
    <div>
      <PageHeader
        title="interests"
        subtitle="everything i'm currently hyperfixated on"
        emoji="💙"
      />

      <div className="mb-6 px-5">
        <FandomChips activeTag={activeFandom} onSelect={setActiveFandom} />
      </div>

      <WavyDivider />

      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={filterKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={listTransition}
          className="space-y-4 px-5 pb-8 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-2"
        >
          {visibleObsessions.length === 0 ? (
            <p className="text-center text-sm text-[#3d4f66]/70">
              no fandom selected — tap a tag above!
            </p>
          ) : (
            visibleObsessions.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springSnappy, delay: i * 0.04 }}
              >
                <FandomCard
                  label={item.label}
                  blurb={item.blurb}
                  image={item.image}
                  layout="wide"
                  index={i}
                  href={getFandomDetailPath(item.label) ?? undefined}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
