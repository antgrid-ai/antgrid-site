export { LAST_REVIEWED, ROADMAP } from "./roadmap-entries";

type RoadmapDetails = {
  id: string;
  title: string;
  description: string;
  area: string;
  update: string;
  updatedAt: string;
  discussionUrl?: string;
};

export type RoadmapEntry = RoadmapDetails & (
  | { status: "now" | "next" | "exploring"; releaseUrl?: never }
  | { status: "done"; releaseUrl?: string }
);

// Done shows only the most recent completions; the changelog is the full record
// of what shipped, so the roadmap stays about direction rather than an archive.
export const DONE_LIMIT = 5;

export function groupRoadmap(entries: readonly RoadmapEntry[]) {
  return [
    { id: "now", title: "Now", description: "Work in progress.", entries: entries.filter((entry) => entry.status === "now") },
    { id: "next", title: "Next", description: "Planned work.", entries: entries.filter((entry) => entry.status === "next") },
    { id: "exploring", title: "Exploring", description: "Ideas under consideration, not commitments.", entries: entries.filter((entry) => entry.status === "exploring") },
    { id: "done", title: "Done", description: "The latest completed features.", entries: entries.filter((entry) => entry.status === "done").sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, DONE_LIMIT) },
  ].filter((group) => group.entries.length > 0);
}

export function formatRoadmapDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}
