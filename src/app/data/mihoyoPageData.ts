/** Content + config for /fandoms/mihoyo — edit copy and TikTok URL here */

import { WAENGS_TIKTOK } from "./socialData";

/** Banner crop — edit objectPosition to reframe the photo (object-cover). */
export const MIHOYO_BANNER = {
  objectPosition: "50% 22%",
} as const;

export const MIHOYO_TIKTOK = {
  username: WAENGS_TIKTOK.username,
  profileUrl: WAENGS_TIKTOK.profileUrl,
  videoUrl: "https://vt.tiktok.com/ZSQ24vMUT/",
  videoId: "7645707236324527361",
};

export const MIHOYO_BADGES = [
  { game: "genshin", label: "AR 60", certified: true },
  { game: "hsr", label: "AR 57", certified: false, mood: ":(" },
] as const;

export const MIHOYO_INTRO_TITLE = "farming to gacha to losing 50-50";

export const MIHOYO_INTRO =
  "1.1 OG genshin player, took a break then returned right back to Genshin. Couldn't get away from it when everyone I know plays it. Retired star rail player, liked genshin's playstyle more, even though star rail's mechanics AKA THE SKIP BUTTON is better. Will be posting more genshin content on my tiktok, pink promise 🫦🤞.";

export const MIHOYO_SHOPEE_SHELF = {
  title: "waengs' shopee shelf",
  intro:
    "here's a look at what my shopee store used to sell — hsr keychains & genshin couple pins",
  note: "try and pick out the designs you like (*˘︶˘*).｡*♡",
} as const;

export const MIHOYO_CHECKOUT_CLOSED =
  "sorry i don't have my shopee store open anymore, but u never know when right :)";

export const MIHOYO_STORE_TABS = [
  { id: "hsr", label: "hsr keychains", emoji: "🔑" },
  { id: "genshin", label: "genshin pairs", emoji: "💕" },
] as const;

export type MihoyoStoreTabId = (typeof MIHOYO_STORE_TABS)[number]["id"];

export const MIHOYO_FOOTER =
  "if u ask nicely i might let you play with me in the asia server :)";

export const MIHOYO_POLL = {
  title: "fav genshin character rn?",
  options: [
    { id: "illuga", name: "illuga" },
    { id: "lohen", name: "lohen" },
    { id: "flins", name: "flins" },
    { id: "varka", name: "varka" },
  ],
} as const;

export const MIHOYO_PIN_OF_SHAME = [
  { user: "Abrette", text: "it becomes sadder and sadder by the limb" },
  {
    user: "꧁১ Molly! ৎ˙..˙3 6১꧂",
    text: "Lohen n Nicole wanters will be Lohen n Nicole havers!! 🍙🍀",
  },
  { user: "Swaggylicious", text: "LOHEN DOMINATION" },
  { user: "ღ 🐰 : lohen 🌙 ami #", text: "absolute cinema" },
  { user: "miy-chan⋆. 🎀 ˚", text: "Anyway Lohen mention 🤤" },
  { user: "savin_sap", text: "guessed wrong. dang it" },
  { user: "yomiiyo🫧", text: "Muscle memory" },
  { user: "☪︎* 𝒜𝓇𝓏𝓊 ♡ ℒℴ𝒽ℯ𝓃 🐇🍰*˚🌀", text: "my hubby <333" },
  { user: "CatTea", text: "But you said 4" },
  { user: "Kida • commissions open •", text: "BARK BARK BARK" },
  { user: "Ψ みゅんぴょん", text: "最後の写真.........セクシー！" },
  { user: "MARIE⊹˖*[🫀]*", text: "LOHEN MY BELOVED" },
  {
    user: "Lohenfan39 (ZielLo)",
    text: "MMMMMMNNNNNNNNNNNGGGGGGGGGGGGGGHHHHHHHHHHHHHHH",
  },
] as const;

export function getMihoyoSlug(label: string) {
  return label === "mihoyo" ? "mihoyo" : null;
}
