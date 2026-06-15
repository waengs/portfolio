import { Link } from "react-router";
import { motion } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import { WavyDivider, WashiTape } from "../components/ScrapbookDecor";
import GuestbookSection from "../components/GuestbookSection";
import { ABOUT_ASSETS } from "../data/imageAssets";
import {
  ABOUT_FUN_FACTS,
  ABOUT_PAGE_PHOTO,
  ABOUT_SOCIALS,
} from "../data/aboutPageData";
import { SOCIAL_CHIP_CLASS } from "../data/socialData";
import { springSnappy } from "../motion/presets";

export default function AboutPage() {
  return (
    <div className="pb-8">
      <PageHeader
        title="about me!"
        subtitle="the artist behind the well, art"
        emoji="✨"
      />

      <ScrollReveal direction="scale" className="px-5 pb-6 md:grid md:grid-cols-[minmax(0,320px)_1fr] md:items-start md:gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="relative mx-auto max-w-[280px] rotate-[-1deg] rounded-[20px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:mx-0 md:max-w-none">
          <WashiTape className="-left-2 -top-2 -rotate-12" />
          <WashiTape className="-right-1 top-6 rotate-6" />
          <div className="overflow-hidden rounded-2xl bg-[#e8f0fa]">
            <ImageWithFallback
              src={ABOUT_ASSETS.page}
              alt="Cindy"
              className="aspect-square w-full object-cover"
              style={{ objectPosition: ABOUT_PAGE_PHOTO.objectPosition }}
            />
          </div>
          <p className="mt-3 text-center font-['Caveat'] text-xl text-[#5a8fc9]">
            hi, i&apos;m waengs ♡
          </p>
        </div>

        <div className="mt-6 rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:mt-0">
          <p className="mb-4 text-sm font-medium text-[#5a8fc9] md:text-base">
            💙🩵 • she/her
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
            <p>
              Yo, it&apos;s waengs. I&apos;m a digital artist who&apos;s also majoring in computer
              science (don&apos;t ask why it just happened that way). Though, I&apos;m happy it
              turned out this way, I learned all the nits and bits so now I can make my ideas into
              realities. Feel free to browse around too i got lots of fun fandom projects!
            </p>
            <p>
              I live and breathe fandom life, anime, mcyt, genshin, hsr, I&apos;ve been in all
              those spaces. It&apos;s been a couple of years since I&apos;ve participated in this
              space, so I&apos;ve gone through a lot of aliases (〒﹏〒). Let me introduce myself
              once again, I&apos;m waengs, or w43ngs, or dynereth, or ci_batman or hi_batman or
              even cindy, and here with all my alter egos, I say hello, y/n. Thanks for visiting, I
              hope you have fun. &lt;(￣︶￣)↗
            </p>
          </div>
        </div>
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <h2 className="mb-2 font-['Caveat'] text-2xl text-[#3d4f66]">socials</h2>
        <p className="mb-4 text-sm leading-relaxed text-[#3d4f66]/85 md:text-base">
          below are the list of my socials (mostly inactive), if you need to reach out, try your
          luck using waengs.
        </p>
        <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
          {ABOUT_SOCIALS.map((social) => (
            <li key={`${social.label}-${social.handle}`} className="min-w-0 sm:w-auto">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-full w-full items-center justify-center sm:inline-flex sm:w-auto sm:justify-start ${SOCIAL_CHIP_CLASS}`}
              >
                <span className="shrink-0 capitalize text-[#3d4f66]/70">{social.label}</span>
                <span className="truncate">{social.handle}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60 sm:h-3.5 sm:w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-8">
        <h2 className="mb-3 font-['Caveat'] text-2xl text-[#3d4f66]">
          <Sparkles className="mr-1 inline h-5 w-5 text-[#fad980]" />
          fun facts
        </h2>
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          {ABOUT_FUN_FACTS.map((fact, i) => (
            <motion.div
              key={fact}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rotate-[0.5deg] rounded-xl bg-[#ffe8f3] px-4 py-3 shadow-md"
              style={{ rotate: i % 2 === 0 ? -1 : 2 }}
            >
              <p className="text-sm text-[#3d4f66]">{fact}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      <WavyDivider />

      <div id="guestbook" className="scroll-mt-24">
        <ScrollReveal direction="up" className="px-5 pb-2">
          <h2 className="mb-1 font-['Caveat'] text-2xl text-[#3d4f66]">guestbook!</h2>
          <p className="mb-4 text-sm text-[#3d4f66]/75">
            leave a little note — i&apos;d love to hear from you
          </p>
          <GuestbookSection embedded />
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" className="px-5 text-center">
        <Link to="/">
          <motion.span
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            className="inline-block rounded-full bg-[#8fb8ed] px-6 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            ← back to home
          </motion.span>
        </Link>
      </ScrollReveal>
    </div>
  );
}
