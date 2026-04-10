# 研究追踪结构详解

## 整体结构

```
.workflow/
├── events/                    # 不可变事件流
├── snapshots/                 # 状态快照
├── research/                 # 研究计划与进展
├── discussions/              # 讨论区
├── knowledge/                # 知识积累
├── presentations/           # 展示区
├── references/               # 参考资料
├── artifacts/                # 产出物索引
├── secrets/                  # 敏感信息
├── config/                   # 配置文件
└── templates/                # 项目内模板
```

## 核心目录

### events/ - 事件溯源

所有决策和动作的不可变记录。

**格式**：按日期命名 `YYYY-MM-DD-NNN.json`

**事件结构**：
```json
{
  "id": "evt_001",
  "timestamp": "2026-04-10T07:30:00Z",
  "agent": "research-planner",
  "action": "create-experiment",
  "context": { "experiment_id": "exp_001", "phase": "exploration" },
  "input": { "hypothesis": "...", "variables": {...} },
  "output": { "experiment_id": "exp_001" },
  "reasoning": "基于论文 X 的发现...",
  "alternatives_considered": ["RNN", "CNN"],
  "confidence": 0.8,
  "tags": ["experiment", "architecture"]
}
```

### research/ - 研究计划

| 文件 | 用途 |
|------|------|
| `plan.md` | 整体研究计划 |
| `research-question-tree.md` | 研究问题树（RQ → sub-RQs） |
| `risk-register.md` | 风险登记册 |
| `milestones.md` | 里程碑 |
| `experiments/active/` | 进行中实验 |
| `experiments/completed/` | 已完成实验 |
| `experiments/backlog/` | 想法池 |
| `ablation/matrix.md` | 消融矩阵 |

### experiments/ - 实验管理

**实验模板核心字段**：
- Hypothesis（假设）
- Variables（变量）
- Baseline（基线）
- Metrics（指标）
- Configuration（seed, hardware, dependencies, commit hash）
- Execution Log（执行日志）
- Results（结果）
- Analysis（观察、统计显著性、意外发现）
- Conclusions（结论）

### discussions/ - 讨论区

多种视图：
- `timeline.md` - 时序消息流
- `topics/` - 话题线程
- `by-experiment/` - 按实验关联

### knowledge/ - 知识积累

| 目录 | 用途 |
|------|------|
| `findings/` | 实验发现（Observation → Hypothesis → Validation → Conclusion → Impact） |
| `patterns/` | 总结出的模式 |
| `decisions/` | 重要决策记录和回顾 |

### references/ - 参考资料

| 目录 | 用途 |
|------|------|
| `repos/` | 外部 repo 索引和关键发现 |
| `papers/pdf/` | 原始 PDF（.gitignore） |
| `papers/parsed/` | MinerU 解析后的 Markdown |
| `papers/notes/` | 人工整理的论文笔记 |
| `inspirations/` | 灵感记录 |
| `snippets/` | 代码片段 |

### presentations/ - 展示区

- 周总结
- 阶段总结
- 数据图表
- PPTX 源文件
