import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { Pin } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { springSnappy } from "../motion/presets";

export type CorkboardItem = {
  id: string;
  src: string;
  alt: string;
};

type PinLayout = {
  x: number;
  y: number;
  rotate: number;
};

type CorkboardProps = {
  items: readonly CorkboardItem[];
  storageKey?: string;
  onItemTap?: (index: number) => void;
  className?: string;
};

/** Default scatter — fractions of board width/height */
const DEFAULT_LAYOUT: PinLayout[] = [
  { x: 0.06, y: 0.1, rotate: -7 },
  { x: 0.52, y: 0.06, rotate: 5 },
  { x: 0.14, y: 0.48, rotate: 4 },
  { x: 0.56, y: 0.42, rotate: -4 },
];

const PASTEL_PINS = [
  "radial-gradient(circle at 35% 30%, #ffb8c9, #f59eb8 70%)",
  "radial-gradient(circle at 35% 30%, #b8d4f5, #8fb8ed 70%)",
  "radial-gradient(circle at 35% 30%, #ffe08a, #fad980 70%)",
  "radial-gradient(circle at 35% 30%, #d4c4f0, #c9a0d4 70%)",
] as const;

/** Max image area inside the polaroid — aspect ratio preserved within this box */
const PHOTO_MAX_W = 132;
const PHOTO_MAX_H = 148;
const TAP_THRESHOLD_PX = 8;

type ItemSize = {
  imageWidth: number;
  imageHeight: number;
  frameWidth: number;
  frameHeight: number;
};

const FALLBACK_SIZE: ItemSize = {
  imageWidth: PHOTO_MAX_W,
  imageHeight: 96,
  frameWidth: PHOTO_MAX_W + 16,
  frameHeight: 140,
};

function computeItemSize(naturalWidth: number, naturalHeight: number): ItemSize {
  if (!naturalWidth || !naturalHeight) return FALLBACK_SIZE;

  const aspect = naturalWidth / naturalHeight;
  let imageWidth = PHOTO_MAX_W;
  let imageHeight = imageWidth / aspect;

  if (imageHeight > PHOTO_MAX_H) {
    imageHeight = PHOTO_MAX_H;
    imageWidth = imageHeight * aspect;
  }

  const frameWidth = Math.round(imageWidth + 16);
  const frameHeight = Math.round(20 + 8 + imageHeight + 12);

  return {
    imageWidth: Math.round(imageWidth),
    imageHeight: Math.round(imageHeight),
    frameWidth,
    frameHeight,
  };
}

function CorkPinPhoto({
  item,
  index,
  layout,
  size,
  boardRef,
  pinGradient,
  onDragEnd,
  onItemTap,
  onImageLoad,
}: {
  item: CorkboardItem;
  index: number;
  layout: PinLayout;
  size: ItemSize;
  boardRef: RefObject<HTMLDivElement | null>;
  pinGradient: string;
  onDragEnd: (index: number, offsetX: number, offsetY: number) => void;
  onItemTap?: (index: number) => void;
  onImageLoad: (index: number, naturalWidth: number, naturalHeight: number) => void;
}) {
  const dragDistanceRef = useRef(0);

  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      dragElastic={0.06}
      dragMomentum={false}
      whileDrag={{
        scale: 1.06,
        zIndex: 40,
        rotate: layout.rotate + (index % 2 === 0 ? 2 : -2),
        boxShadow: "0 14px 28px rgba(143,184,237,0.25)",
      }}
      onDragStart={() => {
        dragDistanceRef.current = 0;
      }}
      onDrag={(_, info) => {
        dragDistanceRef.current = Math.max(
          dragDistanceRef.current,
          Math.hypot(info.offset.x, info.offset.y),
        );
      }}
      onDragEnd={(_, info) => {
        onDragEnd(index, info.offset.x, info.offset.y);
        if (dragDistanceRef.current <= TAP_THRESHOLD_PX) {
          onItemTap?.(index);
        }
      }}
      animate={{ x: layout.x, y: layout.y, rotate: layout.rotate }}
      transition={{ type: false }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size.frameWidth,
        touchAction: "none",
        cursor: "grab",
      }}
      whileTap={{ cursor: "grabbing" }}
      className="select-none"
    >
      <div className="relative flex flex-col items-center">
        <div
          className="relative z-10 -mb-2 flex h-5 w-5 items-center justify-center rounded-full shadow-[0_2px_6px_rgba(143,184,237,0.35)]"
          style={{ background: pinGradient }}
          aria-hidden
        >
          <Pin className="h-2.5 w-2.5 text-white/95" strokeWidth={2.5} />
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={springSnappy}
          className="rounded-sm border border-white/80 bg-[#fffef9] p-2 pb-2 shadow-[0_6px_18px_rgba(143,184,237,0.18)]"
          style={{ width: size.frameWidth }}
        >
          <div
            className="mx-auto overflow-hidden bg-[#fff9e5]"
            style={{ width: size.imageWidth, height: size.imageHeight }}
          >
            <ImageWithFallback
              src={item.src}
              alt={item.alt}
              draggable={false}
              onLoad={(event) => {
                const img = event.currentTarget;
                onImageLoad(index, img.naturalWidth, img.naturalHeight);
              }}
              className="pointer-events-none h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function loadLayouts(key: string, count: number): PinLayout[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PinLayout[];
    if (!Array.isArray(parsed) || parsed.length !== count) return null;
    return parsed;
  } catch {
    return null;
  }
}

function layoutsFromDefaults(
  boardW: number,
  boardH: number,
  sizes: readonly ItemSize[],
): PinLayout[] {
  return sizes.map((size, index) => {
    const preset = DEFAULT_LAYOUT[index % DEFAULT_LAYOUT.length];
    const maxX = Math.max(0, boardW - size.frameWidth - 8);
    const maxY = Math.max(0, boardH - size.frameHeight - 8);
    return {
      x: clamp(preset.x * boardW, 0, maxX),
      y: clamp(preset.y * boardH, 0, maxY),
      rotate: preset.rotate + (index % 2 === 0 ? 0 : 2),
    };
  });
}

function clampLayoutsToBoard(
  layouts: PinLayout[],
  boardW: number,
  boardH: number,
  sizes: readonly ItemSize[],
): PinLayout[] {
  return layouts.map((layout, index) => {
    const size = sizes[index] ?? FALLBACK_SIZE;
    const maxX = Math.max(0, boardW - size.frameWidth - 8);
    const maxY = Math.max(0, boardH - size.frameHeight - 8);
    return {
      ...layout,
      x: clamp(layout.x, 0, maxX),
      y: clamp(layout.y, 0, maxY),
    };
  });
}

export default function Corkboard({
  items,
  storageKey = "waengs-corkboard",
  onItemTap,
  className = "",
}: CorkboardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<ItemSize[]>(() => items.map(() => FALLBACK_SIZE));
  const [layouts, setLayouts] = useState<PinLayout[]>(() =>
    items.map((_, i) => ({
      x: DEFAULT_LAYOUT[i % DEFAULT_LAYOUT.length].x * 280,
      y: DEFAULT_LAYOUT[i % DEFAULT_LAYOUT.length].y * 320,
      rotate: DEFAULT_LAYOUT[i % DEFAULT_LAYOUT.length].rotate,
    })),
  );
  const [ready, setReady] = useState(false);

  const measureAndInit = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;

    const { width, height } = board.getBoundingClientRect();
    const saved = loadLayouts(storageKey, items.length);
    const nextLayouts = saved ?? layoutsFromDefaults(width, height, sizes);
    setLayouts(clampLayoutsToBoard(nextLayouts, width, height, sizes));
    setReady(true);
  }, [items.length, sizes, storageKey]);

  useEffect(() => {
    measureAndInit();
    window.addEventListener("resize", measureAndInit);
    return () => window.removeEventListener("resize", measureAndInit);
  }, [measureAndInit]);

  useEffect(() => {
    if (!ready || !boardRef.current) return;
    const { width, height } = boardRef.current.getBoundingClientRect();
    setLayouts((prev) => clampLayoutsToBoard(prev, width, height, sizes));
  }, [sizes, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify(layouts));
  }, [layouts, ready, storageKey]);

  const handleImageLoad = useCallback((index: number, naturalWidth: number, naturalHeight: number) => {
    setSizes((prev) => {
      const nextSize = computeItemSize(naturalWidth, naturalHeight);
      const current = prev[index];
      if (
        current &&
        current.imageWidth === nextSize.imageWidth &&
        current.imageHeight === nextSize.imageHeight
      ) {
        return prev;
      }
      const next = [...prev];
      next[index] = nextSize;
      return next;
    });
  }, []);

  const handleDragEnd = (index: number, offsetX: number, offsetY: number) => {
    const board = boardRef.current;
    if (!board) return;

    const { width, height } = board.getBoundingClientRect();
    const size = sizes[index] ?? FALLBACK_SIZE;
    const maxX = Math.max(0, width - size.frameWidth - 8);
    const maxY = Math.max(0, height - size.frameHeight - 8);

    setLayouts((prev) =>
      prev.map((layout, i) =>
        i === index
          ? {
              ...layout,
              x: clamp(layout.x + offsetX, 0, maxX),
              y: clamp(layout.y + offsetY, 0, maxY),
            }
          : layout,
      ),
    );
  };

  return (
    <div className={className}>
      <p className="mb-2 text-center font-['Caveat'] text-lg text-[#8fb8ed]">
        drag the pins to rearrange ♡
      </p>

      <div
        className="relative overflow-hidden rounded-[20px] p-3 shadow-[0_8px_24px_rgba(143,184,237,0.2)] md:rounded-[24px] md:p-4"
        style={{
          background:
            "linear-gradient(145deg, #f5e6d3 0%, #fceee0 35%, #f0ddd0 65%, #e8d4bc 100%)",
        }}
      >
        <div
          ref={boardRef}
          className="relative min-h-[22rem] overflow-hidden rounded-[14px] sm:min-h-[26rem] md:min-h-[28rem]"
          style={{
            backgroundColor: "#f5e8dc",
            backgroundImage: `
              radial-gradient(circle at 22% 28%, rgba(255,255,255,0.55) 0%, transparent 48%),
              radial-gradient(circle at 76% 72%, rgba(255,249,229,0.4) 0%, transparent 42%),
              radial-gradient(circle at 50% 50%, rgba(232,212,188,0.45) 1px, transparent 1px),
              radial-gradient(circle at 12% 82%, rgba(245,230,211,0.5) 1px, transparent 1px),
              radial-gradient(circle at 88% 18%, rgba(240,221,208,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 20px 20px, 24px 24px, 28px 28px",
            boxShadow:
              "inset 0 0 32px rgba(255,249,229,0.6), inset 0 2px 0 rgba(255,255,255,0.5)",
          }}
        >
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center font-['Caveat'] text-xl text-[#8fb8ed]/70">
              pinning art...
            </div>
          )}

          {items.map((item, index) => {
            const layout = layouts[index];
            if (!layout) return null;

            return (
              <CorkPinPhoto
                key={item.id}
                item={item}
                index={index}
                layout={layout}
                size={sizes[index] ?? FALLBACK_SIZE}
                boardRef={boardRef}
                pinGradient={PASTEL_PINS[index % PASTEL_PINS.length]}
                onDragEnd={handleDragEnd}
                onItemTap={onItemTap}
                onImageLoad={handleImageLoad}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
