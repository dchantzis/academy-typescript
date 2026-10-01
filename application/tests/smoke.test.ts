import test from "node:test";
import assert from "node:assert/strict";

test("test runner executes TypeScript", () => {
  const total: number = 1200 * 2;
  assert.equal(total, 2400);
});
