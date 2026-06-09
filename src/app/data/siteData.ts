import { getFandomCover } from "./archiveData";
import { getFandomDetailPath } from "./fandomRoutes";

/** Fandom cards — alphabetical labels, shared by home carousel + fandoms page */
export const OBSESSIONS = [
  {
    label: "anime",
    image: getFandomCover("anime"),
    blurb: "seasonal favorites & comfort rewatches",
  },
  {
    label: "bluelock",
    image: getFandomCover("bluelock"),
    blurb: "ego art only",
  },
  {
    label: "clash of champions",
    image: getFandomCover("clash of champions"),
    blurb: "champion sketches & fan pieces",
  },
  {
    label: "mcyt",
    image: getFandomCover("mcyt"),
    blurb: "dream smp & creator fanart era",
  },
  {
    label: "mihoyo",
    image: getFandomCover("mihoyo"),
    blurb: "genshin, hsr & honkai hyperfixations",
  },
];

export const FANDOM_TAGS = OBSESSIONS.map((item) => item.label);

/** Archive filters — includes personal art folder, not on the fandoms carousel */
export const ARCHIVE_FANDOM_TAGS = [...FANDOM_TAGS, "personal"] as const;

export { getFandomDetailPath };

/**
 * Fandom card crop — images use object-cover inside a fixed-height frame.
 * Edit objectPosition per fandom label to reframe (e.g. "50% 25%" = focus higher / show more top).
 */
export const FANDOM_CARD_CROP_DEFAULT = "50% 50%";

export const FANDOM_CARD_CROPS: Record<string, string> = {
  anime: "50% 45%",
  bluelock: "50% 50%",
  "clash of champions": "50% 30%",
  mcyt: "50% 30%",
  mihoyo: "50% 50%",
};

export function getFandomCardCrop(label: string): string {
  return FANDOM_CARD_CROPS[label.toLowerCase()] ?? FANDOM_CARD_CROP_DEFAULT;
}

/** Home page — currently obsessed card (replaces old mood player) */
export const CURRENT_OBSESSION = {
  character: { name: "Lohen" },
  series: "Marriage Toxin",
  song: { title: "「kataomoi」", artist: "Aimer" },
  mood: "drawing at 2am",
} as const;

export const STICKY_PAPER_CLIP = {
  className: "absolute -top-1 right-3 z-10 h-7 w-2.5 rotate-[22deg]",
  color: "#c9a0d4",
};
