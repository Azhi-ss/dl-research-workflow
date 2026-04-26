# 最佳实践

## 1. `AGENT.md` 保持最新

**时机**：每次完成重要操作后，尤其是在切换 IDE / AI 工具之前。

**必做**：
- [ ] 更新 `当前焦点`
- [ ] 更新 `当前优先级`（最多保留 3 项）
- [ ] 更新 `阻塞点`（有则写清，无则清空）
- [ ] 更新 `下一步行动`

**原则**：`AGENT.md` 要让新的 AI 在 **2-3 分钟内** 理解当前状态。

**不要**：
- 不要把它写成长篇背景文档
- 不要把所有实验细节都堆进去
- 不要长期不更新

## 2. 所有关键决策记事件

**不要只记在脑子里**，所有重要决策都应记录：

```bash
dl-workflow event "决定用 Transformer 架构而不是 RNN"
```

**事件价值**：
- 便于追溯的决策记录
- 未来可回顾决策过程
- 便于向新的 AI 或合作者解释路径

## 3. 实验记录必须完整

每个实验至少记录：

| 字段 | 说明 |
|------|------|
| Hypothesis | 要验证的核心假设 |
| Variables | 自变量列表 |
| Baseline | 对比基线 |
| Metrics | 评估指标 |
| Configuration | seed, hardware, dependencies, commit hash |
| Results | 具体数值结果 |
| Analysis | 观察、统计显著性、意外发现 |

## 4. 参考资料要消化成结构化笔记

**不要只 clone / 收藏，不总结。**

1. 在 `.workflow/references/` 中建立索引
2. 写清：为什么参考、关键发现、关联实验
3. 把外部信息转成你自己的研究语言

## 5. 定期整理总结

**周总结**：
- 回顾本周事件
- 总结进展和收获
- 规划下周目标

**阶段总结**：
- 探索 → 定型 → 优化 → 收尾 每个阶段结束时整理
- 只沉淀关键结论，不重复原始日志

## 6. 用模板，不从零开始

**25 个模板**覆盖常见研究记录场景：
- 新实验 → `experiment.md.template`
- 新发现 → `finding.md.template`
- 新灵感 → `inspiration.md.template`
- 写论文笔记 → `paper-note.md.template`
- 做决策回顾 → `decision-review.md.template`

## 7. 让 `AGENT.md` 负责导航，让 `.workflow/` 负责细节

建议分工如下：

- `AGENT.md`：当前状态、优先级、下一步、读取顺序
- `.workflow/research/`：计划、实验、风险、里程碑
- `.workflow/events/`：决策与动作历史
- `.workflow/references/`：论文、repo、灵感
- `.workflow/knowledge/`：长期沉淀的发现与模式

## 8. 持续管理风险

使用 `risk-register.md.template`：

1. 识别新风险
2. 评估可能性和影响
3. 制定应对措施
4. 定期更新状态

## 9. 协作时只维护一套状态源

无论是人类、Claude Code、Cursor 还是其他 AI：

- 都先回到 `AGENT.md` 和 `.workflow/` 获取上下文
- `AGENTS.md` / `CLAUDE.md` 只做兼容入口，不复制状态
- 新的判断、总结和交接信息要写回项目文件，而不是长期留在聊天记录里
- 多个 AI 可以并行工作，但最终都应回到同一套文件协议
- AI 可以提出建议、整理文件并补充结构化记录；但若涉及**方向变更、删除或覆盖重要文件、外部发布、敏感数据处理**，应先由人类批准，并写入事件或决策记录
- 切换 IDE / AI / 会话前，至少更新 `AGENT.md` 的**当前焦点、阻塞点、下一步行动**，并把新增判断写回 `plan.md`、实验记录或 `.workflow/events/`
- 这套协作机制基于共享文件协议；它**不提供任务编排、权限控制或自动审批流**
