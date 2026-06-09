import { Link } from "react-router";
import { LayoutGroup, motion } from "motion/react";
import { FANDOM_TAGS } from "../data/siteData";

type FandomChipTag = string;
import { springSnappy } from "../motion/presets";

interface FandomChipsProps {
  className?: string;
  /** Chip labels — defaults to homepage fandom tags */
  tags?: readonly FandomChipTag[];
  /** Selected tag — `null` means all fandoms */
  activeTag?: string | null;
  /** Toggle filter in place (archive / fandoms pages) */
  onSelect?: (tag: string | null) => void;
  /** Navigate to filtered archive instead of calling onSelect */
  linkToArchive?: boolean;
  /** Show an “all” chip that clears the filter */
  showAll?: boolean;
}

function chipShell(active: boolean, interactive = true) {
  return `relative rounded-full px-3 py-1 text-xs font-medium shadow-sm transition-colors ${
    active ? "text-white" : "text-white bg-[#8fb8ed] hover:bg-[#7aa8e0]"
  } ${interactive ? "cursor-pointer" : ""}`;
}

function ActivePill() {
  return (
    <motion.span
      layoutId="fandom-chip-active"
      className="absolute inset-0 rounded-full bg-[#5a8fc9] ring-2 ring-[#5a8fc9]/30"
      transition={springSnappy}
    />
  );
}

export default function FandomChips({
  className = "",
  tags = FANDOM_TAGS,
  activeTag = null,
  onSelect,
  linkToArchive = false,
  showAll = true,
}: FandomChipsProps) {
  const handleSelect = (tag: string | null) => {
    if (!onSelect) return;
    onSelect(activeTag === tag ? null : tag);
  };

  const renderFilterChip = (tag: string | null, label: string, i: number) => {
    const active = activeTag === tag;

    return (
      <motion.button
        key={tag ?? "all"}
        type="button"
        onClick={() => handleSelect(tag)}
        whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 2 : -2 }}
        whileTap={{ scale: 0.96 }}
        transition={springSnappy}
        className={chipShell(active)}
      >
        {active && <ActivePill />}
        <span className="relative z-10">{label}</span>
      </motion.button>
    );
  };

  const renderLinkChip = (tag: string | null, label: string, i: number) => {
    const active = activeTag === tag;
    const to = tag ? `/archive?fandom=${encodeURIComponent(tag)}` : "/archive";

    return (
      <motion.span
        key={tag ?? "all"}
        whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 2 : -2 }}
        whileTap={{ scale: 0.96 }}
        transition={springSnappy}
      >
        <Link to={to} className={`inline-block ${chipShell(active, false)}`}>
          {active && <ActivePill />}
          <span className="relative z-10">{label}</span>
        </Link>
      </motion.span>
    );
  };

  const renderChip = linkToArchive ? renderLinkChip : renderFilterChip;

  const chips = (
    <>
      {showAll && renderChip(null, "all", 0)}
      {tags.map((tag, i) => renderChip(tag, tag, i + 1))}
    </>
  );

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {linkToArchive ? chips : <LayoutGroup>{chips}</LayoutGroup>}
    </div>
  );
}
