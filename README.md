# DL Research Workflow

> A file-based handoff protocol for AI-assisted deep learning research.
>
> 一个面向 AI 辅助深度学习研究的文件化上下文交接协议，让任何 AI / IDE 打开项目后都能快速接手研究状态。

---

## What / Why · 这是什么，为什么需要

`dl-research-workflow` 解决的核心问题是：**研究上下文容易丢。**

在一个持续数周或数月的深度学习研究项目里，很多重要信息会散落在聊天记录、临时笔记、README、实验日志和代码注释中：

- 这个项目现在到底在研究什么？
- 当前处于探索、实验、收敛还是发布阶段？
- 哪些实验已经做过，结论是什么？
- 哪些路线失败过，为什么失败？
- 最近有哪些关键决策？
- 当前卡在哪里？
- 下一个 AI 会话应该继续做什么？

这个 skill 的目标不是提供一个大而全的研究管理平台，而是提供一套轻量、文件化、工具无关的上下文协议：

- 用 `AGENT.md` 保存当前项目状态和 AI 接手入口
- 用 `.workflow/research/plan.md` 保存研究计划
- 用 `.workflow/research/experiments/` 保存实验记录
- 用 `.workflow/events/` 保存关键事件和决策
- 用 `dl-workflow` CLI 辅助初始化、查看状态和记录事件

一句话：

> 不要再给每个 AI 会话重复解释你的研究项目。把研究状态写进项目文件，让任何 AI 几分钟内接手。

---

## 3-Minute Handoff · 三分钟接手标准

MVP 的成功标准不是目录有多完整，而是：

> 一个新 AI 在没有聊天历史的情况下，打开项目 3 分钟内，能准确回答 5 个问题。

这 5 个问题是：

1. 这个项目在研究什么？
2. 当前处于什么阶段？
3. 最近做过哪些关键实验或决策？
4. 当前最重要的阻塞点是什么？
5. 下一步应该做什么？

如果某个文件、模板或命令不能直接帮助回答这些问题，它就属于 optional / advanced，而不是核心协议。

---

## Core Protocol · 核心协议

你第一天只需要理解 4 个核心对象：

| 核心对象 | 作用 |
| --- | --- |
| `AGENT.md` | AI 首读入口，保存项目当前状态、阻塞点和下一步 |
| `.workflow/research/plan.md` | 研究目标、假设、路线、评估方式和近期计划 |
| `.workflow/research/experiments/` | 活跃实验、已完成实验和实验结论 |
| `.workflow/events/` | 关键事件、决策、失败原因、方向变化和重要发现 |

其他目录如 `.workflow/knowledge/`、`.workflow/references/`、`.workflow/snapshots/`、`.workflow/presentations/` 都是有用的扩展，但不是新用户第一天必须掌握的内容。

---

## Quick Start · 快速开始

### Install · 安装

运行 `npx create-dl-research-workflow` 安装。

安装后：

- skill 会被放到 `~/.claude/skills/dl-research-workflow/`
- 在 Linux / macOS 上，安装器还会创建 `~/.local/bin/dl-workflow`

如果你的 shell 还没有把 `~/.local/bin` 加进 `PATH`，可以先直接运行 `~/.local/bin/dl-workflow help`。

也可以把 `export PATH="$HOME/.local/bin:$PATH"` 加入 shell 配置后重新加载。

CLI 当前依赖 `jq`。如果未安装，`dl-workflow` 会在启动时提示缺少依赖。

常见安装方式：

- macOS：`brew install jq`
- Ubuntu / Debian：`sudo apt install -y jq`

### Initialize a New Project · 初始化新项目

在新研究项目目录中运行 `dl-workflow init`。

标准初始化会创建 `AGENT.md`、`.workflow/` 和相关模板；如果目标文件已存在，会逐个确认是否覆盖。

初始化完成后，优先编辑：

1. `AGENT.md`
2. `.workflow/research/plan.md`
3. `.workflow/research/experiments/active/`

### Integrate Into an Existing Project · 集成到已有项目

在已有项目中运行 `dl-workflow init --integrate`。

集成模式是非破坏性的：只补缺失文件，不覆盖已有文件。它适合给已有研究代码仓库补上一套 AI 接手协议。

---

## End-to-End Usage Flow · 完整使用流程

推荐把这个 skill 当作一套轻量的 AI 研究交接循环来使用：

1. **初始化项目状态**
   - 新项目运行 `dl-workflow init`
   - 已有项目运行 `dl-workflow init --integrate`

2. **补齐核心上下文**
   - 在 `AGENT.md` 写清项目目标、当前焦点、阻塞点和下一步
   - 在 `.workflow/research/plan.md` 写清研究问题、假设、路线和评估方式
   - 在 `.workflow/research/experiments/active/` 创建或更新当前实验记录

3. **让 AI 按协议接手**
   - 新 AI / 新会话先读 `AGENT.md`
   - 再读 `plan.md`、活跃实验和最近事件
   - 接手后先确认当前目标、阶段、阻塞点和下一步，而不是直接全仓扫描

4. **研究过程中持续记录**
   - 用 `dl-workflow event "描述"` 记录关键决策、实验结果、失败原因和阻塞点
   - 用 `dl-workflow inspire "想法"` 记录暂时不做但值得保留的研究灵感
   - 把实验设置、结果和结论写回实验记录

5. **切换会话前压缩状态**
   - 更新 `AGENT.md` 的当前焦点、阻塞点和下一步行动
   - 必要时更新 `plan.md`、实验记录和 `.workflow/events/`
   - 不要只把重要判断留在聊天记录里

6. **项目变复杂后再使用高级辅助**
   - 用 `parse-pdf` 创建论文解析工作区，但真实 PDF 解析仍由外部工具或人工完成
   - 用 `summarize <daily|weekly>` 输出总结提示和保存约定，再由人或 AI 整理总结

---

## Daily Workflow · 日常使用方式

### 1. 接手项目

新 AI 或新会话先读 `AGENT.md`，再按项目中给出的读取顺序补充上下文。

### 2. 查看状态

运行 `dl-workflow status` 查看当前工作流状态。

它用于快速确认：

- `AGENT.md` 是否存在
- `.workflow/` 是否存在
- 已记录多少事件
- 论文 PDF 和解析占位目录数量

### 3. 记录关键事件

运行 `dl-workflow event "描述"` 记录关键事件、实验结论、方向变化或阻塞点。

适合记录：

- 决定采用或放弃某个方法
- 一个实验完成并得到结论
- 某个 bug 的根因被确认
- baseline、数据集或评估方式发生变化
- 人类做出了方向性决策

### 4. 记录灵感

运行 `dl-workflow inspire "想法"` 记录研究灵感。

适合记录还没有进入计划但值得保留的想法，例如新实验、新论文启发、新特征或新消融方向。

### 5. 切换会话前更新状态

在切换 IDE / AI / 会话前，至少更新：

- `AGENT.md` 的当前焦点
- `AGENT.md` 的阻塞点
- `AGENT.md` 的下一步行动
- 必要的实验记录或事件记录

不要只把重要判断留在聊天记录里。

---

## AI Handoff Guide · AI 接手协议

任何 AI 打开一个已初始化的项目时，建议按这个顺序阅读：

1. 先读 `AGENT.md`
2. 再读 `.workflow/research/plan.md`
3. 再看 `.workflow/research/experiments/active/`
4. 再看 `.workflow/events/`
5. 需要讨论脉络时，再看 `.workflow/discussions/timeline.md`
6. 需要背景资料时，再看 `.workflow/references/` 和 `.workflow/knowledge/`

AI 接手后应该能回答：

- 项目目标是什么？
- 当前阶段是什么？
- 当前活跃实验是什么？
- 最近关键决策是什么？
- 当前阻塞点是什么？
- 下一步应该做什么？
- 有哪些文件、数据或方向不能随意改动？

如果回答不了，优先补充 `AGENT.md` 和 `plan.md`，而不是继续增加目录或模板。

---

## Command Reference · 命令参考

### Core Commands · 核心命令

| 命令 | 说明 |
| --- | --- |
| `dl-workflow init` | 初始化新研究项目 |
| `dl-workflow init --integrate` | 非破坏性集成到已有项目 |
| `dl-workflow status` | 查看当前工作流状态 |
| `dl-workflow event "描述"` | 记录关键事件、决策、实验结论或阻塞点 |
| `dl-workflow inspire "想法"` | 记录研究灵感 |
| `dl-workflow help` | 显示帮助 |

### Advanced Commands · 高级命令

| 命令 | 说明 |
| --- | --- |
| `dl-workflow parse-pdf <pdf-file> [paper-id]` | 为单个 PDF 创建论文解析工作区 |
| `dl-workflow parse-pdf --all` | 为 `.workflow/references/papers/pdf/` 下的 PDF 批量创建解析工作区 |
| `dl-workflow summarize <daily|weekly>` | 输出日总结或周总结提示和保存约定 |

说明：

- `dl-workflow` CLI 当前依赖 `jq`；所有命令启动时都会先检查它是否可用。
- `dl-workflow` 启动器默认安装在 `~/.local/bin/dl-workflow`；如果该目录不在 `PATH` 中，也可以直接用完整路径调用。
- `init` 是标准初始化模式；会生成 `AGENT.md`、`AGENTS.md`、`CLAUDE.md` 和 `.workflow/` 结构，已有文件会逐个询问是否覆盖。
- `init --integrate` 是非破坏性集成模式；只补缺失文件，不覆盖已有文件。
- `parse-pdf` 当前会补齐 `.workflow/config/pdf-parser.json`，并创建解析工作目录与 `paper.md` 占位文件；不会自动调用 MinerU API。
- `summarize` 当前只输出建议读取范围与保存位置；不会自动生成总结文件。

---

## Advanced Features · 高级能力

这些能力可以在项目变复杂后逐步使用，不是核心协议的第一层。

### Full `.workflow/` Structure · 完整目录结构

标准初始化可能包含这些目录：

| 路径 | 定位 |
| --- | --- |
| `.workflow/discussions/` | 讨论时间线和按主题归档 |
| `.workflow/knowledge/` | 项目知识沉淀 |
| `.workflow/references/` | 论文、repo、灵感和代码片段 |
| `.workflow/snapshots/` | 阶段状态快照 |
| `.workflow/presentations/` | 周报、阶段总结和汇报材料 |
| `.workflow/artifacts/` | 产物清单 |
| `.workflow/config/` | 工具配置 |
| `.workflow/templates/` | 记录模板 |

### Template Suite · 模板系统

当前提供 30 个模板，覆盖计划、实验、发现、总结、参考资料与跨 IDE 兼容入口等常见研究记录场景。

新用户优先关注核心模板：

- `AGENT.md.template`
- `plan.md.template`
- `experiment.md.template`
- `event.json.template`
- `decision-review.md.template`
- `inspiration.md.template`
- `weekly-summary.md.template`

其他模板属于 advanced，用于论文阅读、消融实验、风险登记、里程碑、阶段总结、可视化、参考资料和知识库维护。

### PDF Workspace Scaffold · PDF 工作区脚手架

`parse-pdf` 只负责创建论文解析工作区、配置占位和 `paper.md` 占位文件。它不会自动解析 PDF，也不会自动调用 MinerU API。

如果你需要真实 PDF 解析，可以把 MinerU 或其他解析器的输出粘贴或接入到生成的工作区中。

### Summary Prompt Helper · 总结提示助手

`summarize <daily|weekly>` 只输出日总结或周总结提示和推荐保存位置。它不会自动读取所有文件并生成总结。

你可以让 AI 根据提示读取 `.workflow/events/`、`.workflow/discussions/timeline.md` 和 `.workflow/research/experiments/` 后，再手动或半自动生成周总结。

---

## Boundaries · 能力边界

`dl-research-workflow` 不做这些事情：

| 不做什么 | 原因 |
| --- | --- |
| 多 agent 编排 | 它是共享状态协议，不是调度系统 |
| 自动任务调度 | 容易变成复杂平台 |
| 权限管理或审批流 | 超出轻量 skill 范围 |
| GPU / 训练任务管理 | 应交给训练脚本、调度系统或平台 |
| 指标追踪和可视化 | WandB、MLflow、TensorBoard 更适合 |
| 数据版本管理 | DVC 等工具更适合 |
| 模型 registry | 不是本 skill 的目标 |
| 真实 PDF 解析 | 依赖外部工具和复杂错误处理 |
| 自动生成完整周报 | 当前只提供提示和保存约定 |
| 替代 Notion / Jira / Linear | 它只维护研究上下文 |

它只专注一件事：

> 维护 AI 可接手的研究上下文。

---

## Documentation · 文档入口

- [Skill Definition · Skill 定义](skills/dl-research-workflow/SKILL.md)
- [AGENT.md 说明](skills/dl-research-workflow/references/agent-md.md)
- [研究结构说明](skills/dl-research-workflow/references/research-structure.md)
- [命令说明](skills/dl-research-workflow/references/cli-commands.md)
- [模板说明](skills/dl-research-workflow/references/templates.md)
- [最佳实践](skills/dl-research-workflow/references/best-practices.md)

---

## Best Practices · 最佳实践

- 把 `AGENT.md` 当作 AI 接手卡片，而不是普通说明文件
- 切换工具或会话前，先更新 `AGENT.md`
- 重要决策用 `dl-workflow event` 记录
- 每个实验都要写清楚目标、设置、结果、结论和下一步
- 参考论文与 repo 要写摘要，不要只收藏链接
- 定期整理周总结或阶段总结，把事件和实验结论压缩成更容易接手的状态

---

## License · 许可证

MIT
