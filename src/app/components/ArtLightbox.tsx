import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { springSnappy } from "../motion/presets";

export interface ArtLightboxItem {
  src: string;
  alt: string;
  label?: string;
}

interface ArtLightboxProps {
  item: ArtLightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function ArtLightbox({ item, onClose, onPrev, onNext }: ArtLightboxProps) {
  const open = item !== null;

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, onPrev, onNext]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key={item.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pb-24"
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-[#3d4f66]/88 backdrop-blur-sm"
          />

          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springSnappy}
            aria-label="Close preview"
            className="absolute top-5 right-5 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-[#fff9e5] text-[#5a8fc9] shadow-lg"
          >
            <X className="h-5 w-5" />
          </motion.button>

          {onPrev && (
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onPrev();
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={springSnappy}
              aria-label="Previous piece"
              className="absolute left-3 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-[#fff9e5]/95 text-[#5a8fc9] shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          )}

          {onNext && (
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNext();
              }}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={springSnappy}
              aria-label="Next piece"
              className="absolute right-3 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-[#fff9e5]/95 text-[#5a8fc9] shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          )}

          <motion.figure
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={springSnappy}
            className="relative z-[1] flex max-h-full max-w-full flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <ImageWithFallback
              src={item.src}
              alt={item.alt}
              className="max-h-[min(78vh,920px)] max-w-[min(96vw,920px)] object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            />
            {item.label && (
              <figcaption className="mt-3 rounded-full bg-[#fff9e5]/95 px-3 py-1 text-xs font-medium capitalize text-[#3d4f66] shadow-sm">
                {item.label}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
