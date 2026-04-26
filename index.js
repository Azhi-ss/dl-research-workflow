#!/usr/bin/env node

/**
 * create-dl-research-workflow
 * NPX installer for DL Research Workflow Claude Code Skill
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Package metadata
const VERSION = require('./package.json').version;
const SKILL_NAME = 'dl-research-workflow';
const SKILL_SOURCE_DIR = path.join(__dirname, 'skills', SKILL_NAME);

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function printHeader() {
  console.log('');
  console.log(`${colors.bright}${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║${colors.reset}  ${colors.bright}DL Research Workflow${colors.reset}                                      ${colors.cyan}║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║${colors.reset}  Deep Learning Research Agent Environment                    ${colors.cyan}║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║${colors.reset}  Version ${VERSION}${' '.repeat(51 - VERSION.length)}${colors.cyan}║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');
}

function printSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function printWarning(message) {
  console.log(`${colors.yellow}⚠${colors.reset}  ${message}`);
}

function printError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function printInfo(message) {
  console.log(`${colors.cyan}ℹ${colors.reset}  ${message}`);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}?${colors.reset} ${prompt} `, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function confirm(prompt, defaultYes = true) {
  const defaultText = defaultYes ? '(Y/n)' : '(y/N)';
  const answer = await question(`${prompt} ${defaultText}`);
  if (answer === '') return defaultYes;
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

function getClaudeSkillsDir() {
  const home = os.homedir();
  return path.join(home, '.claude', 'skills');
}

function getUserBinDir() {
  const home = os.homedir();
  if (process.platform === 'win32') {
    return path.join(home, '.claude', 'bin');
  }
  return path.join(home, '.local', 'bin');
}

function getCliLauncherPath() {
  const launcherName = process.platform === 'win32' ? 'dl-workflow.cmd' : 'dl-workflow';
  return path.join(getUserBinDir(), launcherName);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }
  return false;
}

function escapeForDoubleQuotes(value) {
  return value.replace(/(["$`\\])/g, '\\$1');
}

function formatCliInvocation(cliPathOrName, args = '') {
  const command = cliPathOrName.includes(path.sep)
    ? `"${escapeForDoubleQuotes(cliPathOrName)}"`
    : cliPathOrName;

  return args ? `${command} ${args}` : command;
}

function isDirOnPath(dir) {
  const currentPath = process.env.PATH || '';
  const normalizedDir = path.resolve(dir);

  return currentPath
    .split(path.delimiter)
    .filter(Boolean)
    .some((entry) => path.resolve(entry) === normalizedDir);
}

function createCliLauncher(targetDir) {
  const installedCliPath = path.join(targetDir, 'scripts', 'dl-workflow');
  const launcherPath = getCliLauncherPath();

  ensureDir(path.dirname(launcherPath));

  if (process.platform === 'win32') {
    const escapedCliPath = installedCliPath.replace(/"/g, '""');
    const content = `@echo off\r\n"bash" "${escapedCliPath}" %*\r\n`;
    fs.writeFileSync(launcherPath, content, 'utf8');
  } else {
    const content = `#!/bin/sh\nexec "${escapeForDoubleQuotes(installedCliPath)}" "$@"\n`;
    fs.writeFileSync(launcherPath, content, 'utf8');
    fs.chmodSync(launcherPath, 0o755);
  }

  return launcherPath;
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
    // Make scripts executable
    if (path.basename(src) === 'dl-workflow' || path.basename(src) === 'init.sh') {
      fs.chmodSync(dest, 0o755);
    }
  }
}

function directoryIsEmpty(dir) {
  if (!fs.existsSync(dir)) return true;
  const entries = fs.readdirSync(dir);
  return entries.length === 0;
}

async function main() {
  printHeader();

  const isDryRun = process.argv.includes('--dry-run');
  if (isDryRun) {
    printInfo('Dry run mode - no changes will be made');
    console.log('');
  }

  // Determine target directory
  const claudeSkillsDir = getClaudeSkillsDir();
  const targetDir = path.join(claudeSkillsDir, SKILL_NAME);

  printInfo(`Claude Code skills directory: ${colors.dim}${claudeSkillsDir}${colors.reset}`);
  printInfo(`Target skill directory: ${colors.dim}${targetDir}${colors.reset}`);
  console.log('');

  // Check if source exists
  if (!fs.existsSync(SKILL_SOURCE_DIR)) {
    printError(`Source skill directory not found: ${SKILL_SOURCE_DIR}`);
    console.log('');
    process.exit(1);
  }

  // Check if target exists
  const targetExists = fs.existsSync(targetDir);
  const targetIsEmpty = targetExists && directoryIsEmpty(targetDir);

  if (targetExists && !targetIsEmpty) {
    printWarning(`Skill already installed at: ${targetDir}`);
    const shouldOverwrite = await confirm('Overwrite existing installation?', false);
    console.log('');

    if (!shouldOverwrite) {
      printInfo('Installation cancelled by user');
      console.log('');
      rl.close();
      process.exit(0);
    }

    if (!isDryRun) {
      // Backup existing directory
      const backupDir = `${targetDir}.backup.${Date.now()}`;
      printInfo(`Backing up existing installation to: ${colors.dim}${backupDir}${colors.reset}`);
      fs.renameSync(targetDir, backupDir);
      printSuccess('Backup created');
      console.log('');
    }
  }

  // Create parent directory if needed
  if (!isDryRun) {
    const parentCreated = ensureDir(claudeSkillsDir);
    if (parentCreated) {
      printSuccess(`Created Claude Code skills directory: ${claudeSkillsDir}`);
    }
  }

  // Copy files
  console.log(`${colors.cyan}Installing skill...${colors.reset}`);

  if (!isDryRun) {
    try {
      copyRecursive(SKILL_SOURCE_DIR, targetDir);
      printSuccess('Skill files copied');
    } catch (error) {
      printError(`Failed to copy files: ${error.message}`);
      console.log('');
      rl.close();
      process.exit(1);
    }
  } else {
    printSuccess('(Dry run) Skill files would be copied');
  }

  const launcherPath = getCliLauncherPath();
  const fallbackCliPath = path.join(targetDir, 'scripts', 'dl-workflow');
  let preferredCliPath = fallbackCliPath;
  let shortCommandAvailable = false;

  if (!isDryRun) {
    try {
      createCliLauncher(targetDir);
      preferredCliPath = launcherPath;
      shortCommandAvailable = isDirOnPath(path.dirname(launcherPath));
      printSuccess(`CLI launcher installed: ${launcherPath}`);

      if (!shortCommandAvailable) {
        printWarning(`${path.dirname(launcherPath)} is not in PATH yet`);
        printInfo(`Use ${formatCliInvocation(launcherPath)} directly, or add it to your PATH`);
      }
    } catch (error) {
      printWarning(`Failed to create CLI launcher: ${error.message}`);
      printInfo(`You can still run the bundled CLI via ${formatCliInvocation(fallbackCliPath)}`);
    }
  } else {
    shortCommandAvailable = isDirOnPath(path.dirname(launcherPath));
    preferredCliPath = shortCommandAvailable ? 'dl-workflow' : launcherPath;
    printSuccess(`(Dry run) CLI launcher would be created at: ${launcherPath}`);
  }

  const initCommand = shortCommandAvailable
    ? 'dl-workflow init'
    : formatCliInvocation(preferredCliPath, 'init');
  const helpCommand = shortCommandAvailable
    ? 'dl-workflow help'
    : formatCliInvocation(preferredCliPath, 'help');

  console.log('');
  console.log(`${colors.bright}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.green}║${colors.reset}  ${colors.bright}Installation complete!${colors.reset}                                     ${colors.green}║${colors.reset}`);
  console.log(`${colors.bright}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  printSuccess(`Skill installed to: ${targetDir}`);
  console.log('');

  console.log(`${colors.bright}Quick start:${colors.reset}`);
  console.log('');
  console.log(`  ${colors.dim}# Create a new research project${colors.reset}`);
  console.log(`  ${colors.cyan}mkdir my-research-project && cd my-research-project${colors.reset}`);
  console.log(`  ${colors.cyan}${initCommand}${colors.reset}`);
  console.log('');
  console.log(`  ${colors.dim}# Or use the commands directly:${colors.reset}`);
  console.log(`  ${colors.cyan}${helpCommand}${colors.reset}`);
  console.log('');

  console.log(`${colors.dim}────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log('');
  console.log(`${colors.bright}Next steps:${colors.reset}`);
  console.log('');
  console.log(`  1. ${colors.cyan}Read the skill guide:${colors.reset}`);
  console.log(`     ${colors.dim}${targetDir}/SKILL.md${colors.reset}`);
  console.log('');
  console.log(`  2. ${colors.cyan}Initialize a research project:${colors.reset}`);
  console.log(`     ${colors.dim}cd your-project/ && ${initCommand}${colors.reset}`);
  console.log('');
  console.log(`  3. ${colors.cyan}Start researching!${colors.reset}`);
  console.log('');

  rl.close();
}

main().catch((error) => {
  console.error('');
  printError(`An unexpected error occurred: ${error.message}`);
  console.error(error.stack);
  console.log('');
  rl.close();
  process.exit(1);
});
