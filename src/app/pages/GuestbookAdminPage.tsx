import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { motion } from "motion/react";
import PageHeader from "../components/PageHeader";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  fetchPendingAnimeRecs,
  moderateAnimeRec,
  type PendingAnimeRec,
} from "../lib/animeRecs";
import {
  fetchPendingGuestbookNotes,
  moderateGuestbookNote,
  type PendingGuestbookNote,
} from "../lib/guestbook";
import { getFirebaseAuth, isFirebaseConfigured } from "../lib/firebase";
import { springSnappy } from "../motion/presets";

type ReviewTab = "guestbook" | "anime";

export default function GuestbookAdminPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<ReviewTab>("guestbook");
  const [guestbookPending, setGuestbookPending] = useState<PendingGuestbookNote[]>([]);
  const [animePending, setAnimePending] = useState<PendingAnimeRec[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    return onAuthStateChanged(auth, (user) => {
      setSignedIn(Boolean(user));
    });
  }, []);

  const loadPending = useCallback(async () => {
    if (!signedIn) return;
    setLoading(true);
    setError(null);
    try {
      const [notes, recs] = await Promise.all([
        fetchPendingGuestbookNotes(),
        fetchPendingAnimeRecs(),
      ]);
      setGuestbookPending(notes);
      setAnimePending(recs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "could not load pending submissions");
      setGuestbookPending([]);
      setAnimePending([]);
    } finally {
      setLoading(false);
    }
  }, [signedIn]);

  useEffect(() => {
    if (signedIn) {
      void loadPending();
    }
  }, [signedIn, loadPending]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const auth = getFirebaseAuth();
    if (!auth) {
      setError("firebase is not configured yet");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword("");
    } catch {
      setError("could not sign in — check your email and password");
    }
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
    setGuestbookPending([]);
    setAnimePending([]);
  };

  const handleGuestbookModerate = async (id: string, action: "approve" | "reject") => {
    setError(null);
    try {
      await moderateGuestbookNote(id, action);
      setGuestbookPending((current) => current.filter((note) => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "could not update note");
    }
  };

  const handleAnimeModerate = async (id: string, action: "approve" | "reject") => {
    setError(null);
    try {
      await moderateAnimeRec(id, action);
      setAnimePending((current) => current.filter((rec) => rec.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "could not update rec");
    }
  };

  const activePending = tab === "guestbook" ? guestbookPending : animePending;
  const totalPending = guestbookPending.length + animePending.length;

  return (
    <div className="pb-8">
      <PageHeader
        title="submissions review"
        subtitle="guestbook notes & anime recs"
        emoji="📌"
      />

      <ScrollReveal direction="up" className="px-5 pb-6">
        {!isFirebaseConfigured() ? (
          <p className="rounded-xl bg-[#ede8ff] px-4 py-6 text-center text-sm text-[#3d4f66]/80">
            add your firebase env vars first — see <code className="text-[#7c5c9a]">.env.example</code>
          </p>
        ) : !signedIn ? (
          <form
            onSubmit={handleSignIn}
            className="mx-auto max-w-md rounded-[20px] bg-[#ede8ff] p-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            <p className="mb-3 text-sm text-[#3d4f66]/85">
              sign in with your firebase account to review pending submissions.
            </p>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              required
              className="mb-2 w-full rounded-xl border border-[#c9a0d4]/35 bg-white px-3 py-2 text-sm text-[#3d4f66] outline-none focus:border-[#c9a0d4]"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              required
              className="mb-3 w-full rounded-xl border border-[#c9a0d4]/35 bg-white px-3 py-2 text-sm text-[#3d4f66] outline-none focus:border-[#c9a0d4]"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
              className="w-full rounded-full bg-[#c9a0d4] py-2 text-sm font-semibold text-white"
            >
              sign in
            </motion.button>
            {error ? <p className="mt-2 text-center text-sm text-[#9d4b6a]">{error}</p> : null}
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#3d4f66]/80">
                {loading
                  ? "loading..."
                  : `${totalPending} submission${totalPending === 1 ? "" : "s"} waiting`}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void loadPending()}
                  className="rounded-full bg-[#e8f0fa] px-3 py-1.5 text-xs font-semibold text-[#5a8fc9]"
                >
                  refresh
                </button>
                <button
                  type="button"
                  onClick={() => void handleSignOut()}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#3d4f66]/70"
                >
                  sign out
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTab("guestbook")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  tab === "guestbook"
                    ? "bg-[#c9a0d4] text-white"
                    : "bg-[#e8f0fa] text-[#5a8fc9]"
                }`}
              >
                guestbook ({guestbookPending.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("anime")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  tab === "anime"
                    ? "bg-[#c9a0d4] text-white"
                    : "bg-[#e8f0fa] text-[#5a8fc9]"
                }`}
              >
                anime recs ({animePending.length})
              </button>
            </div>

            {error ? <p className="text-sm text-[#9d4b6a]">{error}</p> : null}

            {activePending.length === 0 && !loading ? (
              <p className="rounded-xl bg-[#ede8ff] px-4 py-6 text-center text-sm text-[#3d4f66]/75">
                no pending {tab === "guestbook" ? "notes" : "recs"} right now ♡
              </p>
            ) : (
              <ul className="space-y-3">
                {tab === "guestbook"
                  ? guestbookPending.map((note) => (
                      <li
                        key={note.id}
                        className="rounded-xl border border-[#c9a0d4]/30 bg-white p-4 shadow-sm"
                      >
                        <p className="text-xs font-semibold text-[#7c5c9a]">{note.name}</p>
                        <p className="mt-1 text-sm text-[#3d4f66]">{note.message}</p>
                        {note.createdAt ? (
                          <p className="mt-2 text-[10px] text-[#3d4f66]/50">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        ) : null}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => void handleGuestbookModerate(note.id, "approve")}
                            className="rounded-full bg-[#c9a0d4] px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            pin it
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleGuestbookModerate(note.id, "reject")}
                            className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#3d4f66]/70"
                          >
                            discard
                          </button>
                        </div>
                      </li>
                    ))
                  : animePending.map((rec) => (
                      <li
                        key={rec.id}
                        className="rounded-xl border border-[#8fb8ed]/30 bg-white p-4 shadow-sm"
                      >
                        <p className="text-xs font-semibold text-[#5a8fc9]">{rec.name}</p>
                        <p className="mt-1 font-['Caveat'] text-xl text-[#3d4f66]">{rec.anime}</p>
                        <p className="mt-1 text-sm text-[#3d4f66]/90">{rec.message}</p>
                        {rec.createdAt ? (
                          <p className="mt-2 text-[10px] text-[#3d4f66]/50">
                            {new Date(rec.createdAt).toLocaleString()}
                          </p>
                        ) : null}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => void handleAnimeModerate(rec.id, "approve")}
                            className="rounded-full bg-[#8fb8ed] px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            approve
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleAnimeModerate(rec.id, "reject")}
                            className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#3d4f66]/70"
                          >
                            discard
                          </button>
                        </div>
                      </li>
                    ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/about#guestbook"
            className="inline-flex rounded-full bg-[#8fb8ed]/25 px-4 py-2 text-sm font-medium text-[#5a8fc9]"
          >
            guestbook
          </Link>
          <Link
            to="/fandoms/anime"
            className="inline-flex rounded-full bg-[#8fb8ed]/25 px-4 py-2 text-sm font-medium text-[#5a8fc9]"
          >
            anime page
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
