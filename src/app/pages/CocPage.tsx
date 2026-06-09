import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ArtLightbox from "../components/ArtLightbox";
import Corkboard from "../components/Corkboard";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import { WavyDivider } from "../components/ScrapbookDecor";
import { COC_ASSETS } from "../data/imageAssets";
import {
  COC_BANNER,
  COC_FOOTER,
  COC_INTRO,
  COC_INTRO_TITLE,
  COC_SOCIALS,
  COC_TIKTOK,
} from "../data/cocPageData";
import { SOCIAL_CHIP_CLASS } from "../data/socialData";
import TikTokEmbed from "../components/TikTokEmbed";

export default function CocPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItem =
    lightboxIndex !== null && COC_ASSETS.gallery[lightboxIndex]
      ? {
          src: COC_ASSETS.gallery[lightboxIndex],
          alt: `CoC art ${lightboxIndex + 1}`,
        }
      : null;

  return (
    <div className="pb-10">
      <PageHeader
        title="clash of champions zone"
        subtitle="smart people doing smart people things"
        emoji="🏆"
      />

      <ScrollReveal direction="scale" className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
            <ImageWithFallback
              src={COC_ASSETS.banner}
              alt="Clash of Champions banner"
              className="h-full w-full object-cover"
              style={{ objectPosition: COC_BANNER.objectPosition }}
            />
          </div>
          <div className="absolute bottom-3 left-4 rounded-full bg-[#fff9e5]/95 px-3 py-1 font-['Caveat'] text-xl text-[#5a8fc9] shadow-sm">
            waengs&apos; coc corner
          </div>
        </div>
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-6">
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-9 sm:items-stretch sm:gap-5">
            <div className="sm:col-span-6">
              <h2 className="mb-3 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">
                {COC_INTRO_TITLE}
              </h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
                {COC_INTRO.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-3 flex flex-wrap gap-2">
                {COC_SOCIALS.map((social) => (
                  <li key={social.handle}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className={SOCIAL_CHIP_CLASS}
                    >
                      <span className="capitalize opacity-90">{social.label}</span>
                      {social.handle}
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-90" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {COC_ASSETS.introStickers[0] ? (
              <div className="sm:col-span-3">
                <ImageWithFallback
                  src={COC_ASSETS.introStickers[0]}
                  alt="Kevin"
                  className="h-full min-h-[10rem] w-full rounded-xl object-cover shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:min-h-0 sm:aspect-[3/4]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" eager className="px-5 pb-6">
        <h2 className="mb-3 font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">tiktok spotlight</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COC_TIKTOK.videos.map((video) => (
            <div
              key={video.title}
              className="rounded-[22px] bg-[#ede8ff] p-4 shadow-[0_4px_15px_rgba(0,0,0,0.06)]"
            >
              <p className="mb-2 font-['Caveat'] text-lg text-[#3d4f66]">{video.title}</p>
              <TikTokEmbed
                videoUrl={video.videoUrl}
                videoId={video.videoId}
                title={video.title}
                profileUrl={COC_TIKTOK.profileUrl}
                username={COC_TIKTOK.username}
              />
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">corkboard</h2>
          <Link
            to="/archive?fandom=clash%20of%20champions"
            className="font-['Caveat'] text-lg text-[#8fb8ed] hover:underline"
          >
            full archive →
          </Link>
        </div>
        <Corkboard
          storageKey="waengs-coc-corkboard"
          items={COC_ASSETS.gallery.map((src, index) => ({
            id: src,
            src,
            alt: `coc art ${index + 1}`,
          }))}
          onItemTap={setLightboxIndex}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6 text-center">
        <p className="font-['Caveat'] text-xl leading-relaxed text-[#5a8fc9] sm:text-2xl">{COC_FOOTER}</p>
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
          lightboxIndex !== null && lightboxIndex < COC_ASSETS.gallery.length - 1
            ? () => setLightboxIndex((index) => (index !== null ? index + 1 : null))
            : undefined
        }
      />
    </div>
  );
}
