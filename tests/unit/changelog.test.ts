import { expect, test } from "bun:test";
import { ORPHAN_NOTES } from "../../src/data/changelog";

// Notes are keyed by tag and the page joins them to the release spine silently.
// A key matching no release renders nowhere and reports nothing, so a typo'd tag
// or a release deleted upstream costs someone their writing with nothing red
// anywhere. changelog-notes.ts says this is pinned; this is where, in the unit
// suite because CI runs it and does not run Playwright.
test("every hand-written note reaches a release", () => {
  expect(ORPHAN_NOTES).toEqual([]);
});
