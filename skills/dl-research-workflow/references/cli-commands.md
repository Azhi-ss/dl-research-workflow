# CLI 命令详解

`dl-workflow` 是 `dl-research-workflow` 的辅助 CLI。它的目标不是替代实验平台、任务调度系统或 PDF 解析器，而是帮助项目维护一套 **AI 可接手的研究上下文文件**。

核心使用场景是：

- 初始化或集成文件化研究状态协议
- 查看当前研究状态
- 记录关键事件、决策和灵感
- 为高级记录流程创建占位结构或提示

---

## Core Commands · 核心命令

核心命令支撑 MVP 主路径：初始化、接手、记录和日常维护。

### `dl-workflow init`

初始化一个新的研究项目。

```bash
dl-workflow init
```

**行为**：

- 创建 `.workflow/` 目录结构
- 生成初始文件，例如 `AGENT.md`、`AGENTS.md`、`CLAUDE.md`、`.workflow/research/plan.md` 等
- 标准初始化模式下，如果目标文件已存在，会逐个询问是否覆盖
- 初始化完成后，项目会具备 AI 接手所需的基础文件协议

**核心产物**：

- `AGENT.md`：AI 首读入口
- `.workflow/research/plan.md`：研究计划
- `.workflow/research/experiments/`：实验记录
- `.workflow/events/`：事件和决策日志

### `dl-workflow init --integrate`

把研究上下文协议非破坏性集成到已有项目。

```bash
dl-workflow init --integrate
```

**行为**：

- 只添加缺失文件和目录
- 不覆盖已有文件
- 适合已有代码仓库、论文复现项目或长期研究项目
- 让项目获得 `AGENT.md` 和 `.workflow/` 状态结构，而不要求重建原有项目布局

### `dl-workflow status`

查看当前研究状态。

```bash
dl-workflow status
```

**输出重点**：

- `AGENT.md` 和 `.workflow/` 是否存在
- 已记录事件数量
- PDF 文件数量和已解析占位数量
- 当前项目是否具备基本的 AI 接手结构

`status` 的目标是帮助人类或 AI 快速判断项目状态是否可接手，而不是替代实验追踪平台。

### `dl-workflow event`

记录关键事件、决策、实验结果或阻塞点。

```bash
dl-workflow event "决定用 Transformer 架构而不是 RNN"
```

**行为**：

- 在 `.workflow/events/` 创建 JSON 事件文件
- 更新事件索引
- 将关键研究历史从聊天记录沉淀到项目文件中

适合记录：

- 方向变化
- 重要实验结果
- baseline 变更
- bug 根因
- 数据问题
- 人类关键决策
- 当前阻塞点

不建议记录：

- 每一次普通文件修改
- 无意义的执行日志
- 可以直接从 git diff 恢复的信息

### `dl-workflow inspire`

记录研究灵感或后续可探索想法。

```bash
dl-workflow inspire "可以尝试用 layer-wise learning rate decay"
```

**行为**：

- 在 `.workflow/references/inspirations/` 创建结构化灵感文件
- 帮助把临时想法沉淀为之后可回顾、可筛选的研究线索

适合记录：

- 新实验想法
- 从论文或讨论中得到的启发
- 未来可能验证的假设
- 暂时不做但不想丢失的路线

### `dl-workflow help`

显示命令帮助。

```bash
dl-workflow help
```

**用途**：

- 查看当前可用命令
- 确认命令参数
- 快速区分初始化、状态查看、事件记录和高级辅助命令

---

## Advanced Commands · 高级命令

高级命令用于辅助论文整理和阶段回顾。它们不是核心协议的必要部分，也不承诺自动完成外部工具的工作。

### `dl-workflow parse-pdf`

为 PDF 论文创建解析工作目录与占位文件。

```bash
dl-workflow parse-pdf <pdf-file> [paper-id]
dl-workflow parse-pdf --all
```

**行为**：

- 若 `.workflow/config/pdf-parser.json` 不存在，会先创建配置占位文件
- 为单个 PDF 或 `papers/pdf/` 下的全部 PDF 创建解析结果目录
- 生成 `paper.md` 占位文件
- 供后续粘贴 MinerU 或其他 PDF 解析器输出

**重要边界**：

- 当前不会自动调用 MinerU API
- 当前不会真实解析 PDF 内容
- 当前不会自动生成论文总结
- 真实解析步骤需要你手动完成，或自行接入外部脚本

更准确地说，`parse-pdf` 是论文解析工作区脚手架，而不是 PDF parser 本身。

### `dl-workflow summarize`

输出总结提示与保存约定。

```bash
dl-workflow summarize <daily|weekly>
dl-workflow summarize weekly
```

**行为**：

- 提示 AI 查看 `.workflow/events/`
- 提示 AI 查看 `.workflow/discussions/timeline.md`
- 提示 AI 查看 `.workflow/research/experiments/`
- 给出推荐保存位置，例如 `.workflow/presentations/<date>-<type>-summary/`

**重要边界**：

- 当前不会自动生成总结文件
- 当前不会自动读取并压缩全部项目内容
- 当前只提供总结提示和保存约定
- 总结需要由你或 AI 根据现有状态文件完成

更准确地说，`summarize` 是 summary prompt helper，而不是自动 summarizer。

---

## 依赖要求

### CLI 必需依赖

| 依赖 | 说明 |
|------|------|
| `jq` | CLI 启动必需，用于 JSON 转义、状态统计和事件索引更新 |

安装：

```bash
brew install jq        # macOS
sudo apt install -y jq # Ubuntu/Debian
```

如果未安装 `jq`，`dl-workflow` 会在启动时提示缺少依赖。

### 可选外部能力

| 能力 | 说明 |
|------|------|
| MinerU 或其他 PDF 解析器 | 可选，仅在你要把 `parse-pdf` 生成的工作目录接入真实解析流程时需要 |

---

## 能力边界

`dl-workflow` 不负责：

- 多 agent 编排
- 自动任务调度
- 权限管理或审批流
- GPU / 训练任务管理
- 实验指标追踪和可视化
- 数据版本管理
- 模型 registry
- 真实 PDF 解析
- 自动生成完整周报或论文总结
- 替代 WandB、MLflow、TensorBoard、DVC、Notion、Jira 或 Linear

它只做一件事：

> 帮助项目维护 AI 可接手的研究上下文。
