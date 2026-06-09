import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import FloatingStickers from "../components/FloatingStickers";
import BottomNav from "../components/BottomNav";
import HubMenu from "../components/HubMenu";
import { contentShellClass } from "./contentShell";
import { pageTransition } from "../motion/presets";

function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) return false;
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior, block: "start" });
  return true;
}

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let cancelled = false;
      const attempt = (behavior: ScrollBehavior) => {
        if (!cancelled) scrollToHash(location.hash, behavior);
      };

      attempt("instant");
      const timers = [50, 300, 800].map((ms) =>
        window.setTimeout(() => attempt("smooth"), ms),
      );

      return () => {
        cancelled = true;
        timers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fff9e5]">
      <FloatingStickers />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[55] flex justify-center pt-4 sm:pt-5">
        <div className={`flex w-full justify-end px-5 ${contentShellClass}`}>
          <div className="pointer-events-auto">
            <HubMenu />
          </div>
        </div>
      </div>

      <div className={`relative z-10 pb-28 ${contentShellClass}`}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
