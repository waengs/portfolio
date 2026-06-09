import { type RefObject } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useHeartBurst } from "../hooks/useHeartBurst";
import { springSnappy } from "../motion/presets";

interface ClickableHeartProps {
  iconClassName?: string;
  maxBurst?: number;
}

export default function ClickableHeart({
  iconClassName = "h-5 w-5 fill-[#fad980] text-[#e8a030]",
  maxBurst = 18,
}: ClickableHeartProps) {
  const { targetRef, spawnBurst, BurstLayer, popping } = useHeartBurst(maxBurst);

  return (
    <>
      <motion.button
        ref={targetRef as RefObject<HTMLButtonElement>}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          spawnBurst();
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        animate={popping ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={popping ? springSnappy : { duration: 0.2 }}
        aria-label="Send love"
        className="relative z-[2] flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
      >
        <Heart className={iconClassName} strokeWidth={2} />
      </motion.button>
      {BurstLayer}
    </>
  );
}
