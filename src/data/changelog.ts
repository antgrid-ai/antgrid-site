// Joins the changelog's two halves. `changelog-releases.ts` is the machine half
// — tag, date, URL, one maintenance flag — rewritten wholesale by
// scripts/sync-changelog.mjs on every run. `changelog-notes.ts` is the human
// half: never written by a script, as the generated one is never written by
// hand.
//
// Not every release needs notes. Three states render, and all three are honest:
//
//   1. A release with a NOTES entry renders the prose.
//   2. A release the tooling marked `maintenance` says so in one line. These
//      are builds where the release itself declared no user-facing change, so
//      writing prose for one would be inventing a change that did not happen.
//   3. Anything else renders as version, date and a link to the full generated
//      notes. Deliberately NOT a "no notes yet" placeholder: a page that ships
//      its own TODOs reads as abandoned, and the link is a real answer rather
//      than an apology. Backfilling one later is adding a key to
//      changelog-notes.ts, nothing else.
//
// So the page is complete the moment a release exists, and gets better when
// someone has ten minutes. That is the whole point of the split.
import { NOTES } from "./changelog-notes";
import { RELEASES } from "./changelog-releases";

/** One published release, exactly as sync-changelog.mjs recorded it. */
export type Release = {
  /** The git tag, verbatim. */
  version: string;
  /** `YYYY-MM-DD`, UTC. */
  date: string;
  /** The GitHub release page, which carries the full generated PR list. */
  url: string;
  /** The release declared no user-facing change. */
  maintenance: boolean;
};

/**
 * What kind of change a line is. Four, deliberately: almost everyone scanning
 * this page is looking for the thing that bit them, and a longer vocabulary
 * spreads that over three words which all mean `fixed`.
 *
 * `security` is the one that has to stay scarce. It names the account and
 * access boundary — who may reach this machine, what a signed-out session can
 * still see, an address built to be misread. Not anything that merely touches
 * the crypto path: spend it on a cipher's throughput and it stops meaning
 * anything, and the reader who most needs it learns to skip it.
 */
export const KIND_LABEL = {
  new: "New",
  changed: "Changed",
  fixed: "Fixed",
  security: "Security",
} as const;

export type Kind = keyof typeof KIND_LABEL;

/**
 * One change and the kind it is. A tuple rather than an object because these
 * are written and read as prose: `["fixed", "…"]` keeps a change on one line of
 * the file, where `{ kind: "fixed", text: "…" }` wraps every one of them and the
 * file stops reading like writing.
 */
export type Change = [Kind, string];

export type Note = {
  /** Optional. Only worth setting when a release has a through-line a reader
   *  would recognise; most do not, and a manufactured headline on a routine
   *  build is worse than none. */
  title?: string;
  /** One entry per change worth a stranger's attention. Not one per PR — most
   *  releases carry several nobody outside the repo can act on.
   *
   *  The order is editorial and the page renders it as written: the line a
   *  release leads with is the one someone judged worth leading with. Sorting
   *  these into kind order would put "And this page." above Modelwatch. */
  lines: Change[];
};

/** A release plus its notes, if anyone has written any. */
export type Entry = Release & { note?: Note };

/** Newest first, as sync-changelog.mjs sorted them. */
export const ENTRIES: Entry[] = RELEASES.map((release) => ({
  ...release,
  note: NOTES[release.version],
}));

/**
 * Note keys matching no published release. Always empty in a healthy tree: a
 * non-empty list means either a tag was typo'd here or a release was deleted
 * upstream, and both lose prose that someone sat down and wrote.
 */
export const ORPHAN_NOTES = Object.keys(NOTES).filter(
  (version) => !ENTRIES.some((entry) => entry.version === version),
);

/**
 * "8 September 2026". Forced to UTC because the stored date is UTC: left to the
 * runner's zone a build in the Americas renders every release a day early, and
 * two CI runs of an unchanged file would disagree.
 */
export const formatDate = (date: string): string =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * One day of the cadence strip on /changelog.
 *
 * The window runs from the oldest release the page shows to the NEWEST, not to
 * today. Anchored to the clock the axis would be redrawn on every deploy, and
 * two builds of an unchanged file would disagree — the same hazard formatDate's
 * UTC lock exists for. Nothing is hidden by that choice: a long silence since
 * the last build is still legible, it is just read off the newest date rather
 * than drawn as a run of empty ticks.
 */
export type StripDay = {
  /** `YYYY-MM-DD`, UTC. */
  date: string;
  /** What shipped that day, newest first. Empty on a day nothing did. */
  releases: Release[];
};

const DAY_MS = 86_400_000;

/**
 * Longest axis worth drawing. The strip fills the measure whatever it holds, so
 * past roughly this a tick is thinner than the gap beside it and the run of
 * marks stops resolving as anything.
 */
export const STRIP_DAYS = 90;

/**
 * The shipping record as one tick per day. Days are derived rather than taken
 * from the releases themselves because the gaps are the whole point — a list of
 * release dates says the same thing a list of releases already says.
 */
export const releaseStrip = (entries: Entry[] = ENTRIES): StripDay[] => {
  if (entries.length === 0) return [];
  // Min/max rather than first/last: the generated spine is sorted newest-first,
  // but nothing here should break quietly if that ever stops being true.
  const at = (entry: Entry) => Date.parse(`${entry.date}T00:00:00Z`);
  const newest = Math.max(...entries.map(at));
  const start = Math.max(Math.min(...entries.map(at)), newest - (STRIP_DAYS - 1) * DAY_MS);

  const days: StripDay[] = [];
  for (let ms = start; ms <= newest; ms += DAY_MS) {
    const date = new Date(ms).toISOString().slice(0, 10);
    days.push({ date, releases: entries.filter((entry) => entry.date === date) });
  }
  return days;
};
