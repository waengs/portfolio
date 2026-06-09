import type { Transition, Variants, ViewportOptions } from "motion/react";

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

/** Readymag-style: trigger when section enters viewport, animate once */
export const scrollViewport: ViewportOptions = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
};

export const scrollEase = [0.22, 1, 0.36, 1] as const;

export const scrollRevealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 64,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: scrollEase,
    },
  },
};

export const scrollRevealDown: Variants = {
  hidden: { opacity: 0, y: -48, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: scrollEase },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -56, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: scrollEase },
  },
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 56, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: scrollEase },
  },
};

export const scrollRevealScale: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 48, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: scrollEase },
  },
};

export const scrollStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

export const scrollStaggerItem: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: scrollEase },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: scrollEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSoft,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: scrollEase },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: springSnappy,
  },
};

export const floatY = {
  y: [0, -6, 0],
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
};

export const wiggle = {
  rotate: [0, -3, 3, -2, 0],
  transition: { duration: 0.5 },
};

export type ScrollRevealDirection = "up" | "down" | "left" | "right" | "scale";

export const scrollRevealVariants: Record<ScrollRevealDirection, Variants> = {
  up: scrollRevealUp,
  down: scrollRevealDown,
  left: scrollRevealLeft,
  right: scrollRevealRight,
  scale: scrollRevealScale,
};
