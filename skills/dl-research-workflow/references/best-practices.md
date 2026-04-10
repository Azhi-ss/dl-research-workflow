# 最佳实践

## 1. AGENT.md 保持最新

**时机**：每次完成重要操作后

**必做**：
- [ ] 更新当前阶段
- [ ] 更新本周目标（完成则划掉/替换）
- [ ] 更新阻塞点（有则记录，无则清空）
- [ ] 更新下一步行动

**原则**：切换工具前必须是最新的

## 2. 所有决策记事件

**不要只记在脑子里**，所有重要决策都应记录：

```bash
dl-workflow event "决定用 Transformer 架构而不是 RNN"
```

**事件价值**：
- 完整审计追踪
- 未来可回顾决策过程
- 便于向他人解释

## 3. 实验记录完整

每个实验必须记录：

| 字段 | 说明 |
|------|------|
| Hypothesis | 要验证的核心假设 |
| Variables | 自变量列表 |
| Baseline | 对比基线 |
| Metrics | 评估指标 |
| Configuration | seed, hardware, dependencies, commit hash |
| Results | 具体数值结果 |
| Analysis | 观察、统计显著性、意外发现 |

## 4. 参考代码要写总结

**不要只 clone 不消化**：

1. Clone 后在 `.workflow/references/repos/` 添加 README
2. 记录：为什么参考、关键发现、关联实验
3. 消化后再用于自己的项目

## 5. 定期生成总结

**周总结**：
- 回顾本周事件
- 总结进展和收获
- 规划下周目标

**阶段总结**：
- 探索→定型→优化→收尾 各阶段结束时
- 整理该阶段的所有发现

## 6. 用模板不自己从零开始

24 个模板覆盖研究全流程：
- 新实验 → 用 `experiment.md.template`
- 新发现 → 用 `finding.md.template`
- 新灵感 → 用 `inspiration.md.template`
- 写论文笔记 → 用 `paper-note.md.template`

## 7. 定期回顾决策

使用 `decision-review.md.template`：

1. 回顾重要决策
2. 评估决策是否正确
3. 记录学到的经验
4. 更新未来的假设

## 8. 持续管理风险

使用 `risk-register.md.template`：

1. 识别新风险
2. 评估可能性和影响
3. 制定应对措施
4. 定期更新状态
