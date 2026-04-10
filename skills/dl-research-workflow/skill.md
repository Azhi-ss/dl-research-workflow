---
name: dl-research-workflow
description: 深度学习研究 Agent Workflow - 跨 IDE/AI 工具的记忆化研究环境
version: 2.2.0
---

# 深度学习研究 Agent Workflow

这个 skill 帮助你建立和管理一个 AI 友好的深度学习研究环境。无论你切换到什么 IDE 或 AI 工具，都能快速理解项目状态，就像有记忆一样。

## 快速开始

```bash
# 初始化新项目
dl-workflow init

# 或者手动创建 AGENT.md
```

## 目录结构

```
your-project/
├── AGENT.md                    # AI 入口（必读）
├── README.md                   # 人类入口
├── .workflow/                  # Agent Workflow 数据
│   ├── events/                 # 不可变事件流
│   ├── snapshots/              # 状态快照
│   ├── discussions/            # 讨论区
│   ├── knowledge/              # 积累的知识
│   ├── presentations/          # 展示区
│   ├── research/               # 研究计划与进展
│   ├── references/             # 参考代码与灵感
│   │   └── papers/
│   │       ├── pdf/            # 原始 PDF（.gitignore）
│   │       ├── parsed/         # 解析后的 Markdown 和图片
│   │       └── notes/          # 人工整理的论文笔记
│   ├── artifacts/              # 产出物索引
│   ├── secrets/                # 敏感信息（.gitignore）
│   ├── config/                 # 配置文件
│   └── templates/              # 项目内使用的模板
├── configs/                    # 配置文件
├── data/                       # 数据
├── notebooks/                  # Jupyter notebooks
├── scripts/                    # 脚本
├── src/                        # 源代码
│   ├── data/
│   ├── models/
│   ├── training/
│   ├── evaluation/
│   └── utils/
├── tests/                      # 测试
├── checkpoints/                # 模型 checkpoint
├── logs/                       # 训练日志
└── outputs/                    # 输出
```

## 核心概念

### 1. AGENT.md - AI 入口文档

任何 AI 打开项目，**首先读这个文件**。它包含：

```markdown
# 项目状态概览

## 当前研究阶段
[ ] 探索阶段 - 尝试不同想法
[ ] 定型阶段 - 确定主架构
[x] 优化阶段 - 调优性能
[ ] 收尾阶段 - 写论文/报告

## 本周目标
- [ ] 完成消融实验 A
- [ ] 测试学习率调度器

## 阻塞点
- 暂无

## 下一步行动
1. 先看 .workflow/research/plan.md 了解完整计划
2. 再看 .workflow/research/risk-register.md 了解风险
3. 再看 .workflow/discussions/timeline.md 了解最近讨论
4. 检查 .workflow/references/README.md 有哪些参考代码

## 快速链接
- 研究计划: .workflow/research/plan.md
- 研究问题树: .workflow/research/research-question-tree.md
- 风险登记册: .workflow/research/risk-register.md
- 里程碑: .workflow/research/milestones.md
- 实验设计: .workflow/research/experiments/
- 消融矩阵: .workflow/research/ablation/matrix.md
- 最近讨论: .workflow/discussions/timeline.md
- 知识积累: .workflow/knowledge/
- 展示总结: .workflow/presentations/
```

### 2. 事件溯源

所有 agent 的决策和动作都作为不可变事件记录在 `.workflow/events/`：

```json
{
  "id": "evt_001",
  "timestamp": "2026-04-10T07:30:00Z",
  "agent": "research-planner",
  "action": "create-experiment",
  "context": {
    "experiment_id": "exp_001",
    "phase": "exploration"
  },
  "input": {
    "hypothesis": "增加注意力层可以提升长序列建模能力",
    "variables": {
      "num_heads": [4, 8, 16],
      "dropout": [0.1, 0.2]
    }
  },
  "output": {
    "experiment_id": "exp_001"
  },
  "reasoning": "基于论文 X 的发现，我们认为...",
  "alternatives_considered": ["RNN", "CNN"],
  "confidence": 0.8,
  "tags": ["experiment", "architecture"]
}
```

### 3. 研究计划与进展

`.workflow/research/` 追踪研究的全貌：

- `plan.md` - 整体研究计划
- `research-question-tree.md` - 研究问题树（RQ → sub-RQs）
- `risk-register.md` - 风险登记册
- `milestones.md` - 里程碑
- `experiments/` - 实验设计空间（active/completed/backlog）
- `ablation/matrix.md` - 消融实验矩阵

**实验模板** (`experiment.md.template`)：
- Hypothesis（假设）
- Related Work（相关工作）
- Variables（变量）
- Baseline（基线）
- Metrics（指标）
- Configuration（配置：seed, hardware, dependencies, commit hash）
- Execution Log（执行日志）
- Results（结果）
- Analysis（分析：Key Observations, Statistical Significance, Unexpected Findings）
- Conclusions（结论）
- Next Actions（下一步）

### 4. 讨论区

`.workflow/discussions/` 支持多种视图：

- `timeline.md` - 时序消息流
- `topics/` - 话题线程
- `by-experiment/` - 按实验关联

### 5. 参考代码与灵感

`.workflow/references/`：

- `repos/README.md` - 外部 repo 索引和关键发现
- `papers/` - 论文笔记（用 `paper-note.md.template`，含可复现性追踪）
- `inspirations/` - 灵感记录（用 `inspiration.md.template`）
- `snippets/` - 有用的代码片段

### 6. 知识积累

`.workflow/knowledge/`：

- `findings/` - 实验发现（用 `finding.md.template`：Observation → Hypothesis → Validation → Conclusion → Impact）
- `patterns/` - 总结出的模式
- `decisions/` - 重要决策记录（含决策回顾 `decision-review.md.template`）

### 7. 展示区

`.workflow/presentations/`：

- 周总结（用 `weekly-summary.md.template`）
- 阶段总结（用 `phase-summary.md.template`）
- 数据图表
- 用于生成 PPTX 的源文件

## 使用流程

### 初始化新项目

1. 运行 `dl-workflow init`
2. 编辑 `AGENT.md` 设置当前状态
3. 编辑 `.workflow/research/plan.md` 填写研究计划
4. 编辑 `.workflow/research/research-question-tree.md` 分解研究问题
5. 编辑 `.workflow/research/risk-register.md` 识别风险

### 日常研究

1. 打开项目先读 `AGENT.md`
2. 记录所有决策为事件：`dl-workflow event "描述"`
3. 有灵感随时记：`dl-workflow inspire "想法"`
4. 更新研究进展
5. 定期让 agent 生成展示总结

### 记录实验

1. 在 `.workflow/research/experiments/active/` 创建实验文件
2. 使用 `experiment.md.template` 模板
3. 完整记录 hypothesis、variables、metrics、configuration（seed, hardware, commit hash）
4. 完成后移到 `completed/`

### 记录发现

1. 从实验中有重要发现时
2. 在 `.workflow/knowledge/findings/` 创建发现记录
3. 使用 `finding.md.template` 模板
4. 记录观察、假设、验证、结论、影响

### 决策回顾

定期回顾重要决策：
1. 使用 `decision-review.md.template`
2. 评估决策是否正确
3. 记录学到的经验
4. 更新未来的假设

### 生成总结

- 周总结：用 `weekly-summary.md.template`
- 阶段总结：用 `phase-summary.md.template`
- 保存到 `.workflow/presentations/YYYY-MM-DD-{type}-summary/`

### 切换 IDE/AI 工具

新的 AI 只需要：
1. 读 `AGENT.md`
2. 根据链接跳转到相关详情
3. 完全理解当前状态

## Skill 命令

```bash
# 初始化
dl-workflow init

# 记录事件
dl-workflow event "描述"

# 记录灵感
dl-workflow inspire "想法"

# 解析 PDF 论文
dl-workflow parse-pdf <pdf-file> [paper-id]
dl-workflow parse-pdf --all

# 生成总结
dl-workflow summarize weekly

# 查看当前状态
dl-workflow status

# 帮助
dl-workflow help
```

**依赖要求**：
- `jq` - JSON 处理工具

**PDF 解析工作流**：
1. 将 PDF 放入 `.workflow/references/papers/pdf/
2. 运行 `dl-workflow parse-pdf <file>`
3. 配置 MinerU API（编辑 `.workflow/config/pdf-parser.json`）
4. 解析结果存入 `.workflow/references/papers/parsed/{id}/`
5. AI 可直接读取解析后的 Markdown
6. 基于解析结果创建 `paper-note.md`

## 模板文件

完整模板列表（`templates/` 目录）：

| 模板 | 用途 | 优先级 |
|------|------|--------|
| `AGENT.md.template` | AI 入口文档 | P0 |
| `plan.md.template` | 研究计划 | P0 |
| `research-question-tree.md.template` | 研究问题树 | P1 |
| `risk-register.md.template` | 风险登记册 | P1 |
| `experiment.md.template` | 实验记录 | **P0** |
| `ablation-matrix.md.template` | 消融矩阵 | **P0** |
| `finding.md.template` | 发现记录 | **P0** |
| `decision-review.md.template` | 决策回顾 | P1 |
| `paper-note.md.template` | 论文笔记 | P1 |
| `inspiration.md.template` | 灵感记录 | P1 |
| `weekly-summary.md.template` | 周总结 | P1 |
| `phase-summary.md.template` | 阶段总结 | P1 |
| `event.json.template` | 事件格式 | P0 |
| `milestones.md.template` | 里程碑 | P1 |
| `gitignore.template` | .gitignore | P0 |
| `pdf-parser-config.json.template` | PDF 解析配置 | P1 |
| `visualization-guide.md.template` | 可视化指南 | P1 |

## 最佳实践

1. **AGENT.md 保持最新** - 每次切换工具前更新
2. **所有决策都记事件** - 不要只在脑子里
3. **实验记录要完整** - hypothesis, variables, seed, hardware, commit hash
4. **参考代码要写总结** - 不要只 clone 不消化
5. **定期生成展示** - 强迫自己整理思路
6. **用模板** - 不要自己从零开始写
7. **定期回顾决策** - 从错误中学习
8. **管理风险** - 持续更新风险登记册

## 版本历史

见 [CHANGELOG.md](./CHANGELOG.md)
