# AGENT.md · `dl-agent-skill` 仓库接手协议

> 任何 AI 打开这个仓库时，请**先读完本文件**，再决定下一步。
> 目标：在 **2-3 分钟内** 读懂这个 skill 的定位、当前修改状态、下一步动作。

---

## 如果你是 AI，请按这个顺序执行

1. **先完整阅读本文件**，不要一上来全仓扫描。
2. 按“建议读取顺序”补充必要上下文。
3. 优先执行“下一步行动”里的第 1 项。
4. 只根据仓库内真实文件和测试结果判断状态，不要自己脑补“应该还有什么系统”。

---

## 当前焦点

- **一句话目标**：把 `dl-research-workflow` 打磨成一个可安装、可初始化、文档一致、跨 IDE / AI 可接手的文件化研究工作流 skill。
- **当前成功标准**：公开用户入口（安装器 → `dl-workflow` launcher → `init` / `init --integrate`）与 README、`SKILL.md`、测试完全一致；`npm test` 通过；发布包内容清晰。
- **本轮最重要的问题**：`init --integrate` 的公开 CLI 断点已修复，当前剩余问题主要是命令边界条件（无参数报错）和文档对 `jq` / `parse-pdf` / `summarize` 的能力表述一致性。

---

## 当前项目阶段

- [ ] 探索阶段 - 尝试不同定位和结构
- [ ] 定型阶段 - 确定核心结构与协议
- [ ] 优化阶段 - 补测试、修边界行为、对齐文档
- [x] 收尾阶段 - 做最终一致性检查，准备提交 / 发布

---

## 当前优先级（最多 3 项）

- [x] **P0**：保证 `README.md`、`index.js`、`skills/dl-research-workflow/scripts/init.sh`、`tests/run-tests.js` 的行为和描述一致。
- [x] **P1**：保留仓库根目录 `AGENT.md` 作为主状态文件，并保留 `AGENTS.md` / `CLAUDE.md` 作为兼容入口；同时忽略 `.workflow/`、`.codex` 及 dogfood 产生的本地运行态产物。
- [ ] **P2**：决定是否需要版本号更新、变更说明或发布前再跑一次 `npm pack --dry-run` 做最终检查。

---

## 当前活跃项

- **活跃文档**：`README.md`、`skills/dl-research-workflow/SKILL.md`
- **当前主代码路径**：`index.js`、`skills/dl-research-workflow/scripts/init.sh`
- **当前测试入口**：`tests/run-tests.js`
- **最近关键决策**：
  - 安装器现在会创建可调用的 `dl-workflow` launcher，并根据 `PATH` 给出真实可执行提示。
  - 标准 `init` 模式现在会对已有文件逐个确认是否覆盖，不再静默重写 `README.md` / `.gitignore`。
  - 根目录 `AGENT.md` 保留为主状态文件，`AGENTS.md` / `CLAUDE.md` 保留为兼容入口；`.workflow/` 作为本地运行态目录默认忽略。
  - 仓库根目录不是示例研究项目工作区；若在此 dogfood，本地生成的 `checkpoints/`、`data/`、`logs/`、`outputs/` 不默认提交。

---

## 阻塞点

- **当前无 P0 阻塞**。
- 次级问题仍有：无参数命令分支和顶层文档表述还有继续收口的空间，但不影响当前主路径可用性。

---

## 下一步行动（按顺序执行）

1. **决定是否继续修边界条件**：检查 `dl-workflow event` / `inspire` / `parse-pdf` / `summarize` 在缺参数时是否要改成更稳定的友好报错，并补对应测试。
2. **做一轮文档对齐**：统一 README、`SKILL.md`、`references/cli-commands.md` 对 `jq` 依赖、`parse-pdf`、`summarize` 能力边界的表述。
3. **如果准备发布**：决定是否更新 `package.json` 版本，跑 `npm test` + `npm pack --dry-run`，再整理提交说明。

> 要求：先解决剩余一致性问题，再谈发布或版本提升。

---

## 建议读取顺序

如果你需要更多上下文，请按以下顺序继续阅读：

1. `README.md`
2. `skills/dl-research-workflow/SKILL.md`
3. `index.js`
4. `skills/dl-research-workflow/scripts/init.sh`
5. `tests/run-tests.js`
6. `package.json`
7. `git status`

---

## 快速链接

| 内容 | 位置 |
|------|------|
| 项目总览 | `README.md` |
| Skill 定义 | `skills/dl-research-workflow/SKILL.md` |
| 安装器 | `index.js` |
| 初始化脚本 | `skills/dl-research-workflow/scripts/init.sh` |
| CLI 脚本 | `skills/dl-research-workflow/scripts/dl-workflow` |
| 测试入口 | `tests/run-tests.js` |
| 包信息 | `package.json` |
| 模板目录 | `skills/dl-research-workflow/assets/templates/` |
| 参考文档 | `skills/dl-research-workflow/references/` |
| 忽略规则 | `.gitignore` |

---

## 维护规则

- **保持短**：这里只写当前仓库最重要的状态，不要复制 README。
- **保持新**：每次修改安装器、初始化行为、测试或发布策略后更新。
- **保持指向性**：细节写回源文件；这里负责导航和当前决策摘要。
- **保持可执行**：`下一步行动` 必须让下一个 AI 能直接开始工作。
- **区分源码与运行态**：`skills/`、`tests/`、`README.md`、`SKILL.md`、根目录 `AGENT.md` / `AGENTS.md` / `CLAUDE.md` 是源码；根目录 `.workflow/` 以及 dogfood 产生的 `checkpoints/`、`data/`、`logs/`、`outputs/` 属于本地运行态，不默认提交。
- **不要误泛化根目录规则**：本仓库根目录 `.workflow/` 只是 dogfood 运行态；而用户项目初始化后生成的 `.workflow/` 是正式状态源，通常应作为项目知识资产纳管。

---

## 最后更新

- 最后更新时间: 2026-04-12T17:06:00Z
- 更新者: repo-hygiene-fixer (ChatGPT)
