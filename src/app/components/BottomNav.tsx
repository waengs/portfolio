import { NavLink } from "react-router";
import { motion } from "motion/react";
import { BookOpen, FolderKanban, Heart, Home, User } from "lucide-react";
import { springSnappy } from "../motion/presets";
import { contentShellClass } from "../layouts/contentShell";

const NAV_ITEMS = [
  { to: "/", label: "home", icon: Home, end: true },
  { to: "/projects", label: "projects", icon: FolderKanban, end: false },
  { to: "/about", label: "about", icon: User, end: false },
  { to: "/fandoms", label: "interests", icon: Heart, end: false },
  { to: "/archive", label: "archive", icon: BookOpen, end: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#8fb8ed]/15 bg-[#fff9e5]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm">
      <div className={`flex items-end justify-around px-2 ${contentShellClass}`}>
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="flex flex-col items-center gap-0.5 px-2 py-1">
            {({ isActive }) => (
              <>
                <motion.span
                  className="relative flex h-9 w-9 items-center justify-center"
                  whileTap={{ scale: 0.85 }}
                  transition={springSnappy}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[#8fb8ed]/35"
                      transition={springSnappy}
                    />
                  )}
                  <Icon
                    className={`relative z-10 h-4 w-4 transition ${
                      isActive ? "text-[#5a8fc9]" : "text-[#8fb8ed]"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <motion.span
                      className="absolute -top-0.5 right-0 h-1.5 w-1.5 rounded-full bg-[#fad980]"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ duration: 0.35 }}
                    />
                  )}
                </motion.span>
                <motion.span
                  animate={{
                    color: isActive ? "#5a8fc9" : "#8fb8ed",
                    y: isActive ? -1 : 0,
                  }}
                  className="text-[10px] font-medium"
                >
                  {label}
                </motion.span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
