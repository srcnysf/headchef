import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const cwd = '/Users/sercanyusuf/EventuallySolutions/cocktail';

describe('init subcommand', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-cli-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should generate all configs with --no-interactive', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --no-interactive`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.codex/instructions.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.github/copilot-instructions.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.clinerules'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.aiassistant/rules/general.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.augment/rules/general.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'AGENTS.md'))).toBe(true);
  });

  it('should only generate claude with --only claude', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --only claude`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should only generate codex with --only codex', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --only codex`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, '.codex/instructions.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should show dry-run output without writing', () => {
    const output = execSync(`npx tsx src/index.ts init --target ${tmpDir} --dry-run --no-interactive`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('CLAUDE.md');
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should exclude specified IDEs', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --exclude antigravity windsurf`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(false);
    expect(fs.pathExistsSync(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(false);
  });

  it('should generate framework-specific files', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --framework flutter --only cursor`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/flutter.mdc'))).toBe(true);
  });

  it('should generate only copilot with --only copilot', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --only copilot`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, '.github/copilot-instructions.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should generate only agentsmd with --only agentsmd', () => {
    execSync(`npx tsx src/index.ts init --target ${tmpDir} --only agentsmd`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'AGENTS.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });
});

describe('create subcommand', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-create-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should create project directory and generate all configs', () => {
    const projectDir = path.join(tmpDir, 'my-project');
    execSync(`npx tsx src/index.ts create ${projectDir} --no-interactive`, { cwd });
    expect(fs.pathExistsSync(projectDir)).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'GEMINI.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'AGENTS.md'))).toBe(true);
  });

  it('should generate only specified IDEs with --only', () => {
    const projectDir = path.join(tmpDir, 'only-claude');
    execSync(`npx tsx src/index.ts create ${projectDir} --only claude`, { cwd });
    expect(fs.pathExistsSync(path.join(projectDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should not create directory with --dry-run', () => {
    const projectDir = path.join(tmpDir, 'dry-run-project');
    const output = execSync(`npx tsx src/index.ts create ${projectDir} --dry-run --no-interactive`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('CLAUDE.md');
    expect(fs.pathExistsSync(projectDir)).toBe(false);
  });

  it('should generate framework-specific files', () => {
    const projectDir = path.join(tmpDir, 'flutter-project');
    execSync(`npx tsx src/index.ts create ${projectDir} --framework flutter --only cursor`, { cwd });
    expect(fs.pathExistsSync(path.join(projectDir, '.cursor/rules/flutter.mdc'))).toBe(true);
  });

  it('should show next steps after generation', () => {
    const projectDir = path.join(tmpDir, 'next-steps-test');
    const output = execSync(`npx tsx src/index.ts create ${projectDir} --no-interactive`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('Next steps');
    expect(output).toContain('git init');
  });
});

describe('list subcommand', () => {
  it('should show all IDEs with display names', () => {
    const output = execSync(`npx tsx src/index.ts list`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('Claude Code');
    expect(output).toContain('OpenAI Codex');
    expect(output).toContain('Cursor');
    expect(output).toContain('Windsurf');
    expect(output).toContain('Google Antigravity');
    expect(output).toContain('GitHub Copilot');
    expect(output).toContain('Cline / Roo Code');
    expect(output).toContain('JetBrains AI');
    expect(output).toContain('Augment Code');
    expect(output).toContain('AGENTS.md');
  });

  it('should show all frameworks', () => {
    const output = execSync(`npx tsx src/index.ts list`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('general');
    expect(output).toContain('flutter');
    expect(output).toContain('nextjs');
    expect(output).toContain('react');
    expect(output).toContain('python');
  });
});
