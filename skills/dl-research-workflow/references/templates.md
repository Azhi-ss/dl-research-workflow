# 模板系统

## 模板列表

当前模板覆盖常见研究记录场景，分为 P0（核心）、P1（重要）和辅助模板。

### P0 - 核心模板

| 模板 | 用途 | 关键字段 |
|------|------|----------|
| `AGENT.md.template` | 项目接手协议 | 当前焦点、优先级、下一步、读取顺序 |
| `plan.md.template` | 中期研究计划 | 核心问题、当前判断、阶段出口、决策原则 |
| `experiment.md.template` | 单实验决策单 | 实验问题、成功标准、复现配置、结果、结论 |
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
| `pdf-parser-config.json.template` | 外部 PDF 解析器配置占位；`dl-workflow parse-pdf` 当前不会自动解析 PDF 或调用 MinerU |
| `project-readme.md.template` | 项目 README |
| `AGENTS.md.template` | `AGENTS.md` 兼容入口 |
| `CLAUDE.md.template` | `CLAUDE.md` 兼容入口 |

## 推荐分工

建议把模板理解成三个层次：

1. **入口层**：`AGENT.md.template`
   - 负责让新的 AI 在最短时间内接手当前状态

2. **计划层**：`plan.md.template`、`research-question-tree.md.template`、`milestones.md.template`、`risk-register.md.template`
   - 负责表达研究主线、阶段判断和中期方向

3. **执行层**：`experiment.md.template`、`finding.md.template`、`decision-review.md.template`
   - 负责记录实验、发现和关键决策

## 使用方式

模板文件位于 `assets/templates/`，初始化时复制到项目 `.workflow/templates/`。

1. 初始化项目
2. 根据需要选择模板
3. 复制到目标位置
4. 填写内容
