/** Shared social handles — single source of truth */

/** Pale blue pill for external social links — matches about page socials */
export const SOCIAL_CHIP_CLASS =
  "inline-flex items-center gap-1.5 rounded-full bg-[#e8f0fa] px-3 py-2 text-xs font-medium text-[#5a8fc9] transition hover:bg-[#dce9f7] sm:px-4 sm:text-sm";

export const WAENGS_TIKTOK = {
  username: "hibatman_05",
  profileUrl: "https://www.tiktok.com/@hibatman_05",
} as const;

/** TikTok @waengs */
export const WAENGS_TIKTOK_WAENGS = {
  username: "waengs",
  profileUrl: "https://www.tiktok.com/@waengs",
} as const;

/** Older art / bluelock speedpaint account */
export const WAENGS_ART_TIKTOK = {
  username: "w43ngs",
  profileUrl: "https://www.tiktok.com/@w43ngs",
} as const;

export const WAENGS_SHOPEE = {
  username: "w43ngs",
  /** Edit if your shop URL differs by region */
  profileUrl: "https://shopee.co.id/w43ngs",
} as const;

export const CI_BATMAN_INSTAGRAM = {
  username: "ci_batman",
  profileUrl: "https://www.instagram.com/ci_batman/",
} as const;

export const DYNERETH_INSTAGRAM = {
  username: "dynereth",
  profileUrl: "https://www.instagram.com/dynereth/",
} as const;

export const WAENGS_GITHUB = {
  username: "waengs",
  profileUrl: "https://github.com/waengs",
  createInkUrl: "https://github.com/waengs/createink",
} as const;

/** Full list for about page + anywhere else — add new accounts here */
export const ALL_SOCIALS = [
  { label: "tiktok", handle: `@${WAENGS_TIKTOK.username}`, url: WAENGS_TIKTOK.profileUrl },
  {
    label: "tiktok",
    handle: `@${WAENGS_TIKTOK_WAENGS.username}`,
    url: WAENGS_TIKTOK_WAENGS.profileUrl,
  },
  {
    label: "instagram",
    handle: `@${CI_BATMAN_INSTAGRAM.username}`,
    url: CI_BATMAN_INSTAGRAM.profileUrl,
  },
  {
    label: "instagram",
    handle: `@${DYNERETH_INSTAGRAM.username}`,
    url: DYNERETH_INSTAGRAM.profileUrl,
  },
  { label: "shopee", handle: WAENGS_SHOPEE.username, url: WAENGS_SHOPEE.profileUrl },
  { label: "github", handle: `@${WAENGS_GITHUB.username}`, url: WAENGS_GITHUB.profileUrl },
] as const;
