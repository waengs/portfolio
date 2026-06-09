const VOTES_PREFIX = "poll-votes:";
const USER_VOTE_PREFIX = "poll-user-vote:";

export function getPollVotes(pollId: string): Record<string, number> {
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

export function getDevicePollVote(pollId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${USER_VOTE_PREFIX}${pollId}`);
}

export function votePoll(
  pollId: string,
  optionId: string,
): { votes: Record<string, number>; ok: boolean } {
  if (getDevicePollVote(pollId)) {
    return { votes: getPollVotes(pollId), ok: false };
  }

  const votes = getPollVotes(pollId);
  votes[optionId] = (votes[optionId] ?? 0) + 1;
  localStorage.setItem(`${VOTES_PREFIX}${pollId}`, JSON.stringify(votes));
  localStorage.setItem(`${USER_VOTE_PREFIX}${pollId}`, optionId);
  return { votes, ok: true };
}

export function totalPollVotes(votes: Record<string, number>): number {
  return Object.values(votes).reduce((sum, count) => sum + count, 0);
}

export function pollVotePercent(count: number, total: number): number {
  if (total <= 0 || count <= 0) return 0;
  return Math.round((count / total) * 100);
}
