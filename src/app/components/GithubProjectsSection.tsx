import GithubProjectCard from "./GithubProjectCard";
import { ScrollReveal } from "./ScrollReveal";
import { GITHUB_PROJECTS } from "../data/projectsPageData";

export default function GithubProjectsSection() {
  return (
    <ScrollReveal direction="up" className="px-5 pb-6">
      <h2 className="mb-4 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">more projects:</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GITHUB_PROJECTS.map((project, index) => (
          <GithubProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </ScrollReveal>
  );
}
