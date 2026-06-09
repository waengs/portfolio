/** Content + config for /fandoms/coc */

import { CI_BATMAN_INSTAGRAM, WAENGS_TIKTOK } from "./socialData";

/** Banner crop — edit objectPosition to reframe the photo (object-cover). */
export const COC_BANNER = {
  /**
   * Crop anchor for the banner image.
   * Format: "horizontal vertical" — lower vertical % shows MORE of the top.
   */
  objectPosition: "50% 30%",
} as const;

export const COC_INTRO_TITLE = "intelligent era";

export const COC_SOCIALS = [
  {
    label: "instagram",
    handle: `@${CI_BATMAN_INSTAGRAM.username}`,
    url: CI_BATMAN_INSTAGRAM.profileUrl,
  },
  {
    label: "tiktok",
    handle: `@${WAENGS_TIKTOK.username}`,
    url: WAENGS_TIKTOK.profileUrl,
  },
] as const;

export const COC_TIKTOK = {
  username: WAENGS_TIKTOK.username,
  profileUrl: WAENGS_TIKTOK.profileUrl,
  videos: [
    {
      title: "kevin trend",
      videoUrl: "https://vt.tiktok.com/ZSQMg3kWd/",
      videoId: "7388028916323126534",
    },
    {
      title: "trio nus",
      videoUrl: "https://vt.tiktok.com/ZSQMpayju/",
      videoId: "7388867700963036421",
    },
  ],
} as const;

export const COC_INTRO = [
  "Clash of champions rewired my brain. I learned I genuinely liked watching smart people solve problems. It kinda makes you feel smart too. The strategy, pressure — it had a whole nerdy olympics kinda vibe.",
  "Had a soft spot for Kevin cause he was just that quiet guy who's doing well, was rooting for him the whole competition.",
  "This competition made me weirdly competitive too, as a compsci student, can't fall behind! Gotta keep my GPA just as strong as theirs!",
  "The socials I used to use for my fan content are here:",
] as const;

export const COC_FOOTER = "still rooting for the smart kids 🧠";
