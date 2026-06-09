import { motion } from "motion/react";

export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-5">
      <motion.p
        className="font-['Caveat'] text-2xl text-[#8fb8ed]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        loading…
      </motion.p>
      <p className="font-['Nunito'] text-xs text-[#3d4f66]/50">grabbing art from the shelf</p>
    </div>
  );
}
