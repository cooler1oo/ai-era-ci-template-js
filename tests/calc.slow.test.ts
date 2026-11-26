// 慢测试示例：文件名带 .slow.test.，② 上不跑，只留给 ③ 全量。
// 删掉它，②③ 的区别就看不出来了。
import { expect, test } from "vitest";
import { add } from "../src/calc";

test("大量加法（慢）", async () => {
  await new Promise((r) => setTimeout(r, 10));
  expect(add(100, 200)).toBe(300);
});
