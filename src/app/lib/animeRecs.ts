import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { ANIME_REC_LIMITS } from "../data/animeRecData";
import { getFirebaseDb, isFirebaseConfigured } from "./firebase";

export type PublicAnimeRec = {
  id: string;
  name: string;
  anime: string;
  message: string;
  createdAt?: string;
};

export type PendingAnimeRec = PublicAnimeRec;

const RECS_COLLECTION = "anime_recs";
const LAST_SUBMIT_KEY = "waengs-anime-rec-last-submit";

function recsCollection() {
  const db = getFirebaseDb();
  if (!db) throw new Error("firebase is not configured yet");
  return collection(db, RECS_COLLECTION);
}

function formatTimestamp(value: Timestamp | undefined) {
  return value?.toDate().toISOString();
}

export function canSubmitAnimeRec(formReadyAt: number) {
  const now = Date.now();
  if (now - formReadyAt < ANIME_REC_LIMITS.minSubmitMs) {
    return { ok: false as const, error: "please take a moment before sending" };
  }

  const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) ?? "0");
  if (now - lastSubmit < ANIME_REC_LIMITS.clientCooldownMs) {
    return { ok: false as const, error: "please wait a minute before sending another rec" };
  }

  return { ok: true as const };
}

export function markAnimeRecSubmitted() {
  localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
}

export async function fetchApprovedAnimeRecs() {
  if (!isFirebaseConfigured()) return [];

  const snapshot = await getDocs(
    query(
      recsCollection(),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc"),
    ),
  );

  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      name: String(data.name ?? "anonymous"),
      anime: String(data.anime ?? ""),
      message: String(data.message ?? ""),
      createdAt: formatTimestamp(data.createdAt as Timestamp | undefined),
    };
  });
}

export async function submitAnimeRec(input: {
  name: string;
  anime: string;
  message: string;
  website: string;
}) {
  if (!isFirebaseConfigured()) {
    throw new Error("firebase is not connected yet — check firebase setup");
  }

  if (input.website.trim()) {
    throw new Error("invalid submission");
  }

  await addDoc(recsCollection(), {
    name: input.name.trim() || "anonymous",
    anime: input.anime.trim(),
    message: input.message.trim() || "trust me on this one",
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function fetchPendingAnimeRecs() {
  if (!isFirebaseConfigured()) return [];

  const snapshot = await getDocs(
    query(
      recsCollection(),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc"),
    ),
  );

  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      name: String(data.name ?? "anonymous"),
      anime: String(data.anime ?? ""),
      message: String(data.message ?? ""),
      createdAt: formatTimestamp(data.createdAt as Timestamp | undefined),
    };
  });
}

export async function moderateAnimeRec(id: string, action: "approve" | "reject" | "delete") {
  if (!isFirebaseConfigured()) {
    throw new Error("firebase is not configured yet");
  }

  const db = getFirebaseDb();
  if (!db) throw new Error("firebase is not configured yet");

  const ref = doc(db, RECS_COLLECTION, id);

  if (action === "delete") {
    await deleteDoc(ref);
    return;
  }

  if (action === "approve") {
    await updateDoc(ref, { status: "approved" });
    return;
  }

  await deleteDoc(ref);
}
