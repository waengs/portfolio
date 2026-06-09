import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";

type FloatingHeart = {
  id: string;
  originX: number;
  originY: number;
  driftX: number;
  endY: number;
  rotate: number;
  endRotate: number;
  scale: number;
  color: string;
};

const HEART_COLORS = ["#fad980", "#f59eb8", "#8fb8ed", "#ff6b8a", "#e8a030"];

export function useHeartBurst(maxBurst = 18) {
  const targetRef = useRef<HTMLElement | null>(null);
  const clickCountRef = useRef(0);
  const [floating, setFloating] = useState<FloatingHeart[]>([]);
  const [popping, setPopping] = useState(false);

  const spawnBurst = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    clickCountRef.current += 1;
    const count = Math.min(3 + clickCountRef.current, maxBurst);

    const newHearts: FloatingHeart[] = Array.from({ length: count }, (_, i) => {
      const rotate = Math.random() * 40 - 20;
      return {
        id: `${Date.now()}-${i}-${Math.random()}`,
        originX,
        originY,
        driftX: (Math.random() - 0.5) * 100,
        endY: -120 - Math.random() * 100,
        rotate,
        endRotate: rotate + (Math.random() > 0.5 ? 35 : -35),
        scale: 0.9 + Math.random() * 0.7,
        color: HEART_COLORS[i % HEART_COLORS.length],
      };
    });

    setPopping(true);
    window.setTimeout(() => setPopping(false), 200);

    setFloating((prev) => [...prev, ...newHearts]);

    const ids = new Set(newHearts.map((h) => h.id));
    window.setTimeout(() => {
      setFloating((prev) => prev.filter((h) => !ids.has(h.id)));
    }, 2600);
  }, [maxBurst]);

  const BurstLayer =
    typeof document !== "undefined"
      ? createPortal(
          <div className="pointer-events-none fixed inset-0 z-[200] overflow-visible">
            <AnimatePresence>
              {floating.map((heart) => (
                <motion.span
                  key={heart.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: heart.originX, top: heart.originY }}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0.4,
                    rotate: heart.rotate,
                  }}
                  animate={{
                    opacity: [0, 1, 1, 1, 0.9, 0],
                    x: heart.driftX,
                    y: heart.endY,
                    scale: heart.scale,
                    rotate: heart.endRotate,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="flex items-center justify-center rounded-full bg-white/90 p-1 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                    <Heart
                      className="h-7 w-7"
                      strokeWidth={2.5}
                      style={{
                        color: heart.color,
                        fill: heart.color,
                        stroke: "#fff",
                      }}
                    />
                  </span>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )
      : null;

  return { targetRef, spawnBurst, BurstLayer, popping };
}
