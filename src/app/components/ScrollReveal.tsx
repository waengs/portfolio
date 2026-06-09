import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  scrollRevealVariants,
  scrollStaggerContainer,
  scrollStaggerItem,
  scrollViewport,
  type ScrollRevealDirection,
} from "../motion/presets";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: ScrollRevealDirection;
  delay?: number;
  className?: string;
  /** Slightly earlier trigger for tall sections */
  eager?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
  eager = false,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={
        eager
          ? { ...scrollViewport, amount: 0.08, margin: "0px 0px -4% 0px" }
          : scrollViewport
      }
      variants={scrollRevealVariants[direction]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealStaggerProps {
  children: ReactNode;
  className?: string;
}

/** Children should be motion.div with variants={scrollStaggerItem} */
export function ScrollRevealStagger({ children, className }: ScrollRevealStaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={scrollStaggerContainer}
    >
      {children}
    </motion.div>
  );
}

export { scrollStaggerItem };
