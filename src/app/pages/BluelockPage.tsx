import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, ExternalLink, ShoppingCart, Sparkles, Store, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  PaperClip,
  SCRAPBOOK_GRADIENT,
  SCRAPBOOK_GRADIENT_SHADOW,
  WashiTape,
  WavyDivider,
} from "../components/ScrapbookDecor";
import { BLUELOCK_ASSETS } from "../data/imageAssets";
import {
  BLUELOCK_BANNER,
  BLUELOCK_CHECKOUT_CLOSED,
  BLUELOCK_FOOTER,
  BLUELOCK_INTRO_MAIN,
  BLUELOCK_INTRO_SPOILER,
  BLUELOCK_POLL,
  BLUELOCK_STORE_COPY,
  BLUELOCK_STORE_LABELS,
  BLUELOCK_TIKTOK,
} from "../data/bluelockPageData";
import { SOCIAL_CHIP_CLASS } from "../data/socialData";
import { springSnappy } from "../motion/presets";
import { extractTikTokEmbedUrl } from "../utils/tiktokEmbed";
import {
  fetchPollVotes,
  getDevicePollVote,
  pollVotePercent,
  totalPollVotes,
  votePoll,
} from "../lib/pollVotes";

const BLUELOCK_POLL_ID = "bluelock-duos";

type StoreCategory = keyof typeof BLUELOCK_ASSETS.store;

type StoreItem = {
  id: string;
  src: string;
  label: string;
  category: StoreCategory;
};

const STORE_TABS: { id: StoreCategory; label: string; emoji: string }[] = [
  { id: "couplePin", label: "duo pins", emoji: "🏆" },
  { id: "individualPin", label: "individual pins", emoji: "📌" },
  { id: "key", label: "keychains", emoji: "🔑" },
];

const CATEGORY_LABEL: Record<StoreCategory, string> = {
  couplePin: "couple pin",
  individualPin: "individual pin",
  key: "keychain",
};

function buildStoreCatalog(): StoreItem[] {
  return (Object.entries(BLUELOCK_ASSETS.store) as [StoreCategory, readonly string[]][]).flatMap(
    ([category, images]) =>
      images.map((src, index) => {
        const shipName = BLUELOCK_STORE_LABELS[category][index];
        return {
          id: `${category}-${index}`,
          src,
          label: shipName ?? `${CATEGORY_LABEL[category]} ${index + 1}`,
          category,
        };
      }),
  );
}

const STORE_CATALOG = buildStoreCatalog();

const POLL_SHIP_EMOJI: Record<string, string> = {
  nagireo: "🐰🦎",
  bachisagi: "🐝⚽",
  kunigiri: "🦸🐅",
  isaginagi: "⚽🐰",
  kaiserisagi: "🫅⚽",
  other: "❓",
};

export default function BluelockPage() {
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({});
  const [userVote, setUserVote] = useState<string | null>(null);
  const [storeTab, setStoreTab] = useState<StoreCategory>("couplePin");
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    setUserVote(getDevicePollVote(BLUELOCK_POLL_ID));
    void fetchPollVotes(BLUELOCK_POLL_ID).then(setPollVotes);
  }, []);

  const videoEmbeds = useMemo(
    () =>
      BLUELOCK_TIKTOK.videos.map((video) =>
        extractTikTokEmbedUrl(video.videoUrl, video.videoId || undefined),
      ),
    [],
  );

  const storeItems = STORE_CATALOG.filter((item) => item.category === storeTab);
  const pollTotal = totalPollVotes(pollVotes);
  const cartCount = cart.size;
  const cartItems = useMemo(
    () => STORE_CATALOG.filter((item) => cart.has(item.id)),
    [cart],
  );

  const toggleCartItem = (id: string) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePollVote = (optionId: string) => {
    void votePoll(BLUELOCK_POLL_ID, optionId).then((result) => {
      setPollVotes(result.votes);
      if (result.ok) setUserVote(optionId);
    });
  };

  return (
    <div className="pb-10">
      <PageHeader
        title="bluelock HQ"
        subtitle="reo & nagi supremacy"
        emoji="⚽"
      />

      <ScrollReveal direction="scale" className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
            <ImageWithFallback
              src={BLUELOCK_ASSETS.banner}
              alt="Blue Lock banner"
              className="h-full w-full object-cover"
              style={{ objectPosition: BLUELOCK_BANNER.objectPosition }}
            />
          </div>
          <div className="absolute bottom-3 left-4 rounded-full bg-[#fff9e5]/95 px-3 py-1 font-['Caveat'] text-xl text-[#5a8fc9] shadow-sm">
            Bluelock HQ
          </div>
        </div>
      </ScrollReveal>

      <WavyDivider />

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] md:p-6">
          <h2 className="mb-3 font-['Caveat'] text-2xl text-[#5a8fc9] md:text-3xl">
            Bluelock HQ
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-[#3d4f66]/90 md:text-base">
            {BLUELOCK_INTRO_MAIN.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <details className="rounded-xl bg-[#fce4ec]/60 px-3 py-2">
              <summary className="cursor-pointer list-none font-semibold text-[#db2777] marker:content-none [&::-webkit-details-marker]:hidden">
                ⚠️ spoiler warning
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#3d4f66]/85">{BLUELOCK_INTRO_SPOILER}</p>
            </details>
          </div>
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
          <motion.span
            className="pointer-events-none absolute bottom-6 right-4 text-sm opacity-35"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            ✦
          </motion.span>

          <div className="mb-4 flex items-start gap-2">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#db2777]" />
            <div>
              <h2 className="font-['Caveat'] text-3xl leading-tight text-[#3d4f66] md:text-4xl">
                poll time!
              </h2>
              <p className="mt-0.5 font-['Caveat'] text-lg text-[#9d4b6a] md:text-xl">
                {BLUELOCK_POLL.title}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {BLUELOCK_POLL.options.map((option, index) => {
              const active = userVote === option.id;
              const emoji = POLL_SHIP_EMOJI[option.id] ?? "♡";
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
                      active ? "bg-[#ede8ff] text-[#8b7ab8]" : "bg-[#fce4ec] text-[#9d4b6a]"
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
              {BLUELOCK_STORE_COPY.title}
            </h2>
            <p className="text-xs leading-relaxed text-[#3d4f66]/70 md:text-sm">
              {BLUELOCK_STORE_COPY.intro}
            </p>
          </div>
        </div>

        <div className="relative rounded-[22px] border-2 border-[#8fb8ed]/25 bg-[#fffef9] p-4 shadow-[0_6px_20px_rgba(143,184,237,0.15)] md:p-5">
          <PaperClip className="absolute -right-1 -top-3 z-10 h-7 w-2.5 rotate-12" color="#8fb8ed" />

          <p className="mb-4 text-sm leading-relaxed text-[#3d4f66]/85">
            {BLUELOCK_STORE_COPY.note}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {STORE_TABS.map((tab) => {
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
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4"
          >
            {storeItems.map((item, index) => {
              const selected = cart.has(item.id);
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCartItem(item.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                  className={`relative flex aspect-square flex-col overflow-visible rounded-[18px] p-2 pb-2.5 text-left shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition ${
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
                  <div className="flex min-h-0 flex-1 items-center justify-center px-1 pt-5">
                    <ImageWithFallback
                      src={item.src}
                      alt={item.label}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="mt-1 shrink-0 px-1 pb-0.5 text-center font-['Caveat'] text-lg leading-snug text-[#5a8fc9] md:text-xl">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
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

      <ScrollReveal direction="up" className="px-5 pb-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="font-['Caveat'] text-2xl text-[#3d4f66] md:text-3xl">tiktok spotlight</h2>
            <p className="text-xs text-[#3d4f66]/70 md:text-sm">bluelock process vids from tiktok</p>
          </div>
          <a
            href={BLUELOCK_TIKTOK.profileUrl}
            target="_blank"
            rel="noreferrer"
            className={SOCIAL_CHIP_CLASS}
          >
            @{BLUELOCK_TIKTOK.username} on tiktok
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {BLUELOCK_TIKTOK.videos.map((video, index) => {
            const embed = videoEmbeds[index];
            return (
              <div
                key={video.title}
                className="rounded-[22px] bg-[#ede8ff] p-4 shadow-[0_4px_15px_rgba(0,0,0,0.06)]"
              >
                <p className="mb-2 font-['Caveat'] text-lg text-[#3d4f66]">{video.title}</p>
                {embed ? (
                  <div className="mx-auto w-full max-w-[325px] overflow-hidden rounded-2xl bg-black shadow-inner">
                    <iframe
                      src={embed}
                      title={video.title}
                      className="block h-[580px] w-full border-0"
                      scrolling="no"
                      allow="encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={BLUELOCK_TIKTOK.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex aspect-[9/16] max-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl bg-white/70 p-6 text-center transition hover:bg-white md:max-h-[480px]"
                  >
                    <span className="text-4xl">🎨</span>
                    <p className="font-['Caveat'] text-2xl text-[#5a8fc9]">@{BLUELOCK_TIKTOK.username}</p>
                    <p className="text-xs text-[#3d4f66]/80">
                      paste speedpaint url + id in{" "}
                      <code className="rounded bg-white/80 px-1">bluelockPageData.ts</code>
                    </p>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" className="px-5 pb-6 text-center">
        <p className="font-['Caveat'] text-xl leading-relaxed text-[#5a8fc9] sm:text-2xl">
          {BLUELOCK_FOOTER}
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
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-closed-title"
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
                id="checkout-closed-title"
                className="mb-3 text-center font-['Caveat'] text-2xl leading-relaxed text-[#3d4f66] md:text-3xl"
              >
                {BLUELOCK_CHECKOUT_CLOSED}
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
