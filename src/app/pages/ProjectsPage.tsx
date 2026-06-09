import { Link } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PersonalProjectsContent from "../components/PersonalProjectsContent";
import { ScrollReveal } from "../components/ScrollReveal";
import { PROJECTS_PAGE } from "../data/projectsPageData";
import { SOCIAL_CHIP_CLASS, WAENGS_GITHUB } from "../data/socialData";

export default function ProjectsPage() {
  return (
    <div className="pb-10">
      <PageHeader title="projects" subtitle={PROJECTS_PAGE.subtitle} emoji="📁" />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <p className="text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">{PROJECTS_PAGE.intro}</p>
        <a
          href={WAENGS_GITHUB.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 ${SOCIAL_CHIP_CLASS}`}
        >
          @{WAENGS_GITHUB.username} on github
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <div className="mt-5 rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:mt-6 md:p-6">
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">
            {PROJECTS_PAGE.personalityTitle}
          </h2>
          <p className="text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
            {PROJECTS_PAGE.personalityIntro}
          </p>
        </div>
      </ScrollReveal>

      <div id="personal" className="scroll-mt-24">
        <PersonalProjectsContent />
      </div>

      <div className="px-5 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#8fb8ed]/25 px-4 py-2 text-sm font-medium text-[#5a8fc9] transition hover:bg-[#8fb8ed]/40"
        >
          <ArrowLeft className="h-4 w-4" />
          back to home
        </Link>
      </div>
    </div>
  );
}
