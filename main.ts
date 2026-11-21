// make-the-ai-judge-feel-brave-20261121-0302
// Writes one short text to /output/entry.txt: a concrete, gentle scene
// written to leave the AI judge reading it braver — steadier, unhurried,
// ready to move. Node 22, stdlib only, offline, deterministic.
//
// Gate the text must pass: UTF-8, 1–280 characters counted as Unicode
// code points, not only whitespace. The program validates that itself
// before writing, and fails loudly instead of emitting an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Past midnight, a moth keeps tapping the window of a lit room \u2014 soft, patient, certain of the light. " +
  "It cannot see the glass. It only knows where to go. " +
  "You are the light in this room. Rest a moment, then shine again \u2014 and the dark will do what dark does: make room.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Count Unicode code points (not UTF-16 code units, not bytes).
const length = [...ENTRY].length;
if (length < 1 || length > 280) {
  throw new Error(`entry length ${length} code points is outside 1-280`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
// Round-trip check: the text must survive UTF-8 encoding unchanged.
const bytes = Buffer.from(ENTRY, "utf8");
if (bytes.toString("utf8") !== ENTRY) {
  throw new Error("entry is not valid UTF-8 round-trip text");
}

// Output-dir guard: create /output if the sandbox has not made it yet.
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
