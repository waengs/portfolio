import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { BookOpen, Cat, Code2, ExternalLink, Heart, Palette, Sparkles, Users } from "lucide-react";
import ArtLightbox from "./ArtLightbox";
import CupOCollectSection from "./CupOCollectSection";
import GithubProjectsSection from "./GithubProjectsSection";
import { ImageWithFallback } from "./ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import {
  BLUE_ACCENT,
  BLUE_INNER_BODY,
  BLUE_INNER_CARD,
  BLUE_INNER_TITLE,
  BLUE_PANEL_SHADOW,
  PINK_ACCENT,
  PINK_INNER_BODY,
  PINK_INNER_CARD,
  PINK_INNER_TITLE,
  PINK_PANEL_SHADOW,
  POLL_INNER_BODY,
  POLL_INNER_CARD,
  POLL_INNER_TITLE,
  PROJECT_PANEL,
  WavyDivider,
} from "./ScrapbookDecor";
import { PERSONAL_ASSETS } from "../data/imageAssets";
import {
  PERSONAL_BF_CATS,
  PERSONAL_SB_CARDS,
  PERSONAL_SECTIONS,
} from "../data/personalPageData";
import { springSnappy } from "../motion/presets";

type GalleryItem = { src: string; alt: string; label?: string; sbNumber?: number };

type CroppedGalleryItem = GalleryItem & { objectPosition: string };

type LightboxState = {
  items: GalleryItem[];
  index: number;
} | null;

function CroppedGallery({
  items,
  aspectRatio,
  onOpen,
  zoomable = true,
}: {
  items: readonly CroppedGalleryItem[];
  aspectRatio: string;
  onOpen?: (index: number) => void;
  zoomable?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
      {items.map((item, index) => {
        const frameClass =
          "group relative overflow-hidden rounded-[22px] bg-white p-0 text-left shadow-[0_4px_15px_rgba(0,0,0,0.08)]";

        if (!zoomable) {
          return (
            <div key={`${item.src}-${item.alt}`} className={frameClass} style={{ aspectRatio }}>
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: item.objectPosition }}
              />
            </div>
          );
        }

        return (
          <motion.button
            key={`${item.src}-${item.alt}`}
            type="button"
            aria-label={`View ${item.alt}`}
            onClick={() => onOpen?.(index)}
            whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 2 : -2 }}
            whileTap={{ scale: 0.96 }}
            transition={springSnappy}
            className={`${frameClass} cursor-zoom-in`}
            style={{ aspectRatio }}
          >
            <ImageWithFallback
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover"
              style={{ objectPosition: item.objectPosition }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

function ProjectGallery({
  items,
  onOpen,
  tall,
  transparent,
}: {
  items: readonly GalleryItem[];
  onOpen: (index: number) => void;
  tall?: boolean;
  transparent?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
      {items.map((item, index) => (
        <motion.button
          key={`${item.src}-${item.alt}`}
          type="button"
          aria-label={`View ${item.alt}`}
          onClick={() => onOpen(index)}
          whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 2 : -2 }}
          whileTap={{ scale: 0.96 }}
          transition={springSnappy}
          className={
            transparent
              ? `group relative flex cursor-zoom-in items-center justify-center overflow-visible p-0 text-left ${
                  tall ? "h-[12rem] sm:h-[13rem] md:h-[14rem]" : "h-[11rem] sm:h-[12.5rem] md:h-[14rem]"
                }`
              : `group relative flex cursor-zoom-in items-center justify-center overflow-hidden rounded-[22px] bg-white p-2 text-left shadow-[0_4px_15px_rgba(0,0,0,0.08)] ${
                  tall ? "h-[12rem] sm:h-[13rem] md:h-[14rem]" : "h-[11rem] sm:h-[12.5rem] md:h-[14rem]"
                }`
          }
        >
          <ImageWithFallback
            src={item.src}
            alt={item.alt}
            className={
              transparent
                ? "max-h-full max-w-full object-contain drop-shadow-[0_8px_20px_rgba(61,79,102,0.14)]"
                : "max-h-full max-w-full object-contain"
            }
          />
        </motion.button>
      ))}
    </div>
  );
}

function NameCardGallery({
  items,
  onOpen,
}: {
  items: readonly GalleryItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
      {items.map((item, index) => (
        <motion.button
          key={`${item.src}-${item.alt}`}
          type="button"
          aria-label={`View ${item.alt}`}
          onClick={() => onOpen(index)}
          whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 2 : -2 }}
          whileTap={{ scale: 0.96 }}
          transition={springSnappy}
          className="relative flex h-[11rem] cursor-zoom-in flex-col items-center justify-end overflow-hidden rounded-[22px] bg-white p-2 pb-3 shadow-[0_4px_15px_rgba(0,0,0,0.08)] sm:h-[12rem]"
        >
          <div className="flex flex-1 items-center justify-center">
            <ImageWithFallback
              src={item.src}
              alt={item.alt}
              className="max-h-[7.5rem] max-w-full object-contain"
            />
          </div>
          <div
            className={`mt-2 flex h-9 w-full items-center justify-center rounded-xl border-2 border-dashed px-2 ${
              item.label
                ? "border-[#8fb8ed] bg-[#e8f0fa]"
                : "border-[#8fb8ed]/25 bg-[#fff9e5]"
            }`}
          >
            {item.label ? (
              <span className="font-['Caveat'] text-2xl font-bold text-[#5a8fc9]">{item.label}</span>
            ) : (
              <span className="font-['Nunito'] text-[10px] font-semibold uppercase tracking-wide text-[#3d4f66]/45">
                sb{item.sbNumber ?? index}
              </span>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}

type ProjectDetail = {
  problem: string;
  solution: string;
  keyFeatures: readonly string[];
  myRole: string;
  technology: readonly string[];
};

const PANEL_DETAIL_CARD =
  "rounded-[18px] bg-white/90 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-5";
const PANEL_DETAIL_TITLE = "mb-2 font-['Caveat'] text-xl text-[#5a8fc9] md:text-2xl";
const PURPLE_DETAIL_TITLE = "mb-2 font-['Caveat'] text-xl text-[#7c5c9a] md:text-2xl";
const PANEL_DETAIL_BODY = "text-sm leading-relaxed text-[#3d4f66]/80";

function DetailCard({
  title,
  children,
  className = "",
  variant = "poll",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "poll" | "panel" | "purple" | "pink" | "blue";
}) {
  if (variant === "pink") {
    return (
      <div className={`${PINK_INNER_CARD} ${className}`}>
        <h3 className={PINK_INNER_TITLE}>{title}</h3>
        {children}
      </div>
    );
  }

  if (variant === "blue") {
    return (
      <div className={`${BLUE_INNER_CARD} ${className}`}>
        <h3 className={BLUE_INNER_TITLE}>{title}</h3>
        {children}
      </div>
    );
  }

  if (variant === "panel" || variant === "purple") {
    return (
      <div className={`${PANEL_DETAIL_CARD} ${className}`}>
        <h3 className={variant === "purple" ? PURPLE_DETAIL_TITLE : PANEL_DETAIL_TITLE}>
          {title}
        </h3>
        {children}
      </div>
    );
  }

  return (
    <div className={`${POLL_INNER_CARD} ${className}`}>
      <h3 className={POLL_INNER_TITLE}>{title}</h3>
      {children}
    </div>
  );
}

function ProjectDetailSections({
  detail,
  variant = "poll",
}: {
  detail: ProjectDetail;
  variant?: "poll" | "panel" | "purple" | "pink" | "blue";
}) {
  const bodyClass =
    variant === "poll"
      ? POLL_INNER_BODY
      : variant === "pink"
        ? PINK_INNER_BODY
        : variant === "blue"
          ? BLUE_INNER_BODY
          : PANEL_DETAIL_BODY;

  return (
    <div className="space-y-4">
      <DetailCard title="problem" variant={variant}>
        <p className={bodyClass}>{detail.problem}</p>
      </DetailCard>

      <DetailCard title="solution" variant={variant}>
        <p className={bodyClass}>{detail.solution}</p>
      </DetailCard>

      <div className="grid gap-4 md:grid-cols-2">
        <DetailCard title="key features" variant={variant}>
          <ul className={`list-inside list-disc space-y-1 ${bodyClass}`}>
            {detail.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </DetailCard>

        <DetailCard title="technology" variant={variant}>
          <ul className={`list-inside list-disc space-y-1 ${bodyClass}`}>
            {detail.technology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </DetailCard>
      </div>

      <DetailCard title="my role" variant={variant}>
        <p className={bodyClass}>{detail.myRole}</p>
      </DetailCard>
    </div>
  );
}

function HorizontalProjectGallery({
  items,
  onOpen,
  transparent,
}: {
  items: readonly GalleryItem[];
  onOpen: (index: number) => void;
  transparent?: boolean;
}) {
  return (
    <div className="relative">
      <p className="mb-2 text-right font-['Nunito'] text-[10px] font-semibold uppercase tracking-wide text-[#3d4f66]/45">
        scroll →
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#8fb8ed]/50 [&::-webkit-scrollbar-track]:bg-transparent">
        {items.map((item, index) => (
          <motion.button
            key={`${item.src}-${item.alt}`}
            type="button"
            aria-label={`View ${item.alt}`}
            onClick={() => onOpen(index)}
            whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 2 : -2 }}
            whileTap={{ scale: 0.96 }}
            transition={springSnappy}
            className={`w-[9.5rem] shrink-0 snap-start sm:w-[10.5rem] md:w-[11.5rem] ${
              transparent
                ? "group relative flex h-[11rem] cursor-zoom-in items-center justify-center overflow-visible p-0 text-left sm:h-[12.5rem] md:h-[14rem]"
                : "group relative flex h-[11rem] cursor-zoom-in items-center justify-center overflow-hidden rounded-[22px] bg-white p-2 text-left shadow-[0_4px_15px_rgba(0,0,0,0.08)] sm:h-[12.5rem] md:h-[14rem]"
            }`}
          >
            <ImageWithFallback
              src={item.src}
              alt={item.alt}
              className={
                transparent
                  ? "max-h-full max-w-full object-contain drop-shadow-[0_8px_20px_rgba(61,79,102,0.14)]"
                  : "max-h-full max-w-full object-contain"
              }
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function SectionBlock({
  icon: Icon,
  title,
  description,
  children,
  panel,
  accent = "blue",
}: {
  icon: typeof Palette;
  title: string;
  description: string;
  children: ReactNode;
  panel: "blue" | "pink" | "purple" | "poll";
  accent?: "blue" | "purple" | "pink";
}) {
  const shellClass =
    panel === "poll"
      ? `rounded-[22px] p-4 md:p-5 ${PROJECT_PANEL.poll}`
      : panel === "pink"
        ? `rounded-[22px] p-4 md:p-5 ${PROJECT_PANEL.pink} ${PINK_PANEL_SHADOW}`
        : panel === "blue"
          ? `rounded-[22px] p-4 md:p-5 ${PROJECT_PANEL.blue} ${BLUE_PANEL_SHADOW}`
          : `rounded-[22px] p-4 md:p-5 ${PROJECT_PANEL[panel]} ${PROJECT_PANEL.shadow}`;
  const accentColor =
    accent === "purple"
      ? "text-[#7c5c9a]"
      : accent === "pink"
        ? PINK_ACCENT
        : BLUE_ACCENT;

  return (
    <ScrollReveal direction="up" className="px-5 pb-6">
      <div className={shellClass}>
        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 ${accentColor}`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h2 className={`font-['Caveat'] text-2xl md:text-3xl ${accentColor}`}>{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#3d4f66]/80">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </ScrollReveal>
  );
}

export default function PersonalProjectsContent() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const logoItems = useMemo(
    () =>
      PERSONAL_ASSETS.logos.map((src) => ({
        src,
        alt: "logo design",
      })),
    [],
  );

  const bfCatItems = useMemo(
    () =>
      PERSONAL_ASSETS.bfCats.map(({ src, filename }, index) => ({
        src,
        alt: `catstory ${index + 1}`,
        objectPosition:
          PERSONAL_BF_CATS.crops[filename] ?? PERSONAL_BF_CATS.defaultObjectPosition,
      })),
    [],
  );

  const sbItems = useMemo(
    () =>
      PERSONAL_ASSETS.sb.map((src, index) => {
        const card = PERSONAL_SB_CARDS[index];
        return {
          src,
          alt: `sb${card?.number ?? index}`,
          label: card?.initial,
          sbNumber: card?.number,
        };
      }),
    [],
  );

  const spirePixelItems = useMemo(
    () =>
      PERSONAL_ASSETS.spire.pixelRoster.map((src, index) => ({
        src,
        alt: `spire character ${index + 1}`,
      })),
    [],
  );

  const birthdayItems = useMemo(
    () =>
      PERSONAL_ASSETS.partner.birthday.map((src, index) => ({
        src,
        alt: `birthday ${index + 1}`,
      })),
    [],
  );

  const openLightbox = (items: GalleryItem[], index: number) => {
    setLightbox({ items, index });
  };

  const lightboxItem = lightbox
    ? {
        src: lightbox.items[lightbox.index].src,
        alt: lightbox.items[lightbox.index].alt,
        label: lightbox.items[lightbox.index].label,
      }
    : null;

  const birthdayApp = PERSONAL_SECTIONS.birthdayApp;
  const createInk = PERSONAL_SECTIONS.createInk;
  const spire = PERSONAL_SECTIONS.spire;
  const bookmatch = PERSONAL_SECTIONS.bookmatch;

  return (
    <>
      <SectionBlock
        icon={Sparkles}
        title={createInk.title}
        description={createInk.description}
        panel="pink"
        accent="pink"
      >
        <ProjectDetailSections detail={createInk} variant="pink" />

        <a
          href={createInk.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#8fb8ed] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7aa8e0]"
        >
          {createInk.linkLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </SectionBlock>

      <SectionBlock
        icon={Code2}
        title={spire.title}
        description={spire.description}
        panel="purple"
        accent="purple"
      >
        <ProjectDetailSections detail={spire} variant="purple" />

        <DetailCard title="art & characters" className="mt-4" variant="purple">
          <p className="mb-2 font-['Caveat'] text-lg text-[#7c5c9a] md:text-xl">{spire.mcLabel}</p>
          <motion.button
            type="button"
            aria-label="View hero MC full sketch"
            onClick={() =>
              openLightbox([{ src: PERSONAL_ASSETS.spire.mc, alt: "hero MC full sketch" }], 0)
            }
            whileHover={{ scale: 1.02 }}
            transition={springSnappy}
            className="mb-5 flex w-full max-w-md cursor-zoom-in items-center justify-center overflow-visible p-0"
          >
            <ImageWithFallback
              src={PERSONAL_ASSETS.spire.mc}
              alt="Hero MC full sketch"
              className="max-h-[240px] w-auto object-contain drop-shadow-[0_8px_20px_rgba(61,79,102,0.14)]"
            />
          </motion.button>

          <p className="mb-2 font-['Caveat'] text-lg text-[#7c5c9a] md:text-xl">{spire.rosterLabel}</p>
          <HorizontalProjectGallery
            items={spirePixelItems}
            onOpen={(index) => openLightbox(spirePixelItems, index)}
            transparent
          />
        </DetailCard>
      </SectionBlock>

      <SectionBlock
        icon={BookOpen}
        title={bookmatch.title}
        description={bookmatch.description}
        panel="blue"
        accent="blue"
      >
        <ProjectDetailSections detail={bookmatch} variant="blue" />

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={bookmatch.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#8fb8ed] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7aa8e0]"
          >
            {bookmatch.demoLinkLabel}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={bookmatch.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#5a8fc9] shadow-sm transition hover:bg-white"
          >
            {bookmatch.linkLabel}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </SectionBlock>

      <SectionBlock
        icon={Heart}
        title={birthdayApp.title}
        description={birthdayApp.description}
        panel="pink"
        accent="pink"
      >
        <ProjectGallery
          items={birthdayItems}
          onOpen={(index) => openLightbox(birthdayItems, index)}
          tall
        />
        <a
          href={birthdayApp.appUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#8fb8ed] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7aa8e0]"
        >
          {birthdayApp.appLinkLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </SectionBlock>

      <GithubProjectsSection />

      <WavyDivider />

      <CupOCollectSection />

      <SectionBlock
        icon={Palette}
        title={PERSONAL_SECTIONS.logos.title}
        description={PERSONAL_SECTIONS.logos.description}
        panel="blue"
      >
        <ProjectGallery items={logoItems} onOpen={(index) => openLightbox(logoItems, index)} />
      </SectionBlock>

      <SectionBlock
        icon={Cat}
        title={PERSONAL_SECTIONS.catstory.title}
        description={PERSONAL_SECTIONS.catstory.description}
        panel="pink"
        accent="pink"
      >
        <CroppedGallery
          items={bfCatItems}
          aspectRatio={PERSONAL_BF_CATS.aspectRatio}
          zoomable={false}
        />
      </SectionBlock>

      <SectionBlock
        icon={Users}
        title={PERSONAL_SECTIONS.sb.title}
        description={PERSONAL_SECTIONS.sb.description}
        panel="purple"
        accent="purple"
      >
        <NameCardGallery items={sbItems} onOpen={(index) => openLightbox(sbItems, index)} />
      </SectionBlock>

      <ArtLightbox
        item={lightboxItem}
        onClose={() => setLightbox(null)}
        onPrev={
          lightbox && lightbox.index > 0
            ? () => setLightbox((state) => state && { ...state, index: state.index - 1 })
            : undefined
        }
        onNext={
          lightbox && lightbox.index < lightbox.items.length - 1
            ? () => setLightbox((state) => state && { ...state, index: state.index + 1 })
            : undefined
        }
      />
    </>
  );
}
