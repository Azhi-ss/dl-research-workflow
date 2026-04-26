# 研究追踪结构详解

## 整体结构

```text
.workflow/
├── events/                    # 事件与决策记录
├── snapshots/                 # 状态快照
├── research/                  # 研究计划与进展
├── discussions/               # 讨论区
├── knowledge/                 # 知识积累
├── presentations/             # 展示区
├── references/                # 参考资料
├── artifacts/                 # 产出物索引
├── secrets/                   # 敏感信息
├── config/                    # 配置文件
└── templates/                 # 项目内模板
```

## 核心目录

### `events/` - 事件记录

记录关键决策、动作、失败、阻塞和方向变化，方便后续回顾与交接。

**格式**：按日期命名 `YYYY-MM-DD-NNN.json`

**事件结构**：

```json
{
  "id": "evt_001",
  "timestamp": "2026-04-10T07:30:00Z",
  "agent": "human",
  "action": "manual-log",
  "context": { "experiment_id": "exp_001", "phase": "exploration" },
  "input": { "hypothesis": "...", "variables": {} },
  "output": { "experiment_id": "exp_001" },
  "reasoning": "基于论文 X 的发现...",
  "alternatives_considered": ["RNN", "CNN"],
  "confidence": 0.8,
  "tags": ["experiment", "architecture"]
}
```

### `research/` - 研究计划

| 文件 | 用途 |
|------|------|
| `plan.md` | 中期研究计划：研究问题、当前判断、阶段出口、决策原则 |
| `research-question-tree.md` | 研究问题树（RQ → sub-RQs） |
| `risk-register.md` | 风险登记册 |
| `milestones.md` | 里程碑 |
| `experiments/active/` | 进行中实验 |
| `experiments/completed/` | 已完成实验 |
| `experiments/backlog/` | 想法池 |
| `ablation/matrix.md` | 消融矩阵 |

### `experiments/` - 实验管理

建议把单个实验当作一个**可复现的问题单**，而不是松散笔记。

**实验模板核心字段**：
- 实验问题（这个实验回答什么）
- Success / Failure Criteria（成功与失败判定）
- Baseline（基线）
- Variables（变量）
- Metrics（指标）
- Reproduction Config（seed、hardware、dependencies、commit hash）
- Output Paths（日志、checkpoint、结果、可视化）
- Results Snapshot（结果快照）
- Analysis（观察、可信度、混淆因素、意外发现）
- Conclusion（是否继续、对主计划的影响）

### `discussions/` - 讨论区

多种视图：
- `timeline.md` - 时序消息流
- `topics/` - 话题线程
- `by-experiment/` - 按实验关联

### `knowledge/` - 知识积累

| 目录 | 用途 |
|------|------|
| `findings/` | 实验发现（Observation → Hypothesis → Validation → Conclusion → Impact） |
| `patterns/` | 总结出的模式 |
| `decisions/` | 重要决策记录和回顾 |

### `references/` - 参考资料

| 目录 | 用途 |
|------|------|
| `repos/` | 外部 repo 索引和关键发现 |
| `papers/pdf/` | 原始 PDF（.gitignore） |
| `papers/parsed/` | 解析后的 Markdown |
| `papers/notes/` | 人工整理的论文笔记 |
| `inspirations/` | 灵感记录 |
| `snippets/` | 代码片段 |

### `presentations/` - 展示区

- 周总结
- 阶段总结
- 数据图表
- PPTX 源文件

## 三层理解方式

建议把整个结构理解成三层：

1. **入口层**：`AGENT.md`
   - 当前状态、优先级、下一步、建议读取顺序

2. **计划层**：`.workflow/research/`
   - 中期方向、阶段判断、风险、里程碑

3. **执行与历史层**：`experiments/`、`events/`、`discussions/`
   - 单次实验、关键动作、讨论轨迹
