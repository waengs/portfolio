/** Content + config for personal projects on /projects */

export const PERSONAL_BANNER = {
  objectPosition: "50% 35%",
} as const;

export const PERSONAL_SECTIONS = {
  logos: {
    title: "logo designs",
    description: "these are some of the logos i made throughout my college years",
  },
  catstory: {
    title: "catstory",
    description: "here are snippets of a storybook design i made",
  },
  sb: {
    title: "sb",
    description: "this is where I turn my friend group into our own personas",
  },
  spire: {
    title: "The Spire of Azael",
    description:
      "The Spire of Azael is a text-based adventure game inspired by classic interactive fiction. It combines exploration, dialogue choices, character interactions, and branching outcomes into a narrative-driven experience.",
    problem:
      "Many modern games focus heavily on visuals, but text-based games demonstrate how storytelling, choices, and player imagination can create engaging experiences.",
    solution:
      "I created a choice-driven adventure where players explore a fantasy world, interact with characters, make decisions, and experience different outcomes based on their actions.",
    keyFeatures: [
      "Interactive text-based gameplay",
      "Branching dialogue system",
      "Character recruitment and relationship mechanics",
      "Multiple story outcomes/endings",
      "Command-based interaction system",
    ],
    myRole:
      "I independently designed and developed the game, including the story structure, characters, dialogue logic, gameplay systems, and implementation.",
    technology: ["C++"],
    mcLabel: "hero MC — full sketch",
    rosterLabel: "pixel roster",
  },
  bookmatch: {
    title: "bookmatch2",
    description:
      "BookMatch is a personalized book discovery platform designed to help users find books that match their interests and reading preferences. The project focuses on making book discovery more engaging by helping users explore recommendations based on their chosen preferences.",
    problem:
      "With thousands of books available, users often struggle to decide what to read next. Traditional browsing can feel overwhelming, especially when users are unsure what type of book fits their current interests.",
    solution:
      "I redesigned and rebuilt BookMatch v2 as an improved version of the original concept, focusing on a smoother user experience, clearer interactions, and a more personalized recommendation flow.",
    keyFeatures: [
      "Personalized book matching flow",
      "User preference selection",
      "Book recommendation interface",
      "Responsive web design",
      "Improved UI/UX compared to the original version",
    ],
    myRole:
      "The original BookMatch idea was developed collaboratively with a team. I independently redesigned and rebuilt BookMatch v2, including the interface, user flow, and implementation.",
    technology: [
      "Next.js 15 (App Router) + React 19 + TypeScript",
      "NextAuth v5 with Firebase credentials",
      "Firebase (Auth + Firestore)",
      "Google Books, Open Library, and Hardcover APIs for book data",
    ],
    repoUrl: "https://github.com/waengs/bookmatch2",
    demoUrl: "https://bookmatch2you.vercel.app/",
    demoLinkLabel: "open live demo →",
    linkLabel: "view on github →",
  },
  birthdayApp: {
    title: "birthday-app",
    description:
      "A personalized interactive website created as a digital memory experience. I reimagined a desk setup throughout the years by combining custom illustrations, interactive elements, and storytelling. The website uses interactive components to turn memories into a visual journey, creating a more personal way to revisit meaningful moments.",
    appUrl: "https://waengs.github.io/birthday-app/",
    appLinkLabel: "open the birthday app →",
  },
  createInk: {
    title: "CreateInk",
    description:
      "CreateInk is an AI-assisted story creation app designed to help writers build, organize, and manage fictional worlds. It provides tools for tracking characters, world rules, relationships, and story elements while using AI to assist with the creative process.",
    problem:
      "Creating fictional worlds often involves managing large amounts of information such as character backgrounds, relationships, locations, and rules. As stories grow bigger, writers can struggle to keep their ideas consistent and organized.",
    solution:
      "I created CreateInk as a digital workspace where users can store and develop their fictional universes. The app combines structured world-building tools with AI assistance, allowing users to generate ideas while maintaining control over their own story details.",
    keyFeatures: [
      "Character management system",
      "World rules and lore tracking",
      "Organized story information storage",
      "AI-assisted creative writing through Ollama",
      "Mobile application experience built with Expo",
    ],
    myRole:
      "I independently designed and developed CreateInk, including the UI/UX, application structure, feature implementation, and AI integration.",
    technology: [
      "Expo SDK 56 + React Native",
      "Expo Router (file-based navigation)",
      "Zustand + AsyncStorage (offline-first, on-device storage)",
      "React Native Paper + custom literary dark theme (Cinzel / Lora)",
      "Ollama HTTP API for local AI generation",
    ],
    repoUrl: "https://github.com/waengs/createink",
    linkLabel: "view on github →",
  },
} as const;

/** Name card initials — sb6 through sb10 */
export const PERSONAL_SB_CARDS = [
  { initial: "J", number: 6 },
  { initial: "A", number: 7 },
  { initial: "R", number: 8 },
  { initial: "C", number: 9 },
  { initial: "F", number: 10 },
] as const;

/**
 * Catstory crop frames — images use object-cover inside a fixed aspect box.
 * Edit objectPosition per filename to reframe (e.g. "50% 30%" = center-x, focus upper third).
 */
export const PERSONAL_BF_CATS = {
  aspectRatio: "6 / 4",
  defaultObjectPosition: "70% 50%",
  crops: {
    "Take a look at my Canva design!.jpg": "40% 90%",
    "Take a look at my Canva design!(1).jpg": "50% 70%",
    "Take a look at my Canva design!(2).jpg": "50% 50%",
    "Take a look at my Canva design!(3).jpg": "70% 50%",
    "Take a look at my Canva design!(4).jpg": "50% 50%",
    "Take a look at my Canva design!(5).jpg": "50% 40%",
    "Take a look at my Canva design!(6).jpg": "50% 50%",
    "Take a look at my Canva design!(7).jpg": "50% 50%",
    "Take a look at my Canva design!(8).jpg": "50% 60%",
    "Take a look at my Canva design!(9).jpg": "50% 70%",
    "Take a look at my Canva design!(10).jpg": "50% 65%",
    "Take a look at my Canva design!(11).jpg": "50% 70%",
    "Take a look at my Canva design!(12).jpg": "50% 50%",
    "Take a look at my Canva design!(13).jpg": "50% 50%",
    "Take a look at my Canva design!(14).jpg": "50% 70%",
    "Take a look at my Canva design!(15).jpg": "50% 70%",
  } as Record<string, string>,
} as const;
