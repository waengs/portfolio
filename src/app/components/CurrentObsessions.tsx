import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import FandomCard from "./FandomCard";
import { OBSESSIONS, getFandomDetailPath } from "../data/siteData";
import { springSnappy } from "../motion/presets";

export default function CurrentObsessions() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onResize = () => emblaApi.reInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("resize", onResize);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("resize", onResize);
    };
  }, [emblaApi]);

  return (
    <section className="relative px-5 pb-2">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-['Caveat'] text-3xl text-[#3d4f66]">
          interests
          <motion.span
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <Star className="h-5 w-5 fill-[#fad980] text-[#fad980]" />
          </motion.span>
        </h2>
        <motion.span
          className="font-['Caveat'] text-lg text-[#8fb8ed]"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          scroll! →
        </motion.span>
      </div>

      <div className="relative flex items-center gap-1">
        <motion.button
          type="button"
          onClick={scrollPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={springSnappy}
          aria-label="Previous"
          className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#5a8fc9] shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>

        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-3">
            {OBSESSIONS.map((item, i) => (
              <div
                key={item.label}
                className="min-w-0 flex-[0_0_68%] sm:flex-[0_0_52%] md:flex-[0_0_40%] lg:flex-[0_0_34%]"
              >
                <motion.div
                  animate={{
                    opacity: selectedIndex === i ? 1 : 0.88,
                  }}
                  transition={springSnappy}
                  className="h-full"
                >
                  <FandomCard
                    label={item.label}
                    image={item.image}
                    layout="tall"
                    index={i}
                    href={getFandomDetailPath(item.label) ?? "/fandoms"}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          onClick={scrollNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={springSnappy}
          aria-label="Next"
          className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#5a8fc9] shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {OBSESSIONS.map((_, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            animate={{
              width: i === selectedIndex ? 20 : 8,
              backgroundColor: i === selectedIndex ? "#8fb8ed" : "rgba(143, 184, 237, 0.35)",
            }}
            transition={springSnappy}
            className="h-2 rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
