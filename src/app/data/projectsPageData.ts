import { CUP_O_COLLECT } from "./cupOCollectData";
import { WAENGS_GITHUB } from "./socialData";

export { CUP_O_COLLECT };

export const PROJECTS_PAGE = {
  subtitle: "this is how a weeb codes",
  intro:
    "I said I was a compsci student didn't I? here's some proof ᕙ(⇀‸↼‶)ᕗ",
  personalityTitle: "showing personality",
  personalityIntro:
    "I think, my personality peeks through a lot when I do my coding projects. Here in my university, we get a lot of free will when determining final projects, that's why I tend to incorporate my interests (it's to keep me sane). I'll introduce to you some of my favorite projects down below!",
} as const;

export const PROJECTS_HOME = {
  title: "side quests",
  intro:
    "fandom-related side quests, which include college tasks, silly apps, and things I built because I wanted to",
} as const;

export const GITHUB_PROFILE_URL = WAENGS_GITHUB.profileUrl;

/** Curated from github.com/waengs — edit copy here */
export type GithubProject = {
  name: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  language?: string;
};

export const GITHUB_PROJECTS: GithubProject[] = [
  {
    name: "jojos",
    description: "an interactive birthday puzzle where every clue reveals a new message.",
    repoUrl: "https://github.com/waengs/jojos",
    language: "HTML",
  },
  {
    name: "CameraFilter",
    description:
      "anime-inspired camera filters — experiment with transforming photos into different character styles.",
    repoUrl: "https://github.com/waengs/CameraFilter",
    language: "Jupyter Notebook",
  },
  {
    name: "VoiceHub",
    description:
      "a vocal training app that analyzes pitch in real-time and guides singing practice.",
    repoUrl: "https://github.com/waengs/VoiceHub",
    language: "Java",
  },
  {
    name: "StemmLab",
    description:
      "an interactive STEM learning platform designed to make science concepts easier to explore.",
    repoUrl: "https://github.com/waengs/StemmLab",
    language: "Expo + Firebase",
  },
  {
    name: "KitchenServe",
    description: "a restaurant support platform with customer tickets, chat, and admin tools.",
    repoUrl: "https://github.com/darrengunawan15/KitchenServe",
    demoUrl: "https://kitchen-serve-frontend.vercel.app/",
    language: "MERN + AI",
  },
];
