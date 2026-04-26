#!/usr/bin/env node

/**
 * Focused test runner for dl-research-workflow
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.join(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "dl-research-workflow");
const scriptsDir = path.join(skillDir, "scripts");
const templatesDir = path.join(skillDir, "assets", "templates");
const rootGitignorePath = path.join(rootDir, ".gitignore");
const projectGitignoreTemplatePath = path.join(
    templatesDir,
    "gitignore.template",
);
const indexPath = path.join(rootDir, "index.js");
const dlWorkflowPath = path.join(scriptsDir, "dl-workflow");
const initShPath = path.join(scriptsDir, "init.sh");
const launcherName =
    process.platform === "win32" ? "dl-workflow.cmd" : "dl-workflow";

function getLauncherDir(homeDir) {
    return process.platform === "win32"
        ? path.join(homeDir, ".claude", "bin")
        : path.join(homeDir, ".local", "bin");
}

console.log("");
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║       DL Research Workflow - Focused Test Suite              ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
console.log("");

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
};

function printSuccess(message) {
    console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function printError(message) {
    console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function printInfo(message) {
    console.log(`${colors.cyan}ℹ${colors.reset}  ${message}`);
}

let passed = 0;
let failed = 0;
let total = 0;

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function hasLine(content, expectedLine) {
    return content.split(/\r?\n/).includes(expectedLine);
}

function runCheck(message, fn) {
    total += 1;
    try {
        fn();
        printSuccess(message);
        passed += 1;
    } catch (error) {
        printError(`${message} (${error.message})`);
        failed += 1;
    }
}

function section(title) {
    console.log(`${colors.bright}${title}${colors.reset}`);
}

section("Test 1: Package Metadata");
const pkg = JSON.parse(
    fs.readFileSync(path.join(rootDir, "package.json"), "utf8"),
);
runCheck("Package name is correct", () =>
    assert(pkg.name === "create-dl-research-workflow", pkg.name),
);
runCheck("Main entry point is correct", () =>
    assert(pkg.main === "index.js", pkg.main),
);
runCheck("Binary entry point is configured", () =>
    assert(
        pkg.bin && pkg.bin["create-dl-research-workflow"],
        "missing bin entry",
    ),
);
runCheck("Published files include skills/", () =>
    assert(
        Array.isArray(pkg.files) && pkg.files.includes("skills/"),
        "skills/ missing from files",
    ),
);
runCheck("Published files no longer include agent-teams/", () =>
    assert(
        Array.isArray(pkg.files) && !pkg.files.includes("agent-teams/"),
        "agent-teams/ still present",
    ),
);
console.log("");

section("Test 2: Core Structure");
runCheck("index.js exists", () =>
    assert(fs.existsSync(indexPath), "index.js missing"),
);
runCheck("Skill directory exists", () =>
    assert(fs.existsSync(skillDir), "skill directory missing"),
);
runCheck("SKILL.md exists", () =>
    assert(fs.existsSync(path.join(skillDir, "SKILL.md")), "SKILL.md missing"),
);
runCheck("scripts/ directory exists", () =>
    assert(fs.existsSync(scriptsDir), "scripts/ missing"),
);
runCheck("assets/ directory exists", () =>
    assert(fs.existsSync(path.join(skillDir, "assets")), "assets/ missing"),
);
runCheck("references/ directory exists", () =>
    assert(
        fs.existsSync(path.join(skillDir, "references")),
        "references/ missing",
    ),
);
console.log("");

section("Test 3: Script Files");
runCheck("dl-workflow script exists", () =>
    assert(fs.existsSync(dlWorkflowPath), "dl-workflow missing"),
);
runCheck("dl-workflow is executable", () =>
    assert(
        (fs.statSync(dlWorkflowPath).mode & 0o111) !== 0,
        "dl-workflow not executable",
    ),
);
runCheck("init.sh script exists", () =>
    assert(fs.existsSync(initShPath), "init.sh missing"),
);
runCheck("init.sh is executable", () =>
    assert(
        (fs.statSync(initShPath).mode & 0o111) !== 0,
        "init.sh not executable",
    ),
);
console.log("");

section("Test 4: Template Suite");
const templates = fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith(".template"));
printInfo(`Found ${templates.length} template files`);
runCheck("Template count is at least 30", () =>
    assert(
        templates.length >= 30,
        `expected at least 30, got ${templates.length}`,
    ),
);
runCheck("AGENT template exists", () =>
    assert(
        templates.includes("AGENT.md.template"),
        "missing AGENT.md.template",
    ),
);
runCheck("AGENTS compatibility template exists", () =>
    assert(
        templates.includes("AGENTS.md.template"),
        "missing AGENTS.md.template",
    ),
);
runCheck("CLAUDE compatibility template exists", () =>
    assert(
        templates.includes("CLAUDE.md.template"),
        "missing CLAUDE.md.template",
    ),
);
runCheck("plan template exists", () =>
    assert(templates.includes("plan.md.template"), "missing plan.md.template"),
);
runCheck("experiment template exists", () =>
    assert(
        templates.includes("experiment.md.template"),
        "missing experiment.md.template",
    ),
);
runCheck("finding template exists", () =>
    assert(
        templates.includes("finding.md.template"),
        "missing finding.md.template",
    ),
);
runCheck("gitignore template exists", () =>
    assert(
        templates.includes("gitignore.template"),
        "missing gitignore.template",
    ),
);
console.log("");

section("Test 5: Legacy Cleanup");
runCheck("agents/ directory has been removed", () =>
    assert(
        !fs.existsSync(path.join(rootDir, "agents")),
        "agents/ still exists",
    ),
);
runCheck("agent-teams/ directory has been removed", () =>
    assert(
        !fs.existsSync(path.join(rootDir, "agent-teams")),
        "agent-teams/ still exists",
    ),
);
runCheck("Legacy Jest-style test file has been removed", () =>
    assert(
        !fs.existsSync(path.join(__dirname, "index.test.js")),
        "tests/index.test.js still exists",
    ),
);
console.log("");

section("Test 6: CLI Behavior");
runCheck("CLI help command works", () => {
    const result = spawnSync(dlWorkflowPath, ["help"], {
        encoding: "utf8",
        timeout: 5000,
    });

    assert(result.status === 0, `exit code ${result.status}`);
    assert(
        result.stdout.includes("DL Research Workflow CLI"),
        "missing help title",
    );
    assert(result.stdout.includes("用法"), "missing usage text");
    assert(
        result.stdout.includes("Core Commands"),
        "missing core commands section",
    );
    assert(
        result.stdout.includes("Advanced Commands"),
        "missing advanced commands section",
    );
    assert(
        result.stdout.includes("dl-workflow parse-pdf <pdf-file> [paper-id]"),
        "missing parse-pdf detailed usage",
    );
    assert(
        result.stdout.includes("dl-workflow parse-pdf --all"),
        "missing parse-pdf --all usage",
    );
    assert(
        result.stdout.includes("创建 PDF 解析工作区"),
        "parse-pdf help should describe workspace scaffolding",
    );
    assert(
        result.stdout.includes("输出总结提示"),
        "summarize help should describe prompt output",
    );
});

runCheck("Installer dry-run works", () => {
    const result = spawnSync("node", [indexPath, "--dry-run"], {
        cwd: rootDir,
        input: "n\n",
        encoding: "utf8",
        timeout: 10000,
    });

    assert(result.status === 0, `exit code ${result.status}`);
    assert(result.stdout.includes("Dry run mode"), "missing dry-run message");
});
console.log("");

section("Test 7: Installer Accessibility");
runCheck("Installer creates a callable dl-workflow launcher", () => {
    const tempHome = fs.mkdtempSync(
        path.join(os.tmpdir(), "dl-workflow-home-"),
    );

    try {
        const launcherDir = getLauncherDir(tempHome);
        const launcherPath = path.join(launcherDir, launcherName);
        const env = {
            ...process.env,
            HOME: tempHome,
            USERPROFILE: tempHome,
        };

        const installResult = spawnSync("node", [indexPath], {
            cwd: rootDir,
            env,
            encoding: "utf8",
            timeout: 10000,
        });

        assert(
            installResult.status === 0,
            `install exit code ${installResult.status}`,
        );
        assert(
            fs.existsSync(launcherPath),
            `launcher missing at ${launcherPath}`,
        );

        if (process.platform !== "win32") {
            assert(
                (fs.statSync(launcherPath).mode & 0o111) !== 0,
                "launcher is not executable",
            );
        }

        const helpResult = spawnSync(launcherPath, ["help"], {
            env: {
                ...env,
                PATH: `${launcherDir}${path.delimiter}${process.env.PATH || ""}`,
            },
            encoding: "utf8",
            timeout: 5000,
        });

        assert(
            helpResult.status === 0,
            `launcher exit code ${helpResult.status}`,
        );
        assert(
            helpResult.stdout.includes("DL Research Workflow CLI"),
            "launcher help output missing title",
        );
    } finally {
        fs.rmSync(tempHome, { recursive: true, force: true });
    }
});
console.log("");

section("Test 8: Public CLI Integrate Path");
runCheck("Launcher forwards init --integrate to non-destructive mode", () => {
    const tempHome = fs.mkdtempSync(
        path.join(os.tmpdir(), "dl-workflow-home-"),
    );
    const projectDir = fs.mkdtempSync(
        path.join(os.tmpdir(), "dl-workflow-project-"),
    );

    try {
        const launcherDir = getLauncherDir(tempHome);
        const launcherPath = path.join(launcherDir, launcherName);
        const env = {
            ...process.env,
            HOME: tempHome,
            USERPROFILE: tempHome,
        };

        const installResult = spawnSync("node", [indexPath], {
            cwd: rootDir,
            env,
            encoding: "utf8",
            timeout: 10000,
        });

        assert(
            installResult.status === 0,
            `install exit code ${installResult.status}`,
        );
        assert(
            fs.existsSync(launcherPath),
            `launcher missing at ${launcherPath}`,
        );

        const readmePath = path.join(projectDir, "README.md");
        fs.writeFileSync(readmePath, "KEEP README\n");

        const result = spawnSync(launcherPath, ["init", "--integrate"], {
            cwd: projectDir,
            env: {
                ...env,
                PATH: `${launcherDir}${path.delimiter}${process.env.PATH || ""}`,
            },
            encoding: "utf8",
            timeout: 10000,
        });

        assert(result.status === 0, `exit code ${result.status}`);
        assert(
            result.stdout.includes("DL Research Workflow 集成模式"),
            "did not enter integrate mode",
        );
        assert(
            fs.readFileSync(readmePath, "utf8") === "KEEP README\n",
            "README.md was overwritten via public CLI",
        );
        assert(
            fs.existsSync(path.join(projectDir, "AGENT.md")),
            "AGENT.md missing",
        );
        assert(
            fs.existsSync(path.join(projectDir, "AGENTS.md")),
            "AGENTS.md missing",
        );
        assert(
            fs.existsSync(path.join(projectDir, "CLAUDE.md")),
            "CLAUDE.md missing",
        );
        assert(
            fs.existsSync(
                path.join(projectDir, ".workflow", "research", "plan.md"),
            ),
            "plan.md missing",
        );
    } finally {
        fs.rmSync(tempHome, { recursive: true, force: true });
        fs.rmSync(projectDir, { recursive: true, force: true });
    }
});
console.log("");

section("Test 9: Project-Local Portability");
runCheck("Init generates portable agent entry files", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "dl-workflow-init-"));

    try {
        const result = spawnSync("bash", [initShPath, "--integrate"], {
            cwd: tempDir,
            encoding: "utf8",
            timeout: 10000,
        });

        assert(result.status === 0, `exit code ${result.status}`);
        assert(
            fs.existsSync(path.join(tempDir, "AGENT.md")),
            "AGENT.md missing",
        );
        assert(
            fs.existsSync(path.join(tempDir, "AGENTS.md")),
            "AGENTS.md missing",
        );
        assert(
            fs.existsSync(path.join(tempDir, "CLAUDE.md")),
            "CLAUDE.md missing",
        );
        assert(
            fs.existsSync(
                path.join(tempDir, ".workflow", "research", "plan.md"),
            ),
            "plan.md missing",
        );
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
});
console.log("");

section("Test 10: Safe Reinitialization");
runCheck(
    "Standard init preserves existing README.md and .gitignore when declined",
    () => {
        const tempDir = fs.mkdtempSync(
            path.join(os.tmpdir(), "dl-workflow-safe-init-"),
        );

        try {
            const readmePath = path.join(tempDir, "README.md");
            const gitignorePath = path.join(tempDir, ".gitignore");

            fs.writeFileSync(readmePath, "KEEP README\n");
            fs.writeFileSync(gitignorePath, "KEEP GITIGNORE\n");

            const result = spawnSync("bash", [initShPath], {
                cwd: tempDir,
                input: "n\nn\n",
                encoding: "utf8",
                timeout: 10000,
            });

            assert(result.status === 0, `exit code ${result.status}`);
            assert(
                fs.readFileSync(readmePath, "utf8") === "KEEP README\n",
                "README.md was overwritten",
            );
            assert(
                fs.readFileSync(gitignorePath, "utf8") === "KEEP GITIGNORE\n",
                ".gitignore was overwritten",
            );
            assert(
                result.stdout.includes("检测到已有文件: .gitignore"),
                "missing .gitignore overwrite prompt",
            );
            assert(
                result.stdout.includes("检测到已有文件: README.md"),
                "missing README.md overwrite prompt",
            );
        } finally {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    },
);
console.log("");

section("Test 11: CLI Argument Guardrails");

function runCliArgumentGuardrail(commandArgs, expectedMessage, expectedUsage) {
    const tempDir = fs.mkdtempSync(
        path.join(os.tmpdir(), "dl-workflow-guardrail-"),
    );

    try {
        const initResult = spawnSync("bash", [initShPath, "--integrate"], {
            cwd: tempDir,
            encoding: "utf8",
            timeout: 10000,
        });

        assert(initResult.status === 0, `init exit code ${initResult.status}`);

        const result = spawnSync(dlWorkflowPath, commandArgs, {
            cwd: tempDir,
            encoding: "utf8",
            timeout: 5000,
        });

        const output = `${result.stdout}${result.stderr}`;

        assert(result.status === 1, `exit code ${result.status}`);
        assert(
            output.includes(expectedMessage),
            `missing validation message: ${expectedMessage}`,
        );
        assert(
            output.includes(expectedUsage),
            `missing usage: ${expectedUsage}`,
        );
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

runCheck("Event requires an explicit description", () => {
    runCliArgumentGuardrail(
        ["event"],
        "请提供事件描述",
        'dl-workflow event "描述"',
    );
});

runCheck("Inspire requires an explicit description", () => {
    runCliArgumentGuardrail(
        ["inspire"],
        "请提供灵感描述",
        'dl-workflow inspire "描述"',
    );
});

runCheck("Parse-pdf requires a PDF path or --all", () => {
    runCliArgumentGuardrail(
        ["parse-pdf"],
        "请提供 PDF 文件路径",
        "dl-workflow parse-pdf <pdf-file> [paper-id]",
    );
});

runCheck("Parse-pdf --all scaffolds parsed paper workspaces", () => {
    const tempDir = fs.mkdtempSync(
        path.join(os.tmpdir(), "dl-workflow-parse-all-"),
    );

    try {
        const initResult = spawnSync("bash", [initShPath, "--integrate"], {
            cwd: tempDir,
            encoding: "utf8",
            timeout: 10000,
        });

        assert(initResult.status === 0, `init exit code ${initResult.status}`);

        const pdfDir = path.join(
            tempDir,
            ".workflow",
            "references",
            "papers",
            "pdf",
        );
        fs.mkdirSync(pdfDir, { recursive: true });
        fs.writeFileSync(path.join(pdfDir, "batch-paper.pdf"), "fake pdf\n");

        const result = spawnSync(dlWorkflowPath, ["parse-pdf", "--all"], {
            cwd: tempDir,
            encoding: "utf8",
            timeout: 5000,
        });

        const output = `${result.stdout}${result.stderr}`;

        assert(result.status === 0, `exit code ${result.status}`);
        assert(
            output.includes("PDF 解析工作区创建完成"),
            "missing parse-pdf --all completion message",
        );
        assert(
            fs.existsSync(
                path.join(
                    tempDir,
                    ".workflow",
                    "references",
                    "papers",
                    "parsed",
                    "batch-paper",
                    "paper.md",
                ),
            ),
            "paper.md placeholder was not created",
        );
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
});

runCheck("Summarize requires an explicit summary type", () => {
    runCliArgumentGuardrail(
        ["summarize"],
        "请提供总结类型",
        "dl-workflow summarize <daily|weekly>",
    );
});

runCheck("Summarize rejects unsupported summary types", () => {
    runCliArgumentGuardrail(
        ["summarize", "monthly"],
        "不支持的总结类型: monthly",
        "dl-workflow summarize <daily|weekly>",
    );
});
console.log("");

section("Test 12: Repo Hygiene Guardrails");
runCheck("Root .gitignore keeps repo-local workflow state local only", () => {
    const rootGitignore = fs.readFileSync(rootGitignorePath, "utf8");

    assert(
        hasLine(rootGitignore, ".workflow/"),
        "root .gitignore should ignore repo-local .workflow/",
    );
    assert(
        hasLine(rootGitignore, "/checkpoints/"),
        "root .gitignore should ignore repo-local checkpoints/",
    );
    assert(
        !hasLine(rootGitignore, "AGENT.md"),
        "root .gitignore should not ignore AGENT.md",
    );
    assert(
        !hasLine(rootGitignore, "AGENTS.md"),
        "root .gitignore should not ignore AGENTS.md",
    );
    assert(
        !hasLine(rootGitignore, "CLAUDE.md"),
        "root .gitignore should not ignore CLAUDE.md",
    );
});

runCheck(
    "Project gitignore template keeps .workflow as a tracked state source",
    () => {
        const projectGitignoreTemplate = fs.readFileSync(
            projectGitignoreTemplatePath,
            "utf8",
        );

        assert(
            !hasLine(projectGitignoreTemplate, ".workflow/"),
            "project template should not ignore the whole .workflow/",
        );
        assert(
            hasLine(projectGitignoreTemplate, ".workflow/secrets/"),
            "project template should ignore workflow secrets only",
        );
    },
);

runCheck("Init script keeps agent entry compatibility trio together", () => {
    const initScript = fs.readFileSync(initShPath, "utf8");

    assert(
        initScript.includes('apply_template "AGENT.md.template" "AGENT.md"'),
        "init.sh missing AGENT.md generation",
    );
    assert(
        initScript.includes('apply_template "AGENTS.md.template" "AGENTS.md"'),
        "init.sh missing AGENTS.md generation",
    );
    assert(
        initScript.includes('apply_template "CLAUDE.md.template" "CLAUDE.md"'),
        "init.sh missing CLAUDE.md generation",
    );
});
console.log("");

console.log(
    `${colors.bright}${colors.cyan}╔══════════════════════════════════════════════════════════════╗${colors.reset}`,
);
console.log(
    `${colors.bright}${colors.cyan}║${colors.reset}  ${colors.bright}Test Summary${colors.reset}                                                  ${colors.cyan}║${colors.reset}`,
);
console.log(
    `${colors.bright}${colors.cyan}╚══════════════════════════════════════════════════════════════╝${colors.reset}`,
);
console.log("");
console.log(`  Total:   ${total}`);
console.log(`  Passed:  ${colors.green}${passed}${colors.reset}`);
console.log(
    `  Failed:  ${failed > 0 ? colors.red : ""}${failed}${colors.reset}`,
);
console.log("");

if (failed === 0) {
    console.log(`${colors.green}✓ All tests passed!${colors.reset}`);
    process.exit(0);
}

console.log(`${colors.red}✗ Some tests failed!${colors.reset}`);
process.exit(1);
