/** PNG assets — no tile box; let transparency sit on the page background */
export function isTransparentImage(src: string, sourcePath?: string): boolean {
  const candidate = (sourcePath ?? src).split("?")[0] ?? "";
  return /\.png$/i.test(candidate);
}

/** Wrapper around each grid / card image */
export function artFrameClass(transparent: boolean) {
  if (transparent) {
    return "group relative flex aspect-square items-center justify-center overflow-visible";
  }
  return "group relative aspect-square overflow-hidden rounded-[22px] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.08)]";
}

export function artImageClass(transparent: boolean, extra = "") {
  if (transparent) {
    return `max-h-full max-w-full object-contain drop-shadow-[0_8px_20px_rgba(61,79,102,0.14)] ${extra}`.trim();
  }
  return `h-full w-full object-cover ${extra}`.trim();
}
