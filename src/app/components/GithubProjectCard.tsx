import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { GithubProject } from "../data/projectsPageData";
import { springSnappy } from "../motion/presets";

interface GithubProjectCardProps {
  project: GithubProject;
  compact?: boolean;
  index?: number;
}

export default function GithubProjectCard({
  project,
  compact = false,
  index = 0,
}: GithubProjectCardProps) {
  const primaryUrl = project.demoUrl ?? project.repoUrl;

  return (
    <motion.a
      href={primaryUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
      transition={springSnappy}
      className={`block rounded-[20px] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] ${
        compact ? "px-4 py-3" : "p-4 md:p-5"
      }`}
      style={{ rotate: index % 2 === 0 ? -0.5 : 0.5 }}
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className={`font-['Caveat'] text-[#5a8fc9] ${compact ? "text-xl" : "text-2xl"}`}>
          {project.name}
        </h3>
        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[#8fb8ed]" />
      </div>
      {project.language ? (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#8fb8ed]">
          {project.language}
        </p>
      ) : null}
      <p className={`leading-relaxed text-[#3d4f66]/85 ${compact ? "text-xs" : "text-sm"}`}>
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#e8f0fa] px-2.5 py-0.5 text-[10px] font-semibold text-[#5a8fc9]">
          github
        </span>
        {project.demoUrl ? (
          <span className="rounded-full bg-[#ede8ff] px-2.5 py-0.5 text-[10px] font-semibold text-[#8b7ab8]">
            live demo
          </span>
        ) : null}
      </div>
    </motion.a>
  );
}
