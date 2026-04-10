# 模板系统

## 模板列表

共 24 个模板，分为 P0（核心）和 P1（重要）。

### P0 - 核心模板

| 模板 | 用途 | 关键字段 |
|------|------|----------|
| `AGENT.md.template` | AI 入口文档 | 阶段、目标、阻塞点、下一步 |
| `plan.md.template` | 研究计划 | RQ、目标、路线图 |
| `experiment.md.template` | 实验记录 | Hypothesis、Variables、Metrics、Configuration |
| `ablation-matrix.md.template` | 消融矩阵 | 变量组合、结果对比 |
| `finding.md.template` | 发现记录 | Observation → Hypothesis → Validation → Conclusion |
| `event.json.template` | 事件格式 | timestamp、action、input、output、reasoning |
| `gitignore.template` | .gitignore | Python/深度学习项目标准忽略项 |

### P1 - 重要模板

| 模板 | 用途 |
|------|------|
| `research-question-tree.md.template` | 研究问题树 |
| `risk-register.md.template` | 风险登记册 |
| `milestones.md.template` | 里程碑 |
| `decision-review.md.template` | 决策回顾 |
| `paper-note.md.template` | 论文笔记（含 BibTeX） |
| `inspiration.md.template` | 灵感记录 |
| `weekly-summary.md.template` | 周总结 |
| `phase-summary.md.template` | 阶段总结 |
| `visualization-guide.md.template` | 可视化指南 |

### 辅助模板

| 模板 | 用途 |
|------|------|
| `discussion-timeline.md.template` | 讨论时间线 |
| `references-readme.md.template` | 参考资料索引 |
| `inspirations-index.md.template` | 灵感索引 |
| `knowledge-readme.md.template` | 知识库索引 |
| `events-index.json.template` | 事件索引 |
| `pdf-parser-config.json.template` | PDF 解析配置 |
| `project-readme.md.template` | 项目 README |

## 使用方式

模板文件位于 `assets/templates/`，初始化时复制到项目 `.workflow/templates/`。

1. 初始化项目
2. 根据需要选择模板
3. 复制到目标位置
4. 填写内容
