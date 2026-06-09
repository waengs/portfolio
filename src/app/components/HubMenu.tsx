import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen,
  FolderKanban,
  Heart,
  Home,
  Menu,
  User,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { springSnappy } from "../motion/presets";

const MENU_LINKS = [
  { to: "/", label: "home", icon: Home, end: true },
  { to: "/projects", label: "projects", icon: FolderKanban, end: false },
  { to: "/about", label: "about", icon: User, end: false },
  { to: "/fandoms", label: "interests", icon: Heart, end: false },
  { to: "/archive", label: "archive", icon: BookOpen, end: false },
];

export default function HubMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={springSnappy}
          aria-label="Open menu"
          aria-expanded={false}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#8fb8ed]/35 text-[#5a8fc9] shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </motion.button>
      )}

      <SheetContent
        side="right"
        className="flex w-[min(100%,280px)] flex-col border-[#8fb8ed]/20 bg-[#fff9e5] p-0 [&>button]:hidden"
      >
        <SheetHeader className="relative border-b border-[#8fb8ed]/15 px-5 pb-4 pt-8 pr-14 text-left">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-4 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#8fb8ed]/35 text-[#5a8fc9] shadow-sm transition hover:bg-[#8fb8ed]/50"
          >
            <X className="h-5 w-5" />
          </button>
          <SheetTitle className="font-['Caveat'] text-3xl font-semibold text-[#5a8fc9]">
            waengs
          </SheetTitle>
          <SheetDescription className="font-['Caveat'] text-lg text-[#8fb8ed]">
            where do you wanna go?
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
          {MENU_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-[#8fb8ed]/30 text-[#5a8fc9]"
                    : "text-[#3d4f66] hover:bg-white/80"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isActive ? "bg-[#8fb8ed]/40" : "bg-white shadow-sm"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isActive ? "text-[#5a8fc9]" : "text-[#8fb8ed]"}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </span>
                  <span className="font-['Caveat'] text-xl capitalize">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#8fb8ed]/15 px-5 py-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded-full bg-[#8fb8ed] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7aa8e0]"
          >
            close menu
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
