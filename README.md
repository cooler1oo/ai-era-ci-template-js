# 项目名

一个用 ai-era-ci 技能配好的 JS/TS 项目骨架。检查拆成三个时候：

|     | 什么时候跑             | 查什么                                | 放在哪                                                  |
| --- | ---------------------- | ------------------------------------- | ------------------------------------------------------- |
| ①   | 每次 `git commit` 之前 | Prettier 格式化暂存的文件（几秒）     | `.husky/pre-commit` + `package.json` 里的 `lint-staged` |
| ②   | 开 PR 时               | 只跑和这次改动相关的测试，限时 5 分钟 | `.github/workflows/pr-fast.yml`                         |
| ③   | 合进 `main` 之后       | 全部测试，含慢测试                    | `.github/workflows/main-full.yml`                       |

## 开始用

1. 点右上角 **Use this template** → 建你自己的仓库
2. 本地克隆后装一次依赖（`npm install` 会顺手把提交前钩子装好）：

   ```bash
   npm install
   ```

3. 把 `src/` 换成你的代码，`tests/` 换成你的测试
4. 第一次 `git commit` 时，Prettier 会自动把暂存的文件排好

## 三个地方可能要改

| 要改什么                  | 改哪                                        |
| ------------------------- | ------------------------------------------- |
| Node 版本不是 20          | 两个 workflow 里的 `node-version`           |
| 默认分支不叫 `main`       | `main-full.yml` 的 `branches:`              |
| 用 pnpm / yarn 而不是 npm | 两个 workflow 里的 `npm ci` 和 `cache: npm` |

## 慢测试怎么标

**文件名**里带 `.slow.test.` 就行，比如 `tests/checkout.slow.test.ts`。

② 会排除它们（`--exclude '**/*.slow.test.*'`），③ 会全部跑。

## 这个模板没包含什么

- **ESLint**：只配了 Prettier。想加就 `npm i -D eslint`，然后在 `package.json` 的 `lint` 脚本里加上，② 会自动跑它（那句 `npm run lint --if-present`）。
- ④ 特性开关、攒批：需要真实用户量或大量 PR 才有意义，按需再加。

## 两个坑，别改回去

- `vitest.config.ts` 里 `fileParallelism: false`：Windows 上 vitest 并行 worker 写系统临时目录会被拦（EPERM），症状是「明明有 4 个测试文件，只跑了 1 个」。CI 的 Linux 机器不需要，嫌慢可以删。
- 新建文件后如果 ② 显示「这次没改代码文件，跳过」，检查一下扩展名在 `pr-fast.yml` 的 `--` 白名单里（`*.ts` `*.tsx` `*.js` 等）。
