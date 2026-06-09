export function extractTikTokEmbedUrl(videoUrl: string, videoId?: string) {
  const trimmedId = videoId?.trim();
  const id = trimmedId || videoUrl.match(/video\/(\d+)/)?.[1];
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: "0",
    music_info: "0",
    description: "0",
  });
  return `https://www.tiktok.com/player/v1/${id}?${params.toString()}`;
}
