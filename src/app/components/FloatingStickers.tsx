import { motion } from "motion/react";

const DOODLES = [
  { content: "✦", x: "6%", y: "8%", size: "text-lg", delay: 0, duration: 5 },
  { content: "♡", x: "88%", y: "12%", size: "text-base", delay: 0.4, duration: 4.2 },
  { content: "★", x: "4%", y: "32%", size: "text-sm", delay: 0.8, duration: 5.5 },
  { content: "✧", x: "92%", y: "38%", size: "text-lg", delay: 1.2, duration: 4.8 },
  { content: "♡", x: "10%", y: "58%", size: "text-base", delay: 1.6, duration: 5.2 },
  { content: "✦", x: "86%", y: "62%", size: "text-sm", delay: 2, duration: 4.5 },
  { content: "★", x: "8%", y: "82%", size: "text-base", delay: 2.4, duration: 5.8 },
  { content: "✧", x: "90%", y: "78%", size: "text-lg", delay: 2.8, duration: 4 },
];

export default function FloatingStickers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {DOODLES.map((doodle, index) => (
        <motion.span
          key={index}
          className={`absolute font-['Caveat'] text-[#8fb8ed]/45 ${doodle.size}`}
          style={{ left: doodle.x, top: doodle.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.25],
            scale: [1, 1.15, 1],
            rotate: [0, 12, -10, 0],
            y: [0, -8, 0],
          }}
          transition={{
            delay: doodle.delay,
            duration: doodle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {doodle.content}
        </motion.span>
      ))}
    </div>
  );
}
