import { expect, test } from "vitest";
import { add } from "../src/calc";

test("add 1 + 2 = 3", () => {
  expect(add(1, 2)).toBe(3);
});
