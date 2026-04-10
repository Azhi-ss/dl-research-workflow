# AGENT.md 详解

## 概述

`AGENT.md` 是项目的 AI 入口文档。任何 AI 打开项目时**首先读取此文件**，立即理解项目当前状态。

## 内容结构

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

## 使用时机

- **每次打开项目** - AI 首先读取
- **切换 IDE/AI 工具** - 新 AI 读取以快速上手
- **交接项目** - 替代冗长的口头/文字说明

## 更新频率

建议每次完成重要操作后更新：
- 新决策/事件
- 目标完成/变更
- 阻塞点变化
- 下一步行动调整
