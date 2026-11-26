// 本机（Windows）上 vitest 默认并行开 worker，写系统临时目录可能被拦（EPERM），
// 表现是「只跑了 1 个测试文件」。串行可规避；CI 的 Linux 机器不需要这个，
// 嫌慢可以把它删掉。
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    fileParallelism: false,
  },
});
