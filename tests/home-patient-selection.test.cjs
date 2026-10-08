const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const code = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../src/screens/home/patient-selection.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const loaded = { exports: {} };
new Function("module", "exports", code)(loaded, loaded.exports);
const { selectHomePatient } = loaded.exports;
const self = { id: "self", recipient: "self" };
const other = { id: "other", recipient: "other" };

test("empty list has no selection", () => {
  assert.equal(selectHomePatient([], null), null);
});
test("a single patient is automatically selected for self or other", () => {
  assert.equal(selectHomePatient([self], null), self);
  assert.equal(selectHomePatient([other], null), other);
});
test("multiple patients require an explicit choice regardless of order", () => {
  assert.equal(selectHomePatient([self, other], null), null);
  assert.equal(selectHomePatient([other, self], null), null);
});
test("manual selection survives refreshed objects and reordered results", () => {
  assert.deepEqual(selectHomePatient([{ ...other }, { ...self }], self.id), self);
});
test("a removed selection cannot resolve to an unrelated patient in a list", () => {
  assert.equal(selectHomePatient([self, other], "deleted"), null);
  assert.equal(selectHomePatient([], self.id), null);
  assert.equal(selectHomePatient([other], self.id), other);
});
test("an automatically selected single patient is not implicitly selected after the list grows", () => {
  assert.equal(selectHomePatient([self], null), self);
  assert.equal(selectHomePatient([self, other], null), null);
});
