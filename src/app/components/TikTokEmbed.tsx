import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { extractTikTokEmbedUrl } from "../utils/tiktokEmbed";

type TikTokEmbedProps = {
  videoUrl: string;
  videoId?: string;
  title: string;
  profileUrl: string;
  username: string;
};

export default function TikTokEmbed({
  videoUrl,
  videoId,
  title,
  profileUrl,
  username,
}: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "80px 0px" });
  const [ready, setReady] = useState(false);

  const embedSrc = extractTikTokEmbedUrl(videoUrl, videoId);
  const watchUrl = videoId
    ? `https://www.tiktok.com/video/${videoId}`
    : videoUrl || profileUrl;

  useEffect(() => {
    if (!inView || !embedSrc) return;
    const timer = window.setTimeout(() => setReady(true), 50);
    return () => window.clearTimeout(timer);
  }, [inView, embedSrc]);

  if (!embedSrc) {
    return (
      <a
        href={watchUrl}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-[9/16] max-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl bg-white/70 p-6 text-center transition hover:bg-white md:max-h-[480px]"
      >
        <span className="text-4xl">📱</span>
        <p className="font-['Caveat'] text-2xl text-[#5a8fc9]">@{username}</p>
        <p className="text-xs text-[#3d4f66]/80">open on tiktok</p>
      </a>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[325px] overflow-hidden rounded-2xl bg-black shadow-inner"
    >
      {ready ? (
        <iframe
          src={embedSrc}
          title={title}
          className="block h-[580px] w-full border-0"
          scrolling="no"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-[580px] flex-col items-center justify-center gap-3 bg-[#111] p-6 text-center text-white/90 transition hover:bg-[#1a1a1a]"
        >
          <span className="text-4xl">▶</span>
          <p className="font-['Caveat'] text-2xl text-[#8fb8ed]">{title}</p>
          <p className="text-xs text-white/70">tap to open on tiktok</p>
        </a>
      )}
    </div>
  );
}
