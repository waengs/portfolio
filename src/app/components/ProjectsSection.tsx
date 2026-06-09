import { Link } from "react-router";
import { motion } from "motion/react";
import { FolderKanban } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { PROJECTS_HOME } from "../data/projectsPageData";
import { springSnappy } from "../motion/presets";

export default function ProjectsSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <section className={`px-5 ${embedded ? "pb-4 pt-0 md:pb-6" : "py-2 md:py-4"}`}>
      <ScrollReveal direction="up">
        <div className="flex items-start gap-2">
          <FolderKanban className="mt-1 h-5 w-5 shrink-0 text-[#5a8fc9]" aria-hidden />
          <div className="min-w-0">
            <h2 className="mb-2 font-['Caveat'] text-2xl leading-tight text-[#3d4f66]">
              {PROJECTS_HOME.title}
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-[#3d4f66]/85 md:text-sm">
              {PROJECTS_HOME.intro}
            </p>
            <div className="flex items-center gap-2">
              <Link to="/projects">
                <motion.span
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springSnappy}
                  className="inline-block rounded-full bg-[#8fb8ed] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  projects →
                </motion.span>
              </Link>
              <motion.span
                className="text-xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                aria-hidden
              >
                😺
              </motion.span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
