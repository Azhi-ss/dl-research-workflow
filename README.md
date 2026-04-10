# DL Research Agent Workflow

> 一个 AI 友好的深度学习研究环境，让你在不同 IDE/AI 工具间切换时，就像有记忆一样。

---

## 这是什么？

这是一个 Claude Code skill，帮助你建立标准化的深度学习研究项目结构。核心特点：

- **AI 优先设计** - `AGENT.md` 作为入口，任何 AI 读了都能理解
- **文件系统即记忆** - 所有状态都在文件里，不依赖特定工具
- **事件溯源** - 所有决策都记录为不可变事件
- **完整研究追踪** - 计划、实验、讨论、灵感、参考...

---

## 快速开始

```bash
# 复制 skill 到你的 Claude Code skills 目录
cp -r skills/dl-research-workflow ~/.claude/skills/

# 在你的研究项目中初始化
cd your-research-project/
dl-workflow init
```

或者直接运行初始化脚本：

```bash
bash skills/dl-research-workflow/init.sh
```

---

## 目录结构

```
dl-agent-skill/
├── README.md                   # 本文件
└── skills/
    └── dl-research-workflow/  # Skill 文件
        ├── skill.md            # Skill 定义
        ├── USAGE.md            # 详细使用指南
        ├── init.sh             # 初始化脚本
        ├── dl-workflow         # CLI 工具
        └── templates/          # 模板文件
```

---

## 核心概念

### 1. AGENT.md - AI 入口

任何 AI 打开项目，**首先读这个文件**。它告诉你：
- 当前研究阶段
- 本周目标
- 阻塞点
- 下一步行动
- 所有关键链接

### 2. 事件溯源

所有决策和动作都作为不可变事件记录，完整可追溯。

### 3. 研究计划追踪

- 整体研究计划
- 里程碑
- 实验设计空间
- 消融实验矩阵

### 4. 讨论区

支持多种视图：时序、话题线程、按实验关联。

### 5. 参考代码与灵感

- 外部 repo 索引和关键发现
- 论文笔记
- 灵感记录
- 代码片段

### 6. 展示区

Agent 生成的 Markdown 总结和数据图，用于生成 PPTX。

---

## CLI 命令

```bash
dl-workflow init              # 初始化新项目
dl-workflow status            # 查看当前状态
dl-workflow event <desc>      # 记录新事件
dl-workflow inspire <desc>    # 记录新灵感
dl-workflow summarize weekly  # 生成周总结
dl-workflow help              # 显示帮助
```

---

## 工作流示例

### 日常研究

1. 打开项目先读 `AGENT.md`
2. 记录决策为事件
3. 有灵感随时记
4. 定期生成总结

### 切换 IDE/AI

新的 AI 只需要：
1. 读 `AGENT.md`
2. 根据链接跳转到详情
3. 完全理解当前状态

---

## 详细文档

- [Skill 定义](skills/dl-research-workflow/skill.md)
- [使用指南](skills/dl-research-workflow/USAGE.md)
- [模板文件](skills/dl-research-workflow/templates/)

---

## 许可证

MIT
