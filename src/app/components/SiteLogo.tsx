import { Link } from "react-router";
import { StarDoodle } from "./ScrapbookDecor";

interface SiteLogoProps {
  className?: string;
  showSecondStar?: boolean;
}

export default function SiteLogo({ className = "", showSecondStar = true }: SiteLogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-1.5 ${className}`}>
      <span className="font-['Caveat'] text-xl font-semibold text-[#5a8fc9]">
        waengs
      </span>
      <StarDoodle className="inline-block" />
      {showSecondStar && <StarDoodle className="-mt-2 inline-block scale-75" />}
    </Link>
  );
}
