/** Folder names under `porto web assets` → fandom tag labels */
const FOLDER_TO_FANDOM: Record<string, string> = {
  Anime: "anime",
  BlueLock: "bluelock",
  CoC: "clash of champions",
  MCYT: "mcyt",
  Mihoyo: "mihoyo",
  Personal: "personal",
};

export type ArchiveItem = {
  id: string;
  src: string;
  fandom: string;
  transparent: boolean;
};

const imageModules = import.meta.glob(
  "../../image_assets/porto web assets/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}",
  { eager: true, import: "default" },
) as Record<string, string>;

function fandomFromPath(path: string): string | null {
  if (/[\\/]Logos[\\/]/i.test(path)) return null;

  const match = path.match(/porto web assets[\\/]([^\\/]+)[\\/]/);
  if (!match) return null;

  return FOLDER_TO_FANDOM[match[1]] ?? null;
}

function buildArchive(): ArchiveItem[] {
  return Object.entries(imageModules)
    .map(([path, src]) => {
      const fandom = fandomFromPath(path);
      if (!fandom) return null;

      const filename = path.split(/[\\/]/).pop() ?? path;
      return {
        id: path,
        src,
        fandom,
        transparent: /\.png$/i.test(filename),
      } satisfies ArchiveItem;
    })
    .filter((item): item is ArchiveItem => item !== null)
    .sort((a, b) => {
      const byFandom = a.fandom.localeCompare(b.fandom);
      if (byFandom !== 0) return byFandom;
      return a.id.localeCompare(b.id);
    });
}

export const ARCHIVE_ITEMS = buildArchive();

export const ARCHIVE_IMAGES = ARCHIVE_ITEMS.map((item) => item.src);

/** Carousel / fandom card covers — basename without extension (edit here) */
const FANDOM_COVER_FILES: Record<string, string> = {
  anime: "pol3",
  bluelock: "sketch3",
  mcyt: "skephalo1",
  mihoyo: "pola4",
  personal: "bf3",
};

function findCoverByBasename(fandom: string, basename: string): string | undefined {
  const stem = basename.toLowerCase();
  const item = ARCHIVE_ITEMS.find((entry) => {
    if (entry.fandom !== fandom) return false;
    const name = entry.id.split(/[\\/]/).pop()?.replace(/\.[^.]+$/, "").toLowerCase();
    return name === stem;
  });
  return item?.src;
}

export function getFandomCover(fandom: string): string {
  const preferred = FANDOM_COVER_FILES[fandom.toLowerCase()];
  if (preferred) {
    const src = findCoverByBasename(fandom, preferred);
    if (src) return src;
  }

  const items = ARCHIVE_ITEMS.filter((item) => item.fandom === fandom);
  const photo = items.find((item) => !item.transparent);
  return (photo ?? items[0])?.src ?? ARCHIVE_IMAGES[0] ?? "";
}

export function filterArchiveByFandom(fandom: string | null): ArchiveItem[] {
  if (!fandom) return ARCHIVE_ITEMS;
  return ARCHIVE_ITEMS.filter((item) => item.fandom === fandom);
}

export function shuffleArray<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Random preview picks for home — shuffles full archive, returns `count` src strings */
export function pickRandomArchiveImages(count: number): string[] {
  return shuffleArray(ARCHIVE_IMAGES).slice(0, count);
}
