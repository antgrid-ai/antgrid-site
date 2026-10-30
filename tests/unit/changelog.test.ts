import { expect, test } from "bun:test";
import { ENTRIES, ORPHAN_NOTES } from "../../src/data/changelog";
import { NOTES } from "../../src/data/changelog-notes";

// Notes are keyed by tag and the page joins them to the release spine silently.
// A key matching no release renders nowhere and reports nothing, so a typo'd tag
// or a release deleted upstream costs someone their writing with nothing red
// anywhere. changelog-notes.ts says this is pinned; this is where, in the unit
// suite because CI runs it and does not run Playwright.
test("every hand-written note reaches a release", () => {
  expect(ORPHAN_NOTES).toEqual([]);
});

// CONTENT.md tells writers to give an all-chores release `lines: []`. Rendered
// as a note it would be an empty list under a version number, so it has to come
// out as a maintenance build instead.
test("a note with no lines renders as a maintenance build", () => {
  const empty = Object.keys(NOTES).filter((version) => NOTES[version].lines.length === 0);
  const entries = ENTRIES.filter((entry) => empty.includes(entry.version));
  expect(entries.map((entry) => [entry.version, entry.maintenance, entry.note])).toEqual(
    empty.map((version) => [version, true, undefined]),
  );
});
