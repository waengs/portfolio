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
import { GUESTBOOK_LIMITS } from "../data/guestbookData";
import { getFirebaseDb, isFirebaseConfigured } from "./firebase";

export type PublicGuestbookNote = {
  id: string;
  name: string;
  message: string;
  createdAt?: string;
};

export type PendingGuestbookNote = PublicGuestbookNote;

const NOTES_COLLECTION = "guestbook_notes";
const LAST_SUBMIT_KEY = "waengs-guestbook-last-submit";

function notesCollection() {
  const db = getFirebaseDb();
  if (!db) throw new Error("firebase is not configured yet");
  return collection(db, NOTES_COLLECTION);
}

function formatTimestamp(value: Timestamp | undefined) {
  return value?.toDate().toISOString();
}

export function canSubmitGuestbook(formReadyAt: number) {
  const now = Date.now();
  if (now - formReadyAt < GUESTBOOK_LIMITS.minSubmitMs) {
    return { ok: false as const, error: "please take a moment before sending" };
  }

  const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) ?? "0");
  if (now - lastSubmit < GUESTBOOK_LIMITS.clientCooldownMs) {
    return { ok: false as const, error: "please wait a minute before sending another note" };
  }

  return { ok: true as const };
}

export function markGuestbookSubmitted() {
  localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
}

export async function fetchApprovedGuestbookNotes() {
  if (!isFirebaseConfigured()) return [];

  const snapshot = await getDocs(
    query(
      notesCollection(),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc"),
    ),
  );

  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      name: String(data.name ?? "anonymous"),
      message: String(data.message ?? ""),
      createdAt: formatTimestamp(data.createdAt as Timestamp | undefined),
    };
  });
}

export async function submitGuestbookNote(input: {
  name: string;
  message: string;
  website: string;
}) {
  if (!isFirebaseConfigured()) {
    throw new Error("guestbook is not connected yet — check firebase setup");
  }

  if (input.website.trim()) {
    throw new Error("invalid submission");
  }

  await addDoc(notesCollection(), {
    name: input.name.trim() || "anonymous",
    message: input.message.trim(),
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function fetchPendingGuestbookNotes() {
  if (!isFirebaseConfigured()) return [];

  const snapshot = await getDocs(
    query(
      notesCollection(),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc"),
    ),
  );

  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      name: String(data.name ?? "anonymous"),
      message: String(data.message ?? ""),
      createdAt: formatTimestamp(data.createdAt as Timestamp | undefined),
    };
  });
}

export async function moderateGuestbookNote(
  id: string,
  action: "approve" | "reject" | "delete",
) {
  if (!isFirebaseConfigured()) {
    throw new Error("firebase is not configured yet");
  }

  const db = getFirebaseDb();
  if (!db) throw new Error("firebase is not configured yet");

  const ref = doc(db, NOTES_COLLECTION, id);

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
