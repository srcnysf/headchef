import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const cwd = path.resolve(import.meta.dirname, '..');
const cli = `node ${path.join(cwd, 'dist/index.js')}`;

beforeAll(() => {
  execSync('npm run build', { cwd, stdio: 'ignore' });
});

function run(cmd: string): string {
  return execSync(`${cli} ${cmd}`, { cwd, encoding: 'utf-8', timeout: 30000 });
}

describe('init subcommand', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-cli-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should generate all configs with --no-interactive', () => {
    run(`init --target ${tmpDir} --no-interactive`);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.codex/config.toml'))).toBe(true);
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
    run(`init --target ${tmpDir} --only claude`);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should only generate codex with --only codex', () => {
    run(`init --target ${tmpDir} --only codex`);
    expect(fs.pathExistsSync(path.join(tmpDir, '.codex/config.toml'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should show dry-run output without writing', () => {
    const output = run(`init --target ${tmpDir} --dry-run --no-interactive`);
    expect(output).toContain('CLAUDE.md');
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should exclude specified IDEs', () => {
    run(`init --target ${tmpDir} --exclude antigravity windsurf`);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(false);
    expect(fs.pathExistsSync(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(false);
  });

  it('should generate framework-specific files', () => {
    run(`init --target ${tmpDir} --framework flutter --only cursor`);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/flutter.mdc'))).toBe(true);
  });

  it('should generate only copilot with --only copilot', () => {
    run(`init --target ${tmpDir} --only copilot`);
    expect(fs.pathExistsSync(path.join(tmpDir, '.github/copilot-instructions.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should generate only agentsmd with --only agentsmd', () => {
    run(`init --target ${tmpDir} --only agentsmd`);
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
    run(`create ${projectDir} --no-interactive --no-brain`);
    expect(fs.pathExistsSync(projectDir)).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'GEMINI.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'AGENTS.md'))).toBe(true);
  });

  it('should generate only specified IDEs with --only', () => {
    const projectDir = path.join(tmpDir, 'only-claude');
    run(`create ${projectDir} --only claude --no-brain`);
    expect(fs.pathExistsSync(path.join(projectDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should not create directory with --dry-run', () => {
    const projectDir = path.join(tmpDir, 'dry-run-project');
    const output = run(`create ${projectDir} --dry-run --no-interactive --no-brain`);
    expect(output).toContain('CLAUDE.md');
    expect(fs.pathExistsSync(projectDir)).toBe(false);
  });

  it('should generate framework-specific files', () => {
    const projectDir = path.join(tmpDir, 'flutter-project');
    run(`create ${projectDir} --framework flutter --only cursor --no-brain`);
    expect(fs.pathExistsSync(path.join(projectDir, '.cursor/rules/flutter.mdc'))).toBe(true);
  });

  it('should generate CHECKLIST.md and CHANGELOG.md', () => {
    const projectDir = path.join(tmpDir, 'with-docs');
    run(`create ${projectDir} --only claude --no-brain`);
    expect(fs.pathExistsSync(path.join(projectDir, 'CHECKLIST.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(projectDir, 'CHANGELOG.md'))).toBe(true);
  });

  it('should show next steps after generation', () => {
    const projectDir = path.join(tmpDir, 'next-steps-test');
    const output = run(`create ${projectDir} --no-interactive --no-brain`);
    expect(output).toContain('Next steps');
    expect(output).toContain('git init');
  });
});

describe('list subcommand', () => {
  it('should show all IDEs with display names', () => {
    const output = run('list');
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
    const output = run('list');
    expect(output).toContain('general');
    expect(output).toContain('flutter');
    expect(output).toContain('nextjs');
    expect(output).toContain('react');
    expect(output).toContain('python');
  });

  it('should show agent categories', () => {
    const output = run('list');
    expect(output).toContain('Core');
    expect(output).toContain('Engineering');
    expect(output).toContain('Design');
    expect(output).toContain('Spatial Computing');
  });
});
