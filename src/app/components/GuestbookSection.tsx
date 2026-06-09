import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import { SCRAPBOOK_FORM, ScrapbookForm } from "./ScrapbookDecor";
import { ScrollReveal, ScrollRevealStagger } from "./ScrollReveal";
import GuestbookNoteCard from "./GuestbookNoteCard";
import { GUESTBOOK_LIMITS } from "../data/guestbookData";
import {
  canSubmitGuestbook,
  fetchApprovedGuestbookNotes,
  markGuestbookSubmitted,
  submitGuestbookNote,
  type PublicGuestbookNote,
} from "../lib/guestbook";
import { isFirebaseConfigured } from "../lib/firebase";
import { springSnappy } from "../motion/presets";

interface GuestbookSectionProps {
  embedded?: boolean;
}

export default function GuestbookSection({ embedded = false }: GuestbookSectionProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState<PublicGuestbookNote[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formReadyAt] = useState(() => Date.now());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    void fetchApprovedGuestbookNotes()
      .then(setNotes)
      .catch(() => {
        // leave empty when firebase is unavailable
      });
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const spamCheck = canSubmitGuestbook(formReadyAt);
    if (!spamCheck.ok) {
      setError(spamCheck.error);
      return;
    }

    if (!message.trim()) {
      setError("say something first!");
      return;
    }

    setSubmitting(true);
    try {
      await submitGuestbookNote({
        name: name.trim(),
        message: message.trim(),
        website,
      });
      markGuestbookSubmitted();
      setName("");
      setMessage("");
      setWebsite("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "could not send note");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={embedded ? undefined : "guestbook"} className={embedded ? "" : "pb-8"}>
      {!embedded && (
        <div className="px-5 pb-4">
          <h2 className="font-['Caveat'] text-3xl text-[#3d4f66]">guestbook!</h2>
          <p className="text-sm text-[#3d4f66]/75">leave a little note — i&apos;d love to hear from you</p>
        </div>
      )}

      <ScrollReveal direction="scale">
        <ScrapbookForm
          onSubmit={handleSubmit}
          className={`mb-6 ${embedded ? "" : "mx-5"}`}
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="your name (optional)"
            maxLength={GUESTBOOK_LIMITS.nameMax}
            className={`mb-2 w-full ${SCRAPBOOK_FORM.input}`}
          />
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="say something nice..."
            rows={3}
            maxLength={GUESTBOOK_LIMITS.messageMax}
            className={SCRAPBOOK_FORM.textarea}
          />
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            aria-hidden
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={submitting ? undefined : { scale: 1.02 }}
            whileTap={submitting ? undefined : { scale: 0.96 }}
            transition={springSnappy}
            className={`${SCRAPBOOK_FORM.submit} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Send className="h-4 w-4" />
            {submitting ? "sending..." : "send my note!"}
          </motion.button>

          {error ? (
            <p className="mt-2 text-center text-sm text-[#9d4b6a]">{error}</p>
          ) : null}

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className={SCRAPBOOK_FORM.success}
              >
                sent for review! i&apos;ll pin it once i&apos;ve read it ♡
              </motion.p>
            )}
          </AnimatePresence>
        </ScrapbookForm>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ScrollRevealStagger
          className={`space-y-3 pb-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3 ${
            embedded ? "" : "px-5 pb-8"
          }`}
        >
          <AnimatePresence initial={false}>
            {notes.map((note, index) => (
              <GuestbookNoteCard
                key={note.id ?? `${note.name}-${note.message}-${index}`}
                name={note.name}
                message={note.message}
                index={index}
              />
            ))}
          </AnimatePresence>
        </ScrollRevealStagger>
      </ScrollReveal>
    </section>
  );
}
