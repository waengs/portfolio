import { motion } from "motion/react";
import { GUESTBOOK_NOTE_CLASS } from "../data/guestbookData";
import { scrollStaggerItem } from "./ScrollReveal";

type GuestbookNoteCardProps = {
  name: string;
  message: string;
  index: number;
};

export default function GuestbookNoteCard({ name, message, index }: GuestbookNoteCardProps) {
  return (
    <motion.div
      layout
      variants={scrollStaggerItem}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, rotate: 0 }}
      className={`${GUESTBOOK_NOTE_CLASS} relative rounded-xl p-4 shadow-md`}
      style={{ rotate: index % 2 === 0 ? -1 : 2 }}
    >
      <div className="absolute -top-2 left-4 text-lg" aria-hidden>
        📌
      </div>
      <p className="text-xs font-semibold text-[#7c5c9a]">{name}</p>
      <p className="text-sm text-[#3d4f66]">{message}</p>
    </motion.div>
  );
}
