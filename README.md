# DL Research Workflow

> A memory-enabled deep learning research environment for seamless continuity across IDEs and AI tools.
>
> 一个支持记忆的深度学习研究环境，让您在不同 IDE 和 AI 工具间切换时保持连续性。

---

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#documentation">Documentation</a> ·
  <a href="#command-reference">Command Reference</a>
</p>

---

## Features · 特性

### 🧠 **Memory-Enabled Design · 记忆化设计**

All state lives in the file system - no tool-lock. Switch between Claude Code, VS Code, Cursor, or any AI tool and pick up exactly where you left off.

所有状态都存储在文件系统中 - 无工具锁定。在 Claude Code、VS Code、Cursor 或任何 AI 工具之间切换，从断点处继续。

### 🤖 **AI-First Architecture · AI 优先架构**

`AGENT.md` serves as the single entry point. Any AI opening your project reads this first and immediately understands:
- Current research phase
- Weekly goals
- Blockers
- Next actions
- All key links

`AGENT.md` 作为唯一入口点。任何 AI 打开您的项目时首先读取此文件，并立即理解：
- 当前研究阶段
- 本周目标
- 阻塞点
- 下一步行动
- 所有关键链接

### 📜 **Event Sourcing · 事件溯源**

Every decision and action is recorded as an immutable event. Full audit trail, complete reproducibility.

每个决策和操作都记录为不可变事件。完整审计追踪，完全可复现。

### 🔬 **Complete Research Tracking · 完整研究追踪**

- **Research Planning** - Plan, RQ tree, risk register, milestones
- **Experiment Management** - Hypothesis, variables, metrics, full configuration tracking
- **Discussions** - Timeline view, topic threads, experiment-linked discussions
- **Knowledge Base** - Findings, patterns, decision reviews
- **References** - Paper notes (with BibTeX), inspirations, code repos
- **PDF Parsing** - MinerU API integration for paper parsing
- **Visualization Guide** - Chart templates and best practices

- **研究计划** - 计划、研究问题树、风险登记册、里程碑
- **实验管理** - 假设、变量、指标、完整配置追踪
- **讨论区** - 时间线视图、话题线程、实验关联讨论
- **知识库** - 发现、模式、决策回顾
- **参考资料** - 论文笔记（含 BibTeX）、灵感、代码仓库
- **PDF 解析** - MinerU API 集成用于论文解析
- **可视化指南** - 图表模板和最佳实践

---

## Quick Start · 快速开始

### One-Click Install · 一键安装

```bash
npx create-dl-research-workflow
```

That's it! The skill installs to `~/.claude/skills/dl-research-workflow/`.

就这样！Skill 会安装到 `~/.claude/skills/dl-research-workflow/`。

### Initialize Your First Project · 初始化第一个项目

```bash
mkdir my-awesome-research && cd my-awesome-research
dl-workflow init
```

Then open `AGENT.md` and start your research!

然后打开 `AGENT.md` 开始您的研究！

---

## Documentation · 文档

### Directory Structure · 目录结构

```
your-project/
├── AGENT.md                    # AI Entry Point · AI 入口（必读）
├── README.md                   # Human Entry Point · 人类入口
├── .workflow/                  # Agent Workflow Data
│   ├── events/                 # Immutable event stream · 不可变事件流
│   ├── research/               # Research planning & progress
│   │   ├── plan.md
│   │   ├── research-question-tree.md
│   │   ├── risk-register.md
│   │   ├── milestones.md
│   │   ├── experiments/
│   │   │   ├── active/
│   │   │   ├── completed/
│   │   │   └── backlog/
│   │   └── ablation/
│   ├── discussions/            # Discussion area · 讨论区
│   ├── knowledge/              # Accumulated knowledge · 积累的知识
│   ├── references/             # References & inspirations
│   │   ├── papers/
│   │   │   ├── pdf/            # Original PDFs (gitignored)
│   │   │   ├── parsed/         # MinerU-parsed Markdown
│   │   │   └── notes/          # Human-curated notes
│   │   ├── inspirations/
│   │   └── repos/
│   ├── presentations/          # Summaries & visuals
│   ├── config/                 # Configuration files
│   └── templates/              # Project-local templates
├── configs/
├── data/
├── notebooks/
├── scripts/
├── src/
│   ├── data/
│   ├── models/
│   ├── training/
│   ├── evaluation/
│   └── utils/
├── tests/
├── checkpoints/
├── logs/
└── outputs/
```

### Core Concepts · 核心概念

#### 1. AGENT.md - AI Entry Point · AI 入口

Any AI opening your project **reads this first**. It contains:

任何 AI 打开您的项目时**首先读取此文件**。它包含：

```markdown
# Project Status Overview · 项目状态概览

## Current Research Phase · 当前研究阶段
[ ] Exploration · 探索阶段 - Trying different ideas
[ ] Shaping · 定型阶段 - Main architecture solidified
[x] Optimization · 优化阶段 - Tuning performance
[ ] Wrap-up · 收尾阶段 - Paper/writing

## Weekly Goals · 本周目标
- [ ] Complete ablation study A
- [ ] Test learning rate scheduler

## Blockers · 阻塞点
- None

## Next Actions · 下一步
1. Read .workflow/research/plan.md for full plan
2. Check .workflow/research/risk-register.md for risks
3. Review .workflow/discussions/timeline.md for recent discussions
4. Examine .workflow/references/README.md for reference code

## Quick Links · 快速链接
- Research Plan: .workflow/research/plan.md
- Research Question Tree: .workflow/research/research-question-tree.md
- Risk Register: .workflow/research/risk-register.md
- Milestones: .workflow/research/milestones.md
- Experiments: .workflow/research/experiments/
- Ablation Matrix: .workflow/research/ablation/matrix.md
- Recent Discussions: .workflow/discussions/timeline.md
- Knowledge Base: .workflow/knowledge/
- Presentations: .workflow/presentations/
```

#### 2. Event Sourcing · 事件溯源

All agent decisions and actions are recorded as immutable events in `.workflow/events/`:

所有 agent 决策和操作都作为不可变事件记录在 `.workflow/events/` 中：

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
    "hypothesis": "Adding attention layer improves long-sequence modeling",
    "variables": {
      "num_heads": [4, 8, 16],
      "dropout": [0.1, 0.2]
    }
  },
  "output": {
    "experiment_id": "exp_001"
  },
  "reasoning": "Based on Paper X findings, we believe...",
  "alternatives_considered": ["RNN", "CNN"],
  "confidence": 0.8,
  "tags": ["experiment", "architecture"]
}
```

---

## Command Reference · 命令参考

```bash
dl-workflow init                   # Initialize new project · 初始化新项目
dl-workflow status                 # Show current status · 查看当前状态
dl-workflow event <description>    # Record event · 记录新事件
dl-workflow inspire <description>  # Record inspiration · 记录新灵感
dl-workflow parse-pdf <pdf-file>   # Parse PDF paper · 解析 PDF 论文
dl-workflow parse-pdf --all        # Parse all PDFs · 解析所有 PDF
dl-workflow summarize <type>       # Generate summary · 生成总结 (daily/weekly)
dl-workflow help                   # Show help · 显示帮助
```

### Examples · 示例

```bash
# Initialize · 初始化
dl-workflow init

# Record a decision · 记录决策
dl-workflow event "Decided to use Transformer over RNN"

# Record an inspiration · 记录灵感
dl-workflow inspire "Try layer-wise learning rate decay"

# Parse a PDF · 解析 PDF
dl-workflow parse-pdf .workflow/references/papers/pdf/attention.pdf

# Generate weekly summary · 生成周总结
dl-workflow summarize weekly
```

---

## Workflows · 工作流

### Daily Research · 日常研究

1. **Open project & read AGENT.md** · 打开项目并阅读 AGENT.md
2. **Record decisions as events** · 将决策记录为事件
3. **Capture inspirations immediately** · 立即记录灵感
4. **Update research progress** · 更新研究进展
5. **Generate summaries periodically** · 定期生成总结

### Switching IDEs/AI Tools · 切换 IDE/AI 工具

New AI just needs to:

新的 AI 只需要：

1. **Read AGENT.md** · 阅读 AGENT.md
2. **Follow links to details** · 根据链接跳转到详情
3. **Fully understand state** · 完全理解当前状态

No import/export needed - everything is in files.

无需导入/导出 - 一切都在文件中。

### PDF Parsing Workflow · PDF 解析工作流

1. **Place PDF in** `.workflow/references/papers/pdf/` · 将 PDF 放入该目录
2. **Run parser** · 运行解析器：
   ```bash
   dl-workflow parse-pdf .workflow/references/papers/pdf/2026-attention.pdf
   ```
3. **Configure MinerU API** (edit `.workflow/config/pdf-parser.json`) · 配置 MinerU API
4. **Parsed results in** `.workflow/references/papers/parsed/{id}/` · 解析结果在此目录
5. **AI reads parsed Markdown directly** · AI 直接读取解析后的 Markdown
6. **Create paper-note.md from parsed results** · 基于解析结果创建论文笔记

---

## Templates · 模板

Full template suite (24 templates):

完整模板套件（24 个模板）：

| Template | Purpose | Priority |
|----------|---------|----------|
| `AGENT.md.template` | AI Entry Document | P0 |
| `plan.md.template` | Research Plan | P0 |
| `research-question-tree.md.template` | Research Question Tree | P1 |
| `risk-register.md.template` | Risk Register | P1 |
| `experiment.md.template` | Experiment Log | **P0** |
| `ablation-matrix.md.template` | Ablation Matrix | **P0** |
| `finding.md.template` | Finding Record | **P0** |
| `decision-review.md.template` | Decision Review | P1 |
| `paper-note.md.template` | Paper Note (with BibTeX) | P1 |
| `inspiration.md.template` | Inspiration Record | P1 |
| `weekly-summary.md.template` | Weekly Summary | P1 |
| `phase-summary.md.template` | Phase Summary | P1 |
| `event.json.template` | Event Format | P0 |
| `milestones.md.template` | Milestones | P1 |
| `gitignore.template` | .gitignore | P0 |
| `pdf-parser-config.json.template` | PDF Parser Config | P1 |
| `visualization-guide.md.template` | Visualization Guide | P1 |

---

## Troubleshooting · 故障排除

### "command not found: jq"

Install jq:
```bash
brew install jq  # macOS
apt install jq   # Ubuntu/Debian
```

### JSON Parsing Errors

Ensure special characters in event descriptions are properly escaped. Use `dl-workflow event` command which handles this automatically.

确保事件描述中的特殊字符被正确转义。使用 `dl-workflow event` 命令会自动处理。

### "command not found: dl-workflow"

Ensure the skill is installed correctly:
```bash
ls ~/.claude/skills/dl-research-workflow/
```

If not installed, run:
```bash
npx create-dl-research-workflow
```

---

## Best Practices · 最佳实践

1. **Keep AGENT.md updated** - Before switching tools
2. **Record ALL decisions as events** - Don't just keep them in your head
3. **Complete experiment records** - Hypothesis, variables, seed, hardware, commit hash
4. **Summarize reference code** - Don't just clone without digesting
5. **Generate presentations periodically** - Force yourself to organize thoughts
6. **Use the templates** - Don't start from scratch
7. **Review decisions regularly** - Learn from mistakes
8. **Manage risks** - Continuously update risk register

1. **保持 AGENT.md 最新** - 切换工具前
2. **记录所有决策为事件** - 不要只记在脑子里
3. **完整的实验记录** - 假设、变量、seed、硬件、commit hash
4. **总结参考代码** - 不要只 clone 不消化
5. **定期生成展示** - 强迫自己整理思路
6. **使用模板** - 不要从零开始
7. **定期回顾决策** - 从错误中学习
8. **管理风险** - 持续更新风险登记册

---

## Detailed Documentation · 详细文档

- [Skill Definition · Skill 定义](skills/dl-research-workflow/skill.md)
- [Usage Guide · 使用指南](skills/dl-research-workflow/USAGE.md)
- [Changelog · 变更日志](skills/dl-research-workflow/CHANGELOG.md)

---

## License · 许可证

MIT

---

## Contributing · 贡献

Contributions welcome! Feel free to open issues or PRs.

欢迎贡献！欢迎提交 issue 或 PR。

---

<p align="center">
  <strong>Happy researching! · 研究愉快！</strong>
</p>
