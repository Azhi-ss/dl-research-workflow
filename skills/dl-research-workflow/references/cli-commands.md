# CLI 命令详解

## 命令列表

### dl-workflow init

初始化新项目或集成到现有项目。

```bash
dl-workflow init                   # 初始化新项目
dl-workflow init --integrate       # 集成到现有项目（非破坏性）
```

**行为**：
- 创建 `.workflow/` 目录结构
- 生成初始文件（AGENT.md, plan.md, 等）
- 集成模式只添加缺失文件，不覆盖现有文件

### dl-workflow status

查看当前项目状态。

```bash
dl-workflow status
```

**输出**：
- AGENT.md 和 .workflow/ 是否存在
- 已记录事件数量
- PDF 文件数量和已解析数量

### dl-workflow event

记录决策或动作为不可变事件。

```bash
dl-workflow event "决定用 Transformer 架构而不是 RNN"
```

**行为**：
- 在 `.workflow/events/` 创建 JSON 事件文件
- 更新事件索引

### dl-workflow inspire

记录灵感想法。

```bash
dl-workflow inspire "可以尝试用 layer-wise learning rate decay"
```

**行为**：
- 在 `.workflow/references/inspirations/` 创建结构化灵感文件

### dl-workflow parse-pdf

解析 PDF 论文（需要 MinerU API）。

```bash
dl-workflow parse-pdf <pdf-file> [paper-id]
dl-workflow parse-pdf --all
```

**行为**：
- 创建解析结果目录
- 生成占位文件供手动填充

### dl-workflow summarize

提示 AI 生成总结。

```bash
dl-workflow summarize weekly
```

**提示**：
- AI 查看 events/、discussions/、experiments/
- 生成总结保存到 presentations/

## 依赖要求

| 依赖 | 说明 |
|------|------|
| `jq` | JSON 处理 |

安装：
```bash
brew install jq   # macOS
apt install jq     # Ubuntu/Debian
```
