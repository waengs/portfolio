import { motion } from "motion/react";
import { useMemo } from "react";
import PortfolioHeader from "../components/PortfolioHeader";
import HeroSection from "../components/HeroSection";
import CurrentObsessions from "../components/CurrentObsessions";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ArtGrid from "../components/ArtGrid";
import MoodBoard from "../components/MoodBoard";
import StickyNotes from "../components/StickyNotes";
import { ScrollReveal } from "../components/ScrollReveal";
import { WavyDivider } from "../components/ScrapbookDecor";
import { pickRandomArchiveImages } from "../data/archiveData";
import { scrollViewport } from "../motion/presets";

export default function HomePage() {
  const archivePreview = useMemo(() => pickRandomArchiveImages(4), []);

  return (
    <div>
      <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-8 lg:gap-x-12">
        <div className="flex flex-col">
          <ScrollReveal direction="up" eager>
            <PortfolioHeader />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.08}>
            <AboutSection embedded />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12}>
            <ProjectsSection embedded />
          </ScrollReveal>
        </div>

        <ScrollReveal direction="scale" delay={0.05} className="md:justify-self-end md:pr-1">
          <HeroSection />
        </ScrollReveal>
      </div>

      <WavyDivider />

      <ScrollReveal direction="up">
        <CurrentObsessions />
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up">
        <ArtGrid
          title="from the archive"
          titleEmoji="🔍"
          images={archivePreview}
          linkTo="/archive"
        />
      </ScrollReveal>

      <WavyDivider />

      <div className="grid grid-cols-2 items-stretch gap-3 px-5 pb-6 md:max-w-2xl lg:max-w-none">
        <ScrollReveal direction="left" className="flex h-full min-h-0 flex-col">
          <MoodBoard />
        </ScrollReveal>
        <ScrollReveal direction="right" className="flex h-full min-h-0 flex-col">
          <StickyNotes compact />
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up">
        <footer className="px-5 pb-4 text-center">
          <p className="font-['Caveat'] text-2xl text-[#3d4f66]">
            thanks for visiting my hub!
          </p>
          <p className="font-['Caveat'] text-xl text-[#8fb8ed]">
            come again anytime &lt;3
          </p>
          <motion.span
            className="mt-2 inline-block text-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ delay: 0.3, duration: 0.6 }}
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
            aria-hidden
          >
            😼
          </motion.span>
        </footer>
      </ScrollReveal>
    </div>
  );
}
