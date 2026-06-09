import SiteLogo from "./SiteLogo";
import { ScrollReveal } from "./ScrollReveal";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
}

export default function PageHeader({ title, subtitle, emoji }: PageHeaderProps) {
  return (
    <ScrollReveal direction="up" eager>
      <header className="px-5 pt-6 pb-4">
        <div className="mb-4">
          <SiteLogo />
        </div>
        <h1 className="font-['Caveat'] text-[2.5rem] leading-tight text-[#3d4f66] md:text-[2.85rem]">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-[#3d4f66]/80">{subtitle}</p>
        )}
      </header>
    </ScrollReveal>
  );
}
