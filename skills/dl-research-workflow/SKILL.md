---
name: dl-research-workflow
description: 深度学习研究 Agent Workflow Skill - 提供跨 IDE/AI 工具的记忆化研究环境。适用于：(1) 创建新的深度学习研究项目，(2) 将研究工作流集成到现有项目，(3) 管理实验、笔记、参考资料，(4) 跨工具切换时保持研究连续性。
---

# DL Research Workflow

深度学习研究工作流管理 skill，提供 AI 友好的项目结构和记忆化设计。

## 快速开始

```bash
# 初始化新项目
dl-workflow init

# 集成到现有项目（非破坏性）
dl-workflow init --integrate
```

## 核心概念

### 1. AGENT.md - AI 入口

任何 AI 打开项目**首先读这个文件**。包含：当前阶段、本周目标、阻塞点、下一步行动、快速链接。

详见 [references/agent-md.md](references/agent-md.md)

### 2. 事件溯源

所有决策和动作记录为不可变事件到 `.workflow/events/`：

```json
{
  "id": "evt_001",
  "timestamp": "2026-04-10T07:30:00Z",
  "agent": "research-planner",
  "action": "create-experiment",
  "input": { "hypothesis": "..." },
  "reasoning": "基于...",
  "tags": ["experiment"]
}
```

### 3. 研究追踪结构

```
.workflow/
├── events/              # 不可变事件流
├── research/            # 研究计划
│   ├── plan.md         # 整体计划
│   ├── experiments/    # 实验 (active/completed/backlog)
│   └── ablation/       # 消融矩阵
├── discussions/        # 讨论区
├── knowledge/          # 知识积累
├── references/        # 参考资料
│   └── papers/        # 论文笔记
└── presentations/     # 展示总结
```

详见 [references/research-structure.md](references/research-structure.md)

## 命令

| 命令 | 说明 |
|------|------|
| `dl-workflow init` | 初始化新项目 |
| `dl-workflow init --integrate` | 集成到现有项目 |
| `dl-workflow status` | 查看状态 |
| `dl-workflow event "描述"` | 记录事件 |
| `dl-workflow inspire "想法"` | 记录灵感 |
| `dl-workflow parse-pdf <file>` | 解析 PDF |
| `dl-workflow summarize weekly` | 生成总结 |

详见 [references/cli-commands.md](references/cli-commands.md)

## 对话式集成

可通过 Claude Code 对话完成所有操作，无需终端命令：

> "帮我把 dl-research-workflow 集成到这个项目"

AI 会引导完成：初始分析 → 文件分类 → 非破坏性合并 → 工作坊设置。

提示模板在 `assets/prompts/` 目录。

## 模板系统

24 个模板覆盖研究全流程：

| 优先级 | 模板 |
|--------|------|
| P0 | AGENT.md, plan.md, experiment.md, ablation-matrix.md, finding.md, event.json, gitignore |
| P1 | research-question-tree, risk-register, milestones, decision-review, paper-note, inspiration, weekly-summary, phase-summary, visualization-guide |

详见 [references/templates.md](references/templates.md)

## 最佳实践

1. **AGENT.md 保持最新** - 切换工具前必更新
2. **所有决策记事件** - 不只记在脑子里
3. **实验记录完整** - hypothesis, variables, seed, hardware, commit hash
4. **定期生成总结** - 强迫整理思路
5. **持续更新风险登记册**

详见 [references/best-practices.md](references/best-practices.md)

## 目录结构

```
dl-research-workflow/
├── SKILL.md              # 核心指导
├── scripts/
│   ├── dl-workflow       # CLI 入口
│   └── init.sh           # 初始化脚本
├── assets/
│   ├── templates/        # 24 个模板
│   └── prompts/          # 对话提示
└── references/           # 详细参考文档
```

## 依赖

- `jq` - JSON 处理（CLI 命令需要）
