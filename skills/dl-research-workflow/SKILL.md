---
name: dl-research-workflow
description: 面向 AI 辅助深度学习研究的文件化上下文交接协议。适用于创建或集成研究项目状态文件，让任何 AI / IDE 能通过 AGENT.md 和 .workflow/ 快速理解项目目标、计划、实验、事件和下一步行动。
---

# DL Research Workflow

`dl-research-workflow` 是一个**面向 AI 辅助深度学习研究的文件化上下文交接协议**。

它的目标不是管理整个研究项目，也不是编排多个 agent，而是解决一个更具体的问题：

> 让任何 AI 在没有聊天历史的情况下，打开项目几分钟内就能接手当前研究上下文。

这个 skill 通过 `AGENT.md` 和 `.workflow/` 把研究目标、当前计划、实验记录、事件日志和下一步行动保存到项目文件中。这样，无论你切换 Claude Code、Cursor、VS Code、ChatGPT、Codex 或其他 AI 工具，项目本身都能携带稳定上下文。

---

## Purpose · 目的

使用这个 skill 时，AI 应帮助用户把研究状态从聊天记录中沉淀到文件系统里。

它应该让项目持续回答：

- 这个项目在研究什么？
- 当前处于什么阶段？
- 最近做过哪些关键实验或决策？
- 当前最重要的阻塞点是什么？
- 下一步应该做什么？

这 5 个问题就是本 skill 的核心验收标准。目录结构、模板和命令都应该服务于这个目标。

---

## When to Use · 适用场景

当用户正在做以下事情时，应该考虑使用这个 skill：

- 创建新的深度学习研究项目
- 将 AI 接手协议集成到已有研究项目
- 做论文复现、模型改进、消融实验或研究型工程探索
- 在不同 IDE / AI 工具之间切换，需要保持上下文连续
- 希望把计划、实验、决策、灵感和总结写回项目文件
- 希望新的 AI 助手快速理解当前研究状态并继续工作

典型用户是正在使用 AI 辅助研究的人，而不是只想要完整项目管理平台、训练平台或多 agent 调度系统的人。

---

## First-Read Protocol · AI 首读协议

如果用户让你接手一个已初始化的项目，**先读 `AGENT.md`**。

不要一上来全仓扫描，也不要假设聊天历史就是状态源。`AGENT.md` 是本协议的首读入口，应该告诉你：

- 项目一句话目标
- 当前研究阶段
- 当前焦点
- 活跃实验
- 最近关键决策
- 当前阻塞点
- 下一步行动
- 建议继续读取的文件
- 不要做什么

如果 `AGENT.md` 缺失、过期或信息不足，应提醒用户，并优先帮助补齐它。

---

## Core Files · 核心状态文件

MVP 只要求 AI 优先理解 4 类核心对象。

| 文件 / 目录 | 作用 |
|------|------|
| `AGENT.md` | AI 首读入口，保存当前状态摘要和下一步 |
| `.workflow/research/plan.md` | 研究目标、假设、路线、评估方式和计划 |
| `.workflow/research/experiments/` | 活跃实验、已完成实验和实验结论 |
| `.workflow/events/` | 关键事件、决策、失败、阻塞和方向变化 |

其他目录如 `.workflow/knowledge/`、`.workflow/references/`、`.workflow/snapshots/`、`.workflow/presentations/`、`.workflow/templates/` 都是有用的扩展结构，但不要让它们抢占第一层心智。

先保证目标、计划、实验、事件和下一步清楚，再使用高级结构。

---

## Handoff Checklist · 接手检查清单

接手项目后，AI 应先通过文件回答以下问题：

1. 这个项目在研究什么？
2. 当前处于什么阶段？
3. 当前最重要的研究焦点是什么？
4. 最近有哪些关键实验、结论或决策？
5. 当前活跃实验在哪里？
6. 当前阻塞点是什么？
7. 下一步应该做什么？
8. 有哪些文件、数据、实验或方向不能随意改动？

如果无法回答，应先阅读或补充：

1. `AGENT.md`
2. `.workflow/research/plan.md`
3. `.workflow/research/experiments/active/`
4. `.workflow/events/`
5. `.workflow/discussions/timeline.md`
6. 需要背景时，再读 `.workflow/knowledge/` 和 `.workflow/references/`

---

## Logging Protocol · 记录协议

研究过程中的关键变化应写回文件，而不是只留在聊天里。

适合记录到 `.workflow/events/` 的内容包括：

- 方向变化
- 人类关键决策
- 实验完成或失败
- 重要 bug 根因
- 数据问题
- baseline 或模型选择变化
- 阻塞点
- 新的研究判断
- 发布、提交或阶段性节点

可以使用：

| 命令 | 说明 |
|------|------|
| `dl-workflow event "描述"` | 记录关键事件、决策、实验结果或阻塞 |
| `dl-workflow inspire "想法"` | 记录研究灵感 |

不要把所有普通文件修改都记录成事件。事件日志用于保存影响研究方向、接手判断或后续决策的内容。

---

## Update Protocol · 更新协议

当出现以下情况时，AI 应建议更新 `AGENT.md` 或相关 `.workflow/` 文件：

- 当前焦点改变
- 下一步行动改变
- 实验完成、失败或暂停
- 用户做出方向性决策
- 发现新的阻塞点
- 解决了关键 bug
- 新增重要研究结论
- 会话即将结束，需要交接给下一次 AI

切换 IDE / AI / 会话前，至少更新：

- `AGENT.md` 的当前焦点、阻塞点、下一步行动
- `.workflow/research/plan.md` 中受影响的计划
- 相关实验记录
- 必要的事件或决策记录

---

## Commands · 命令分层

### Core Commands · 核心命令

| 命令 | 说明 |
|------|------|
| `dl-workflow init` | 初始化新研究项目 |
| `dl-workflow init --integrate` | 非破坏性集成到已有项目 |
| `dl-workflow status` | 查看当前研究状态 |
| `dl-workflow event "描述"` | 记录关键事件或决策 |
| `dl-workflow inspire "想法"` | 记录研究灵感 |
| `dl-workflow help` | 显示帮助 |

这些命令构成本 skill 的主路径：初始化、接手、记录和检查状态。

### Advanced Commands · 高级命令

| 命令 | 说明 |
|------|------|
| `dl-workflow parse-pdf <file> [paper-id]` | 为单个 PDF 创建论文解析工作区、配置占位和 `paper.md` 占位文件 |
| `dl-workflow parse-pdf --all` | 为 `papers/pdf/` 下全部 PDF 创建解析工作区 |
| `dl-workflow summarize weekly` | 输出周总结提示与保存约定 |

能力边界：

- `parse-pdf` 不会自动调用 MinerU API，也不会真实解析 PDF。
- `summarize` 不会直接生成总结文件，只输出建议读取范围与保存位置。
- CLI 当前依赖 `jq`；未安装时会先报依赖错误。
- 外部 PDF 解析器（如 MinerU）只是可选能力，仅在用户自行接入真实解析流程时需要。

详见 [references/cli-commands.md](references/cli-commands.md)

---

## Boundaries · 能力边界

这个 skill 不负责：

- 多 agent 编排
- 任务调度
- 权限管理或自动审批流
- GPU / 训练任务管理
- 实验指标追踪和可视化
- 数据版本管理
- 模型 registry
- 真实 PDF 解析
- 自动生成完整周报
- 替代 WandB / MLflow / TensorBoard / DVC
- 替代 Notion / Jira / Linear

它只维护一件事：

> AI 可接手的研究上下文。

---

## Safety Rules · 安全规则

AI 可以提出建议、整理文件并补充结构化记录，但以下操作应先获得用户确认：

- 删除或覆盖重要文件
- 改变研究方向或实验结论
- 修改训练数据、检查点或结果目录
- 外部发布、打包或提交敏感内容
- 处理 API key、数据隐私或其他敏感信息
- 将高级命令误解释为自动解析、自动总结或自动调度

`AGENTS.md` / `CLAUDE.md` 可以作为兼容入口，但不应成为新的状态源。最终状态应回写到 `AGENT.md` 和 `.workflow/`。

---

## Design Principles · 设计原则

1. **文件系统是真相源**：研究状态必须写回项目文件，而不是只留在聊天记录里。
2. **`AGENT.md` 是首读入口**：任何 AI 接手项目，先读 `AGENT.md`。
3. **最小协议优先**：先保证目标、计划、实验、事件和下一步清楚。
4. **非破坏性集成**：集成已有项目时默认 add-only，不静默覆盖重要文件。
5. **不制造自动化幻觉**：命令名和文档必须准确描述真实能力。
6. **AI 可接手性优先于目录完整性**：目录多不等于状态好，能快速接手才是成功。

---

## Skill Layout · Skill 目录

```text
dl-research-workflow/
├── SKILL.md
├── scripts/
│   ├── dl-workflow
│   └── init.sh
├── assets/
│   ├── templates/        # 核心模板与高级模板
│   └── prompts/          # 集成与整理提示
└── references/           # 详细参考文档
```

---

## References · 参考文档

- [AGENT.md 说明](references/agent-md.md)
- [研究结构说明](references/research-structure.md)
- [命令说明](references/cli-commands.md)
- [模板说明](references/templates.md)
- [最佳实践](references/best-practices.md)
