# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [2.2.0] - 2026-04-10

### Added
- `parse-pdf` 命令 - PDF 论文解析功能
- `pdf-parser-config.json.template` - MinerU API 配置模板
- `.workflow/references/papers/pdf/` - 原始 PDF 存放目录
- `.workflow/references/papers/parsed/` - 解析结果存放目录
- `.workflow/references/papers/notes/` - 人工笔记目录
- `.workflow/config/` - 配置文件目录

### Improved
- `init.sh` - 创建新的目录结构（pdf/parsed/notes/config）
- `dl-workflow` CLI - 添加 `parse-pdf` 命令和 `--all` 选项
- `dl-workflow status` - 显示 PDF 和解析统计
- `gitignore.template` - 添加 PDF 文件忽略规则
- `skill.md` - 更新到 v2.2.0，添加 PDF 解析功能说明
- `USAGE.md` - 添加 PDF 解析工作流说明

---

## [2.1.0] - 2026-04-10

### Added
- `paper-note.md.template` - 添加 BibTeX 支持和阅读状态（to-read/reading/read/re-read）
- `visualization-guide.md.template` - 可视化指南（图表类型、代码模板、配色建议）
- `experiment.md.template` - 添加 tags 和 priority 字段，添加 GPU 小时追踪和早停原因
- `research-question-tree.md.template` - 添加优先级和开放性问题板块
- 完整的图表代码模板（训练曲线、消融柱状图、混淆矩阵、样本网格等）

### Improved
- `skill.md` - 更新到 v2.1.0，添加可视化指南和 BibTeX 支持说明
- `USAGE.md` - 添加可视化工作流说明

---

## [2.0.0] - 2026-04-10

### Added
- `experiment.md.template` - 完整的实验记录模板（P0）
- `ablation-matrix.md.template` - 消融实验矩阵模板（P0）
- `finding.md.template` - 发现记录模板（P0）
- `paper-note.md.template` - 论文笔记模板
- `inspiration.md.template` - 灵感记录模板
- `discussion-timeline.md.template` - 讨论时间线模板
- `references-readme.md.template` - 参考代码索引模板
- `inspirations-index.md.template` - 灵感索引模板
- `knowledge-readme.md.template` - 知识积累索引模板
- `milestones.md.template` - 里程碑模板
- `events-index.json.template` - 事件索引模板
- `project-readme.md.template` - 项目 README 模板
- `CHANGELOG.md` - 变更日志
- `json_escape` 函数 - JSON 特殊字符转义
- `check_dependencies` 函数 - 依赖检查
- `secrets/` 目录 - 敏感信息存储

### Fixed
- JSON 转义问题 - 三重 fallback 策略（Python → jq → sed）
- 依赖检查 - 检查 jq 是否安装
- init.sh - 提取硬编码模板到独立文件
- .gitignore - 完善 Python/DL 项目忽略项
- .gitignore - secrets/ 目录正确加入忽略

### Improved
- `dl-workflow` CLI - 模块化函数设计
- `inspire` 命令 - 使用完整的 inspiration.md.template
- `summarize` 命令 - 明确输出路径
- `USAGE.md` - 添加故障排除章节
- `skill.md` - 版本更新到 2.0.0

---

## [1.0.0] - 2026-04-10

### Added
- Initial release
- AGENT.md 作为 AI 入口
- 事件溯源设计
- 基础目录结构
- CLI 工具（init, status, event, inspire, summarize）
- 基础模板（AGENT.md.template, plan.md.template, event.json.template）
