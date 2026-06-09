/** Content + config for /fandoms/anime — edit lists and MAL link here */

export const ANIME_BANNER = {
  objectPosition: "50% 50%",
} as const;

/** Paste your MAL profile URL / username */
export const ANIME_MAL = {
  username: "Waengs",
  profileUrl: "https://myanimelist.net/profile/Waengs",
} as const;

export const ANIME_INTRO = [
  "I started watching anime wayy wayy back in primary. Now this is my beloved collection of all the animes I've ever watched. It's a chaotic jumble of slice of life, shounen, comedy and romance. Take a peek if you'd like, the link is all yours~",
] as const;

export const ANIME_WATCHING = [
  {
    title: "Marriage Toxin",
    genres: ["comedy", "romance"],
    note: "I have never seen a prettier female lead than Kinosaki Mei. ALSO the comedy here packs punches, its so weirdly absurd.",
  },
  {
    title: "Witch Hat Atelier",
    genres: ["fantasy", "seinen"],
    note: "It's like a cozy version of Frieren. The dub of this series is surprisingly very well done!",
  },
  {
    title: "Go for It, Nakamura",
    genres: ["comedy", "romance"],
    note: "I'm so glad they changed things up from the manga, it made it so much more precious. I'm a firm believer that Hirose definitely already knows Nakamura likes him!",
  },
] as const;

export const ANIME_TOP = [
  {
    title: "The Disastrous Life of Saiki K.",
    genres: ["slice of life", "comedy"],
    note: "Can u even talk about slice of life anime, without mentioning Saiki? This series is pure gold. yare yare.",
  },
  {
    title: "Monthly Girls' Nozaki-kun",
    genres: ["romance", "shoujo"],
    note: "Honestly, I started this series with zero expectations. I thought it was gonna be another typical shoujo romance, since they're known for their famous 'fireworks' scene. But they have great characters and its so much fun to watch.",
  },
  {
    title: "Dr. Stone",
    genres: ["shounen"],
    note: "It feels like you're actively learning while watching the show. 10 billion percent increase in brain activity.",
  },
] as const;

/** Seed recs shown before visitors add their own (session-only) */
export const ANIME_REC_SEED = [] as const;

export const ANIME_REC_COPY = {
  title: "drop a rec",
  blurb: "leave an anime rec down below if you have any ♡(ӦｖӦ｡)",
  submitLabel: "send",
  successMessage: "sent for review! i'll add it once i've read it ★",
} as const;

export const ANIME_PS =
  'ps. yes i do know I have a seperate page for BlueLock. "BUT WAENGS, Bluelock IS an anime" I KNOWW! It just holds a special place in my mind, so I\'m gonna seperate it.';

export const ANIME_FOOTER = "currently accepting recs that will ruin my sleep schedule";
