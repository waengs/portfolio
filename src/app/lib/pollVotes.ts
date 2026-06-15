import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { POLL_SEED_COUNTS } from "../data/pollSeedData";
import { getFirebaseDb, isFirebaseConfigured } from "./firebase";

const VOTES_PREFIX = "poll-votes:";
const USER_VOTE_PREFIX = "poll-user-vote:";
const POLLS_COLLECTION = "polls";

function mergePollCounts(pollId: string, liveCounts: Record<string, number>): Record<string, number> {
  const seeds = POLL_SEED_COUNTS[pollId] ?? {};
  const merged = { ...seeds };

  for (const [optionId, count] of Object.entries(liveCounts)) {
    merged[optionId] = (merged[optionId] ?? 0) + count;
  }

  return merged;
}

function getLocalPollVotes(pollId: string): Record<string, number> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(`${VOTES_PREFIX}${pollId}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveLocalPollVotes(pollId: string, votes: Record<string, number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${VOTES_PREFIX}${pollId}`, JSON.stringify(votes));
}

export function getDevicePollVote(pollId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${USER_VOTE_PREFIX}${pollId}`);
}

function saveLocalDeviceVote(pollId: string, optionId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${USER_VOTE_PREFIX}${pollId}`, optionId);
}

export async function fetchPollVotes(pollId: string): Promise<Record<string, number>> {
  if (!isFirebaseConfigured()) {
    return mergePollCounts(pollId, getLocalPollVotes(pollId));
  }

  const db = getFirebaseDb();
  if (!db) return mergePollCounts(pollId, getLocalPollVotes(pollId));

  try {
    const snap = await getDoc(doc(db, POLLS_COLLECTION, pollId));
    if (!snap.exists()) return mergePollCounts(pollId, {});

    const counts = snap.data().counts;
    if (typeof counts !== "object" || counts === null) return mergePollCounts(pollId, {});

    const liveCounts = Object.fromEntries(
      Object.entries(counts).filter((entry): entry is [string, number] => typeof entry[1] === "number"),
    );
    return mergePollCounts(pollId, liveCounts);
  } catch {
    return mergePollCounts(pollId, getLocalPollVotes(pollId));
  }
}

export async function votePoll(
  pollId: string,
  optionId: string,
): Promise<{ votes: Record<string, number>; ok: boolean }> {
  if (getDevicePollVote(pollId)) {
    return { votes: await fetchPollVotes(pollId), ok: false };
  }

  if (isFirebaseConfigured()) {
    const db = getFirebaseDb();
    if (db) {
      try {
        const pollRef = doc(db, POLLS_COLLECTION, pollId);
        const liveVotes = await runTransaction(db, async (transaction) => {
          const snap = await transaction.get(pollRef);
          const existing =
            snap.exists() && typeof snap.data().counts === "object" && snap.data().counts !== null
              ? (snap.data().counts as Record<string, number>)
              : {};
          const counts = { ...existing };
          counts[optionId] = (counts[optionId] ?? 0) + 1;
          transaction.set(pollRef, { counts, updatedAt: serverTimestamp() }, { merge: true });
          return counts;
        });

        saveLocalDeviceVote(pollId, optionId);
        return { votes: mergePollCounts(pollId, liveVotes), ok: true };
      } catch {
        // Fall back to local storage when Firestore is unavailable.
      }
    }
  }

  const liveVotes = getLocalPollVotes(pollId);
  liveVotes[optionId] = (liveVotes[optionId] ?? 0) + 1;
  saveLocalPollVotes(pollId, liveVotes);
  saveLocalDeviceVote(pollId, optionId);
  return { votes: mergePollCounts(pollId, liveVotes), ok: true };
}

export function totalPollVotes(votes: Record<string, number>): number {
  return Object.values(votes).reduce((sum, count) => sum + count, 0);
}

export function pollVotePercent(count: number, total: number): number {
  if (total <= 0 || count <= 0) return 0;
  return Math.round((count / total) * 100);
}
