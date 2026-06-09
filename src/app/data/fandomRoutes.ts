const FANDOM_SLUGS: Record<string, string> = {
  anime: "anime",
  bluelock: "bluelock",
  mcyt: "mcyt",
  mihoyo: "mihoyo",
  "clash of champions": "coc",
};

export function getFandomDetailPath(label: string) {
  const slug = FANDOM_SLUGS[label];
  return slug ? `/fandoms/${slug}` : null;
}
