/** Content + config for /fandoms/mcyt */

import { DYNERETH_INSTAGRAM } from "./socialData";

/** Banner crop — edit objectPosition to reframe the photo (object-cover). */
export const MCYT_BANNER = {
  /**
   * Crop anchor for the banner image.
   * Format: "horizontal vertical" — lower vertical % shows MORE of the top.
   */
  objectPosition: "50% 11%",
} as const;

export const MCYT_INSTAGRAM = {
  oldHandle: "w43ngs",
  newHandle: DYNERETH_INSTAGRAM.username,
  url: DYNERETH_INSTAGRAM.profileUrl,
} as const;

export const MCYT_INTRO_TITLE = "minecraft pandemic";

export const MCYT_INTRO = [
  "Mcyt is actually how i started posting fanart. It was the start of the pandemic, we were all locked into our own homes. Of course a lot of us turned to the internet for entertainment, and from there, it started the golden age of minecraft youtubers (don't get me wrong, I've always been into minecraft even before the pandemic, but this was when everything turned mainstream). Had an instagram and made online friends for the first time, had a lot of free time too so participated in a lot of dtiys and tried my hand at animating (I'm not gonna touch this again). And after the resurgence of minecraft due to minecraft civilisation, I've been following mcyt again.",
  "Just a PSA, I changed my handle from w43ngs to dynereth, thats why some of the art has a w43ngs watermark (｢`･ω･)｢ Here's my new handle:",
] as const;

export const MCYT_ANIMATICS_INTRO =
  "Like I said, I clearly underestimated the work put in to animate things. I haven't really touched an animation project ever since. (I have some wips I want to finish tho hehe)";

export const MCYT_ANIMATICS_CREDIT = "credits to egg the songwriter";

/** Animatic titles — video files live in MCYT/mcytvid1.mp4 & mcytvid2.mp4 (see imageAssets) */
export const MCYT_VIDEOS = [
  { title: "sorry haha I fell asleep pt.1" },
  { title: "sorry haha I fell asleep pt.2" },
] as const;

export const MCYT_FANFICS = [
  {
    id: "teaming",
    title: "Teaming",
    author: "dontrollthedice",
    tags: ["skephalo au", "highschool"],
    blurb:
      "it's a fun lighthearted fic filled with classic skeppy trolling and shenanigans",
    url: "https://archiveofourown.org/works/24436597/chapters/58960687",
  },
  {
    id: "purple-clematis",
    title: "Purple Clematis",
    author: "Kuruv",
    tags: ["thomflux au", "soulmates"],
    blurb:
      "nothing hits harder than a well writen soulmate au sprinkled with a little misunderstanding",
    url: "https://archiveofourown.org/works/82426871",
  },
  {
    id: "no-solution",
    title: "i've done the math, there's no solution",
    author: "soaperdoodle",
    tags: ["thomflux", "angst"],
    blurb:
      "I'm not over this fic, they are truly a tragic case of unrequited love",
    url: "https://archiveofourown.org/works/83439951",
  },
] as const;

export const MCYT_FOOTER =
  "its a shame how the dsmp fandom turned out, every creator seems to be problematic there and it's scary ( ･ั﹏･ั)";
