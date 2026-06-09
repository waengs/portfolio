import { motion } from "motion/react";
import SiteLogo from "./SiteLogo";
import FandomChips from "./FandomChips";
import { BRAND_ASSETS } from "../data/imageAssets";
import { springSnappy } from "../motion/presets";

export default function PortfolioHeader() {
  return (
    <header className="relative px-5 pt-6 pb-0">
      <div className="mb-6">
        <SiteLogo />
      </div>

      <div className="mb-2 flex items-start justify-between gap-4 md:gap-8">
        <h1 className="font-['Caveat'] text-[2.35rem] leading-[1.1] text-[#3d4f66] md:text-[2.75rem]">
          welcome to
          <br />
          <span className="text-[2.75rem] font-bold text-[#5a8fc9] md:text-[3.25rem]">waengs&apos; hub!</span>
        </h1>

        <motion.img
          src={BRAND_ASSETS.logo}
          alt="waengs logo"
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ ...springSnappy, delay: 0.15 }}
          className="h-[6rem] w-[6rem] shrink-0 rounded-full object-cover shadow-[0_4px_16px_rgba(90,143,201,0.25)] md:h-[7rem] md:w-[7rem]"
        />
      </div>

      <p className="mb-4 max-w-prose text-sm leading-relaxed text-[#3d4f66]/85 md:text-base">
      An interactive personal hub exploring my interests, creative works, and digital projects.
      </p>

      <FandomChips className="mb-4 md:mb-6" linkToArchive showAll={false} />
    </header>
  );
}
