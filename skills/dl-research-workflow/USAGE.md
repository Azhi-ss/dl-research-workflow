# 使用指南

## 安装

将 `dl-research-workflow` 目录复制到你的 Claude Code skills 目录：

```bash
cp -r dl-research-workflow ~/.claude/skills/
```

或者直接在项目中使用。

---

## 快速开始

### 0. 安装依赖

`dl-workflow` 需要 `jq` 来处理 JSON：

```bash
# macOS
brew install jq

# Ubuntu/Debian
apt install jq

# 其他
# 用你的包管理器安装 jq
```

### 1. 初始化新项目

```bash
cd your-research-project/
bash /path/to/dl-research-workflow/init.sh
```

或者使用 CLI：

```bash
dl-workflow init
```

### 2. 填写初始状态

编辑 `AGENT.md`，设置：
- 当前研究阶段
- 本周目标
- 阻塞点

编辑 `.workflow/research/plan.md`，填写：
- 研究问题
- 研究目标
- 研究路线图

编辑 `.workflow/research/research-question-tree.md`，分解研究问题：
- 顶层 RQ → 子 RQ
- 假设
- 依赖关系

编辑 `.workflow/research/risk-register.md`，识别风险：
- 风险清单
- 可能性/影响评估
- 应对措施

### 3. 开始研究

---

## 日常工作流

### 记录事件

每次做了重要决策或行动，记录下来：

```bash
dl-workflow event "决定用 Transformer 架构而不是 RNN"
```

或者手动创建事件文件：

```json
{
  "id": "evt_001",
  "timestamp": "2026-04-10T07:30:00Z",
  "agent": "human",
  "action": "decision",
  "context": {
    "experiment_id": "exp_001",
    "phase": "exploration"
  },
  "input": {
    "options": ["Transformer", "RNN", "CNN"]
  },
  "output": {
    "choice": "Transformer"
  },
  "reasoning": "Transformer 对长序列建模更好，参考论文 X",
  "alternatives_considered": ["RNN", "CNN"],
  "confidence": 0.8,
  "tags": ["architecture", "decision"]
}
```

### 记录灵感

有想法随时记下来：

```bash
dl-workflow inspire "可以尝试用 layer-wise learning rate decay"
```

这会在 `.workflow/references/inspirations/` 创建一个结构化的灵感记录文件（使用 `inspiration.md.template`）。

### 查看状态

```bash
dl-workflow status
```

### 生成总结

让 AI 助手帮你生成总结：

```bash
dl-workflow summarize weekly
```

然后 AI 会：
1. 查看 `.workflow/events/` 中的事件
2. 查看讨论记录
3. 查看实验进展
4. 使用 `weekly-summary.md.template` 生成总结
5. 保存到 `.workflow/presentations/YYYY-MM-DD-weekly-summary/`

阶段总结用 `phase-summary.md.template`。

### 可视化工作流

生成图表时参考 `visualization-guide.md.template`：

1. **训练曲线** - 折线图，展示 loss/accuracy 随 epoch 变化
2. **消融实验对比** - 柱状图，带误差棒
3. **变量影响分析** - 主效应图/交互效应图
4. **混淆矩阵** - 热力图
5. **样本输出** - 网格图

可视化指南包含：
- 推荐图表类型
- Python/Matplotlib/Seaborn 代码模板
- 配色建议
- 保存规范（PNG 150-300 DPI）

---

## 实验工作流

### 创建新实验

1. 在 `.workflow/research/experiments/active/` 创建实验文件
2. 复制 `.workflow/templates/experiment.md.template` 作为模板
3. 填写：
   - **Hypothesis** - 我们要验证什么假设
   - **Related Work** - 相关论文/实验
   - **Variables** - 自变量列表
   - **Baseline** - 基线
   - **Metrics** - 评估指标
   - **Configuration** - 完整配置（seed, hardware, dependencies, commit hash）
   - **Execution Log** - 执行日志
   - **Results** - 结果
   - **Analysis** - 分析（Key Observations, Statistical Significance, Unexpected Findings）
   - **Conclusions** - 结论
   - **Next Actions** - 下一步

### 消融实验

1. 使用 `.workflow/templates/ablation-matrix.md.template`
2. 设计自变量列表
3. 记录所有变量组合
4. 分析变量影响和交互效应
5. 找出最佳配置

---

## 知识积累工作流

### 记录发现

从实验中有重要发现时：

1. 在 `.workflow/knowledge/findings/` 创建发现记录
2. 使用 `finding.md.template` 模板
3. 记录：
   - **Observation** - 原始观察
   - **Hypothesis** - 我们的解释
   - **Validation** - 验证实验
   - **Conclusion** - 最终结论
   - **Impact** - 对当前/未来研究的影响

### 解析 PDF 论文

1. 将 PDF 放入 `.workflow/references/papers/pdf/`
2. 运行解析命令：
   ```bash
   # 解析单个 PDF
   dl-workflow parse-pdf .workflow/references/papers/pdf/2026-attention.pdf

   # 指定 paper-id
   dl-workflow parse-pdf .workflow/references/papers/pdf/2026-attention.pdf attention-is-all-you-need

   # 解析所有 PDF
   dl-workflow parse-pdf --all
   ```
3. 首次运行会创建配置文件，编辑 `.workflow/config/pdf-parser.json` 配置 MinerU API
4. 解析结果存入 `.workflow/references/papers/parsed/{id}/`：
   - `paper.md` - 解析后的 Markdown
   - `images/` - 提取的图片
5. AI 可直接读取解析后的 Markdown
6. 基于解析结果创建 `paper-note.md`

### 记录论文笔记

读论文时：

1. 在 `.workflow/references/papers/notes/` 创建笔记
2. 使用 `paper-note.md.template` 模板
3. 填写 BibTeX 条目（支持引用管理）
4. 设置阅读状态（to-read/reading/read/re-read）
5. 记录：
   - 核心贡献
   - 方法细节
   - 实验结果
   - 可复现性笔记（代码、复现结果、坑）
   - 与我们工作的关系
   - 启发的实验

### 决策回顾

定期回顾重要决策：

1. 使用 `decision-review.md.template`
2. 评估：决策正确吗？
3. 记录学到的经验
4. 更新未来的假设

---

## 研究计划工作流

### 研究问题树

1. 使用 `research-question-tree.md.template`
2. 顶层 RQ → 子 RQ
3. 每个 RQ 对应假设和实验
4. 追踪依赖关系

### 风险管理

1. 使用 `risk-register.md.template`
2. 持续更新风险清单
3. 评估可能性和影响
4. 制定应对措施

---

## 切换 IDE/AI 工具

当你换了一个 IDE 或用另一个 AI 工具时：

1. 新的 AI **首先读 `AGENT.md`**
2. 根据 `AGENT.md` 中的链接跳转到相关详情
3. 完全理解当前状态

不需要任何导入/导出，所有信息都在文件里。

---

## 研究阶段推进

### 探索阶段 → 定型阶段

1. 更新 `AGENT.md` 中的阶段标记
2. 在 `.workflow/research/milestones.md` 记录里程碑完成
3. 让 AI 生成此阶段的总结（用 `phase-summary.md.template`）

### 定型阶段 → 优化阶段

1. 开始设计消融实验矩阵 `.workflow/research/ablation/matrix.md`
2. 用 `ablation-matrix.md.template` 模板
3. 记录每个变量组合的结果

### 优化阶段 → 收尾阶段

1. 让 AI 生成最终总结
2. 生成 PPTX（用你的 PPT agent）
3. 整理知识到 `.workflow/knowledge/`

---

## 参考代码工作流

### 添加外部 repo

1. Clone 到 `.workflow/references/repos/`
2. 编辑 `.workflow/references/README.md`，添加：
   - Repo 地址
   - 为什么参考它
   - 关键发现
   - 关联到我们的哪个实验

---

## 多 AI 协作

多个 AI 可以同时工作：

- 所有共享状态都在文件里
- 用 git 来同步和解决冲突
- 每个 AI 更新 `AGENT.md` 时注明更新者

---

## 目录详解

### `.workflow/events/`

所有不可变事件，按日期命名。不要修改已存在的事件。

### `.workflow/research/`

- `plan.md` - 整体计划
- `research-question-tree.md` - 研究问题树
- `risk-register.md` - 风险登记册
- `milestones.md` - 里程碑追踪
- `experiments/active/` - 进行中的实验
- `experiments/completed/` - 已完成的实验
- `experiments/backlog/` - 想法池
- `ablation/matrix.md` - 消融矩阵

### `.workflow/discussions/`

- `timeline.md` - 时序消息流
- `topics/` - 话题线程
- `by-experiment/` - 按实验关联的讨论

### `.workflow/knowledge/`

- `findings/` - 实验发现
- `patterns/` - 总结出的模式
- `decisions/` - 重要决策记录和回顾

### `.workflow/references/`

- `repos/README.md` - 外部 repo 索引
- `papers/` - 论文相关
  - `pdf/` - 原始 PDF 文件（.gitignore）
  - `parsed/` - 解析后的 Markdown 和图片
  - `notes/` - 人工整理的论文笔记
- `inspirations/` - 灵感记录
- `snippets/` - 代码片段

### `.workflow/config/`

- `pdf-parser.json` - MinerU API 配置

### `.workflow/presentations/`

Agent 生成的总结和图表，用于生成 PPTX。

### `.workflow/templates/`

项目内使用的模板副本。

### `.workflow/secrets/`

敏感信息（在 .gitignore 中）。

---

## 故障排除

### "command not found: jq"

安装 jq：
```bash
brew install jq  # macOS
apt install jq   # Ubuntu/Debian
```

### JSON 解析错误

确保事件描述中的特殊字符被正确转义。使用 `dl-workflow event` 命令会自动处理。

### 初始化时模板缺失

确保 `templates/` 目录与 `init.sh` 在同一位置。
