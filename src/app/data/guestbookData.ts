export const GUESTBOOK_NOTE_CLASS = "bg-[#ede8ff]";

export const GUESTBOOK_LIMITS = {
  nameMax: 40,
  messageMax: 280,
  minSubmitMs: 3000,
  clientCooldownMs: 60_000,
} as const;
