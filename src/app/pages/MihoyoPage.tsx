import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ExternalLink,
  Pin,
  ShoppingCart,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import TikTokEmbed from "../components/TikTokEmbed";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  PaperClip,
  SCRAPBOOK_GRADIENT,
  SCRAPBOOK_GRADIENT_SHADOW,
  WashiTape,
  WavyDivider,
} from "../components/ScrapbookDecor";
import { MIHOYO_ASSETS } from "../data/imageAssets";
import {
  MIHOYO_BADGES,
  MIHOYO_BANNER,
  MIHOYO_CHECKOUT_CLOSED,
  MIHOYO_FOOTER,
  MIHOYO_INTRO,
  MIHOYO_INTRO_TITLE,
  MIHOYO_PIN_OF_SHAME,
  MIHOYO_POLL,
  MIHOYO_SHOPEE_SHELF,
  MIHOYO_STORE_TABS,
  MIHOYO_TIKTOK,
  type MihoyoStoreTabId,
} from "../data/mihoyoPageData";
import { SOCIAL_CHIP_CLASS } from "../data/socialData";
import { springSnappy } from "../motion/presets";
import { getDevicePollVote, getPollVotes, pollVotePercent, totalPollVotes, votePoll } from "../lib/pollVotes";

const MIHOYO_POLL_ID = "mihoyo-fav-char";

type MihoyoStoreItem = {
  id: string;
  label: string;
  category: MihoyoStoreTabId;
  src?: string;
  back?: string;
  front?: string;
};

function buildMihoyoStoreCatalog(): MihoyoStoreItem[] {
  const { sold1, sold2 } = MIHOYO_ASSETS.shopeeShelf;
  const hsrItems = sold1.pairs.map((pair, index) => ({
    id: `hsr-${index}`,
    label: pair.label,
    category: "hsr" as const,
    back: pair.back,
    front: pair.front,
  }));
  const genshinItems = sold2.items.map((item, index) => ({
    id: `genshin-${index}`,
    label: item.label,
    category: "genshin" as const,
    src: item.src,
  }));
  return [...hsrItems, ...genshinItems];
}

const MIHOYO_STORE_CATALOG = buildMihoyoStoreCatalog();

const POLL_CHAR_EMOJI: Record<string, string> = {
  illuga: "🪶",
  lohen: "🐰",
  flins: "🕯️",
  varka: "⚔️",
};

const BADGE_THEMES = {
  genshin: {
    ring: "bg-gradient-to-br from-[#ffc9e0] via-[#f9a8d4] to-[#db2777]",
    inner: "bg-gradient-to-br from-[#fff0f6] via-[#ffe8f3] to-[#fce4ec]/90",
    game: "text-[#9d4b6a]",
    level: "text-[#db2777]",
    ribbon: "bg-[#db2777] text-white",
  },
  hsr: {
    ring: "bg-gradient-to-br from-[#d4c4f5] via-[#b39ddb] to-[#8b7ab8]",
    inner: "bg-gradient-to-br from-[#f5f0ff] via-[#ede8ff] to-[#e8deff]/90",
    game: "text-[#8b7ab8]",
    level: "text-[#6b5b95]",
    ribbon: "bg-[#8b7ab8] text-white",
  },
} as const;

function CertifiedBadge({
  label,
  game,
  certified,
  mood,
}: {
  label: string;
  game: string;
  certified: boolean;
  mood?: string;
}) {
  const gameKey = game === "genshin" ? "genshin" : "hsr";
  const theme = BADGE_THEMES[gameKey];
  const gameLabel = game === "genshin" ? "genshin" : "hsr";

  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: gameKey === "genshin" ? -4 : 4 }}
      transition={springSnappy}
      className="relative flex flex-col items-center"
    >
      <div
        className={`relative rounded-full p-[3px] shadow-[0_5px_18px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.65)] ${theme.ring}`}
      >
        <div
          className={`relative flex h-[5.25rem] w-[5.25rem] flex-col items-center justify-center rounded-full border-2 border-white/80 ${theme.inner}`}
        >
          <span
            className="pointer-events-none absolute left-2.5 top-2 h-2 w-2 rounded-full bg-white/70"
            aria-hidden
          />
          <span
            className={`font-['Nunito'] text-[7px] font-extrabold uppercase tracking-[0.14em] ${theme.game}`}
          >
            {gameLabel}
          </span>
          <div className="flex items-center gap-0.5">
            <span className={`font-['Caveat'] text-[1.65rem] font-bold leading-none ${theme.level}`}>
              {label}
            </span>
            {mood && <span className="text-sm leading-none opacity-80">{mood}</span>}
          </div>
          {certified ? (
            <span
              className={`mt-1 inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[6px] font-extrabold uppercase tracking-wide shadow-sm ${theme.ribbon}`}
            >
              <BadgeCheck className="h-2 w-2" strokeWidth={3} />
              certified
            </span>
          ) : (
            <span
              className={`mt-1 rounded-md px-1.5 py-0.5 text-[6px] font-extrabold uppercase tracking-wide opacity-90 ${theme.ribbon}`}
            >
              retired arc
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MihoyoPage() {
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({});
  const [userVote, setUserVote] = useState<string | null>(null);
  const [storeTab, setStoreTab] = useState<MihoyoStoreTabId>("hsr");
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [showFront, setShowFront] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setPollVotes(getPollVotes(MIHOYO_POLL_ID));
    setUserVote(getDevicePollVote(MIHOYO_POLL_ID));
  }, []);

  const storeItems = MIHOYO_STORE_CATALOG.filter((item) => item.category === storeTab);
  const pollTotal = totalPollVotes(pollVotes);
  const cartCount = cart.size;
  const cartItems = useMemo(
    () => MIHOYO_STORE_CATALOG.filter((item) => cart.has(item.id)),
    [cart],
  );
  const listingImage =
    storeTab === "hsr"
      ? MIHOYO_ASSETS.shopeeShelf.sold1.listing
      : MIHOYO_ASSETS.shopeeShelf.sold2.listing;

  const toggleCartItem = (id: string) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFlip = (id: string) => {
    setShowFront((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePollVote = (optionId: string) => {
    const result = votePoll(MIHOYO_POLL_ID, optionId);
    setPollVotes(result.votes);
    if (result.ok) setUserVote(optionId);
  };

  const tiktokVideo = useMemo(
    () => ({
      videoUrl: MIHOYO_TIKTOK.videoUrl,
      videoId: MIHOYO_TIKTOK.videoId,
    }),
    [],
  );

  return (
    <div className="pb-10">
      <PageHeader title="mihoyo zone" subtitle="strictly a genshin user now" emoji="✨" />

      <ScrollReveal direction="scale" className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
            <ImageWithFallback
              src={MIHOYO_ASSETS.banner}
              alt="Mihoyo banner"
              className="h-full w-full object-cover"
              style={{ objectPosition: MIHOYO_BANNER.objectPosition }}
            />
          </div>
          <div className="absolute bottom-3 left-4 rounded-full bg-[#fff9e5]/95 px-3 py-1 font-['Caveat'] text-xl text-[#5a8fc9] shadow-sm">
            waengs&apos; mihoyo corner
          </div>
        </div>
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-6">
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">
            {MIHOYO_INTRO_TITLE}
          </h2>

          <div className="float-right ml-4 mb-2 flex gap-2.5">
            {MIHOYO_BADGES.map((badge) => (
              <CertifiedBadge key={badge.game} {...badge} />
            ))}
          </div>

          <p className="text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">{MIHOYO_INTRO}</p>

          <a
            href={MIHOYO_TIKTOK.profileUrl}
            target="_blank"
            rel="noreferrer"
            className={`mt-4 clear-both ${SOCIAL_CHIP_CLASS}`}
          >
            @{MIHOYO_TIKTOK.username} on tiktok
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div
          className={`relative overflow-visible rounded-[24px] p-4 md:p-6 ${SCRAPBOOK_GRADIENT} ${SCRAPBOOK_GRADIENT_SHADOW}`}
        >
          <WashiTape className="-right-2 top-3 z-10 rotate-12" width={52} height={16} />
          <motion.span
            className="pointer-events-none absolute -left-1 top-8 text-lg opacity-40"
            animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            💕
          </motion.span>

          <div className="mb-4 flex items-start gap-2">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#db2777]" />
            <div>
              <h2 className="font-['Caveat'] text-3xl leading-tight text-[#3d4f66] md:text-4xl">
                poll time!
              </h2>
              <p className="mt-0.5 font-['Caveat'] text-lg text-[#9d4b6a] md:text-xl">
                {MIHOYO_POLL.title}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {MIHOYO_POLL.options.map((option, index) => {
              const active = userVote === option.id;
              const emoji = POLL_CHAR_EMOJI[option.id] ?? "♡";
              const count = pollVotes[option.id] ?? 0;
              const percent = pollVotePercent(count, pollTotal);
              const locked = userVote !== null;

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  disabled={locked}
                  onClick={() => handlePollVote(option.id)}
                  whileHover={{ x: 5, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springSnappy}
                  className={`group flex w-full items-center gap-3 rounded-full border-2 px-3 py-2.5 text-left shadow-sm transition md:px-4 md:py-3 ${
                    active
                      ? "border-[#b39ddb] bg-white/95 shadow-[0_4px_14px_rgba(179,157,219,0.35)]"
                      : locked
                        ? "cursor-default border-white/60 bg-white/50 opacity-70"
                        : "border-white/80 bg-white/75 hover:border-[#f9a8d4]/60 hover:bg-white/90"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? "bg-[#ede8ff] text-[#8b7ab8]"
                        : "bg-[#fce4ec] text-[#9d4b6a]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-['Nunito'] text-sm font-semibold text-[#3d4f66] md:text-base">
                    {option.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-[#ede8ff] px-2 py-0.5 font-['Nunito'] text-xs font-bold text-[#8b7ab8]">
                    {percent}%
                  </span>
                  <span className="shrink-0 text-base opacity-90" aria-hidden>
                    {emoji}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[18px] bg-white/50 px-4 py-3 text-center">
            <p className="font-['Caveat'] text-lg text-[#9d4b6a] md:text-xl">
              {pollTotal} vote{pollTotal === 1 ? "" : "s"} total
            </p>
            {userVote ? (
              <p className="mt-1 text-xs text-[#3d4f66]/65">thanks for voting!</p>
            ) : null}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="mb-3 flex items-center gap-2">
          <Store className="h-5 w-5 text-[#5a8fc9]" />
          <div>
            <h2 className="font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">
              {MIHOYO_SHOPEE_SHELF.title}
            </h2>
            <p className="text-xs leading-relaxed text-[#3d4f66]/70 md:text-sm">
              {MIHOYO_SHOPEE_SHELF.intro}
            </p>
          </div>
        </div>

        <div className="relative rounded-[22px] border-2 border-[#8fb8ed]/25 bg-[#fffef9] p-4 shadow-[0_6px_20px_rgba(143,184,237,0.15)] md:p-5">
          <PaperClip className="absolute -right-1 -top-3 z-10 h-7 w-2.5 rotate-12" color="#8fb8ed" />

          <p className="mb-4 text-sm leading-relaxed text-[#3d4f66]/85">
            {MIHOYO_SHOPEE_SHELF.note}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {MIHOYO_STORE_TABS.map((tab) => {
              const active = storeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  onClick={() => setStoreTab(tab.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springSnappy}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition md:text-sm ${
                    active
                      ? "bg-[#8fb8ed] text-white shadow-sm"
                      : "bg-[#e3eef9] text-[#5a8fc9] hover:bg-[#d4e6f7]"
                  }`}
                >
                  {tab.emoji} {tab.label}
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={storeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springSnappy}
            className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 md:gap-6"
          >
            <div className="flex shrink-0 items-start justify-center sm:w-40 md:w-44 lg:w-48">
              <ImageWithFallback
                src={listingImage}
                alt={`Shopee listing — ${storeTab}`}
                className="h-auto max-h-[200px] w-full object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:max-h-[240px]"
              />
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {storeItems.map((item, index) => {
                const selected = cart.has(item.id);
                const flipable = Boolean(item.back && item.front);
                const imageSrc = flipable
                  ? showFront[item.id]
                    ? item.front!
                    : item.back!
                  : item.src!;

                return (
                  <motion.div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleCartItem(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleCartItem(item.id);
                      }
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springSnappy}
                    className={`relative flex aspect-square cursor-pointer flex-col overflow-visible rounded-[18px] p-2 pb-2.5 text-left shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition ${
                      selected
                        ? "bg-[#dce9f7] ring-2 ring-[#8fb8ed] ring-offset-2"
                        : "bg-[#e8f0fa] hover:bg-[#dce9f7]"
                    }`}
                  >
                    <span
                      className={`absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-md border-2 transition ${
                        selected
                          ? "border-[#8fb8ed] bg-[#8fb8ed] text-white"
                          : "border-[#8fb8ed]/40 bg-white"
                      }`}
                      aria-hidden
                    >
                      {selected ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                    </span>

                    <button
                      type="button"
                      className={`relative flex min-h-0 flex-1 items-center justify-center border-0 bg-transparent px-1 pt-5 ${
                        flipable ? "cursor-pointer" : "pointer-events-none"
                      }`}
                      onClick={
                        flipable
                          ? (event) => {
                              event.stopPropagation();
                              toggleFlip(item.id);
                            }
                          : undefined
                      }
                      aria-label={
                        flipable
                          ? `Show ${showFront[item.id] ? "back" : "front"} of ${item.label}`
                          : item.label
                      }
                    >
                      <ImageWithFallback
                        src={imageSrc}
                        alt=""
                        aria-hidden
                        className="max-h-full max-w-full object-contain"
                      />
                      {flipable ? (
                        <span className="pointer-events-none absolute bottom-0 rounded-full bg-white/85 px-1.5 py-px text-[9px] font-medium text-[#5a8fc9] shadow-sm">
                          {showFront[item.id] ? "front" : "back"} · tap to flip
                        </span>
                      ) : null}
                    </button>

                    <span className="mt-1 shrink-0 px-1 pb-0.5 text-center font-['Caveat'] text-lg leading-snug text-[#5a8fc9] md:text-xl">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#8fb8ed]/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-['Caveat'] text-lg text-[#3d4f66]">
              cart: {cartCount} item{cartCount === 1 ? "" : "s"}
              {cartCount > 0 ? (
                <span className="mt-1 block text-sm text-[#3d4f66]/70 sm:mt-0 sm:inline sm:ml-2">
                  ({cartItems.map((item) => item.label).join(", ")})
                </span>
              ) : null}
            </p>
            <motion.button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              disabled={cartCount === 0}
              whileHover={cartCount > 0 ? { scale: 1.03 } : undefined}
              whileTap={cartCount > 0 ? { scale: 0.97 } : undefined}
              transition={springSnappy}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                cartCount > 0
                  ? "bg-[#8fb8ed] text-white shadow-sm hover:bg-[#7aa8e0]"
                  : "cursor-not-allowed bg-[#e3eef9] text-[#8fb8ed]/60"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              checkout
            </motion.button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" eager className="grid gap-4 px-5 pb-6 md:grid-cols-2 md:gap-8">
        <div className="rounded-[22px] bg-[#ede8ff] p-4 shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#3d4f66]">tiktok spotlight</h2>
          <TikTokEmbed
            videoUrl={tiktokVideo.videoUrl}
            videoId={tiktokVideo.videoId}
            title="Mihoyo TikTok"
            profileUrl={MIHOYO_TIKTOK.profileUrl}
            username={MIHOYO_TIKTOK.username}
          />
        </div>

        <div className="relative rotate-[0.5deg] rounded-[22px] bg-[#fce7f3] p-4 shadow-[0_4px_15px_rgba(219,39,119,0.1)]">
          <Pin className="absolute -top-2 right-6 h-6 w-6 rotate-12 text-[#db2777]" aria-hidden />
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#9d4b6a]">pin of shame 📌</h2>
          <ul className="space-y-2">
            {MIHOYO_PIN_OF_SHAME.map((comment) => (
              <li
                key={`${comment.user}-${comment.text}`}
                className="rounded-xl border border-[#f9a8d4]/40 bg-white/80 px-3 py-2 text-xs leading-relaxed text-[#3d4f66] shadow-sm"
              >
                <span className="font-semibold text-[#db2777]">@{comment.user}</span> {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6 text-center">
        <p className="font-['Caveat'] text-xl leading-relaxed text-[#5a8fc9] sm:text-2xl">
          {MIHOYO_FOOTER}
        </p>
      </ScrollReveal>

      <div className="px-5">
        <Link
          to="/fandoms"
          className="inline-flex items-center gap-2 rounded-full bg-[#8fb8ed]/25 px-4 py-2 text-sm font-medium text-[#5a8fc9] transition hover:bg-[#8fb8ed]/40"
        >
          <ArrowLeft className="h-4 w-4" />
          back to interests
        </Link>
      </div>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3d4f66]/40 p-5 backdrop-blur-sm"
            onClick={() => setCheckoutOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={springSnappy}
              className="relative w-full max-w-sm rotate-[-1deg] rounded-[22px] bg-[#fff9e5] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mihoyo-checkout-closed-title"
            >
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="absolute right-3 top-3 rounded-full p-1 text-[#5a8fc9] transition hover:bg-[#8fb8ed]/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="mb-2 text-center text-3xl" aria-hidden>
                🛒
              </p>
              <h3
                id="mihoyo-checkout-closed-title"
                className="mb-3 text-center font-['Caveat'] text-2xl leading-relaxed text-[#3d4f66] md:text-3xl"
              >
                {MIHOYO_CHECKOUT_CLOSED}
              </h3>
              {cartItems.length > 0 ? (
                <p className="mb-4 text-center text-xs text-[#3d4f66]/70">
                  you picked: {cartItems.map((item) => item.label).join(", ")}
                </p>
              ) : null}
              <motion.button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={springSnappy}
                className="mx-auto flex w-full max-w-[200px] items-center justify-center rounded-full bg-[#8fb8ed] py-2 text-sm font-semibold text-white"
              >
                ok ok
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
