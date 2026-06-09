/** Content + config for /fandoms/bluelock */

import { WAENGS_ART_TIKTOK } from "./socialData";

export const BLUELOCK_BANNER = {
  objectPosition: "50% 30%",
} as const;

export const BLUELOCK_INTRO_MAIN = [
  "Bluelock is the reason I started making merch. I was obsessed with Reo and Nagi's dynamic, it was fun and new, the author really did a great job writing them to life.",
] as const;

export const BLUELOCK_INTRO_SPOILER =
  "(I'm still holding out hope Nagi is gonna somehow get back into bluelock, I can't accept that he was eliminated)";

export const BLUELOCK_STORE_COPY = {
  title: "waengs' shopee shelf",
  intro:
    "here's a look at what my shopee store used to sell: there were couple pins, individual pins and keychains",
  note: "try and pick out the designs you like (*˘︶˘*).｡*♡",
} as const;

/** Display names per store image index — must match asset counts in imageAssets */
export const BLUELOCK_STORE_LABELS = {
  couplePin: ["kunigiri", "kainess", "nagireo", "bachisagi", "shidousae"],
  individualPin: ["bachira", "reo", "isagi", "chigiri", "nagi", "kunigami"],
  key: ["kunigami", "reo", "chigiri", "bachira", "isagi", "nagi"],
} as const;

export const BLUELOCK_CHECKOUT_CLOSED =
  "sorry i don't have my shopee store open anymore, but u never know when right :)";

export const BLUELOCK_TIKTOK = {
  username: WAENGS_ART_TIKTOK.username,
  profileUrl: WAENGS_ART_TIKTOK.profileUrl,
  videos: [
    {
      title: "kainess speedpaint",
      videoUrl: "https://vt.tiktok.com/ZSQjJHVHG/",
      videoId: "7266056103350308101",
    },
    {
      title: "shidousae speedpaint",
      videoUrl: "https://vt.tiktok.com/ZSQjJ9nwq/",
      videoId: "7266059841003588870",
    },
  ],
} as const;

export const BLUELOCK_POLL = {
  title: "bluelock duos",
  options: [
    { id: "nagireo", name: "Nagi x Reo" },
    { id: "bachisagi", name: "Bachira x Isagi" },
    { id: "kunigiri", name: "Kunigami x Chigiri" },
    { id: "isaginagi", name: "Isagi x Nagi" },
    { id: "kaiserisagi", name: "Kaiser x Isagi" },
    { id: "other", name: "Others" },
  ],
} as const;

export const BLUELOCK_FOOTER = "nagi & reo forever, not even ego can separate them";
