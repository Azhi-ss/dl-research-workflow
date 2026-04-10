#!/bin/bash
# DL Research Workflow 初始化脚本

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 命令行参数解析
INTEGRATE_MODE=0
VERBOSE=0

while [[ $# -gt 0 ]]; do
    case $1 in
        --integrate)
            INTEGRATE_MODE=1
            shift
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        -h|--help)
            cat << 'EOF'
用法: init.sh [选项]

初始化 DL Research Workflow 项目结构。

选项:
    --integrate    集成模式 - 不覆盖现有文件，只添加缺失的
    -v, --verbose  详细输出
    -h, --help     显示此帮助信息

示例:
    init.sh                    # 标准初始化（新项目）
    init.sh --integrate        # 集成到现有项目
EOF
            exit 0
            ;;
        *)
            echo "❌ 未知选项: $1"
            echo "运行 'init.sh --help' 查看用法"
            exit 1
            ;;
    esac
done

# 根据模式显示标题
if [ "$INTEGRATE_MODE" -eq 1 ]; then
    echo "========================================="
    echo "  DL Research Workflow 集成模式"
    echo "========================================="
    echo ""
    echo "📋 模式: 非破坏性集成"
    echo "   - 只添加缺失的目录和文件"
    echo "   - 不会覆盖任何现有文件"
    echo ""
else
    echo "========================================="
    echo "  DL Research Workflow 初始化"
    echo "========================================="
    echo ""
    echo "📋 模式: 完整初始化"
    echo "   - 创建完整的项目结构"
    echo "   - 如果文件已存在会提示覆盖"
    echo ""

    # 检查是否已经初始化（仅在非集成模式下）
    if [ -f "AGENT.md" ]; then
        echo "⚠️  检测到 AGENT.md 已存在"
        read -p "是否覆盖? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "已取消"
            exit 1
        fi
    fi
fi

# 获取当前时间
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
DATE=$(date -u +"%Y-%m-%d")

echo ""
echo "📁 创建目录结构..."

# 创建 .workflow 目录结构
mkdir -p .workflow/{events,snapshots,discussions/{topics,by-experiment},knowledge/{findings,patterns,decisions},presentations,research/{experiments/{active,completed,backlog},ablation},references/{repos,papers/{pdf,parsed,notes},inspirations,snippets/{by-category,by-source}},artifacts/manifests,secrets,templates,config}

# 创建标准深度学习项目结构
mkdir -p configs data notebooks scripts src/{data,models,training,evaluation,utils} tests checkpoints logs outputs

echo "✅ 目录结构创建完成"

echo ""
echo "📄 生成初始文件..."

TEMPLATES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../assets/templates"

# 从模板生成文件
apply_template() {
    local template="$1"
    local output="$2"

    if [ ! -f "$TEMPLATES_DIR/$template" ]; then
        echo "⚠️  警告: 模板文件不存在: $template"
        return 1
    fi

    # 在集成模式下，如果文件已存在，跳过
    if [ "$INTEGRATE_MODE" -eq 1 ] && [ -f "$output" ]; then
        if [ "$VERBOSE" -eq 1 ]; then
            echo "   ℹ️  $output 已存在，跳过"
        fi
        return 0
    fi

    sed "s/{{timestamp}}/$TIMESTAMP/g; s/{{date}}/$DATE/g; s/{{agent_name}}/dl-workflow-init/g" "$TEMPLATES_DIR/$template" > "$output"

    if [ "$VERBOSE" -eq 1 ]; then
        if [ "$INTEGRATE_MODE" -eq 1 ]; then
            echo "   ➕ 创建: $output"
        else
            echo "   📄 生成: $output"
        fi
    fi
}

# 检查文件是否存在
file_exists() {
    [ -f "$1" ]
}

# 生成合并报告
generate_merge_report() {
    echo ""
    echo "📊 集成报告"
    echo "============"
    echo ""
    echo "✅ 已创建的目录结构："
    echo "   .workflow/"
    echo ""
    echo "📋 下一步建议："
    echo "   1. 编辑 AGENT.md 填写你的项目信息"
    echo "   2. 查看 .workflow/research/plan.md 开始规划"
    echo "   3. 在 Claude Code 中说：'帮我看看 AGENT.md' 开始对话式使用"
    echo ""
}

# 生成 AGENT.md
apply_template "AGENT.md.template" "AGENT.md"

# 生成研究计划
apply_template "plan.md.template" ".workflow/research/plan.md"

# 生成研究问题树
apply_template "research-question-tree.md.template" ".workflow/research/research-question-tree.md"

# 生成风险登记册
apply_template "risk-register.md.template" ".workflow/research/risk-register.md"

# 创建讨论时间线
apply_template "discussion-timeline.md.template" ".workflow/discussions/timeline.md"

# 创建参考代码索引
apply_template "references-readme.md.template" ".workflow/references/README.md"

# 创建灵感索引
apply_template "inspirations-index.md.template" ".workflow/references/inspirations/index.md"

# 创建知识积累索引
apply_template "knowledge-readme.md.template" ".workflow/knowledge/README.md"

# 创建里程碑文件
apply_template "milestones.md.template" ".workflow/research/milestones.md"

# 创建消融矩阵（使用完整模板）
if [ -f "$TEMPLATES_DIR/ablation-matrix.md.template" ]; then
    apply_template "ablation-matrix.md.template" ".workflow/research/ablation/matrix.md"
else
    cat > ".workflow/research/ablation/matrix.md" << 'EOF'
# 消融实验矩阵

> 记录所有变量组合及其结果

---

## 实验设计

| 实验 ID | 变量 A | 变量 B | 变量 C | 结果 | 备注 |
|---------|--------|--------|--------|------|------|
|         |        |        |        |      |      |

---

## 结果汇总

暂无结果
EOF
fi

# 创建事件索引
apply_template "events-index.json.template" ".workflow/events/index.json"

# 创建 .gitignore
apply_template "gitignore.template" ".gitignore"

# 创建项目 README
apply_template "project-readme.md.template" "README.md"

# 复制所有模板到 .workflow/templates/ 供项目内使用
cp "$TEMPLATES_DIR"/*.template .workflow/templates/ 2>/dev/null || true

echo "✅ 初始文件生成完成"

# 根据模式显示完成信息
if [ "$INTEGRATE_MODE" -eq 1 ]; then
    generate_merge_report
else
    echo ""
    echo "========================================="
    echo "  🎉 初始化完成！"
    echo "========================================="
    echo ""
    echo "下一步："
    echo "1. 编辑 AGENT.md 设置当前状态"
    echo "2. 编辑 .workflow/research/plan.md 填写研究计划"
    echo "3. 编辑 .workflow/research/research-question-tree.md 分解研究问题"
    echo "4. 开始你的研究！"
    echo ""
    echo "可用命令："
    echo "  dl-workflow status            查看状态"
    echo "  dl-workflow event \"描述\"      记录事件"
    echo "  dl-workflow inspire \"想法\"    记录灵感"
    echo "  dl-workflow summarize weekly  生成周总结"
    echo ""
fi
