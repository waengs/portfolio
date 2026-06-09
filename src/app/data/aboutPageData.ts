/** About photos — object-cover frames. Edit objectPosition to reframe (lower % = show more top). */

import { ALL_SOCIALS } from "./socialData";

export const ABOUT_HOME_PHOTO = {
  objectPosition: "50% 50%",
} as const;

export const ABOUT_PAGE_PHOTO = {
  objectPosition: "50% 50%",
} as const;

export const ABOUT_FUN_FACTS = [
  "will come up with outrageous oc plots",
  "chronically online",
  "taller than you",
  "for commissions just leave a message or dm me ( ˘³˘)♥",
] as const;

/** Re-export — edit the list in socialData.ts */
export const ABOUT_SOCIALS = ALL_SOCIALS;
