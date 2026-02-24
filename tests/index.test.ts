import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('CLI integration', () => {
  let tmpDir: string;
  const cwd = '/Users/sercanyusuf/EventuallySolutions/cocktail';

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-cli-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should generate all configs with default options', () => {
    execSync(`npx tsx src/index.ts --target ${tmpDir}`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(true);
  });

  it('should only generate claude with --only claude', () => {
    execSync(`npx tsx src/index.ts --target ${tmpDir} --only claude`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should show --list output', () => {
    const output = execSync(`npx tsx src/index.ts --list`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('claude');
    expect(output).toContain('cursor');
    expect(output).toContain('flutter');
  });

  it('should show dry-run output without writing', () => {
    const output = execSync(`npx tsx src/index.ts --target ${tmpDir} --dry-run`, { cwd, encoding: 'utf-8' });
    expect(output).toContain('CLAUDE.md');
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should exclude specified IDEs', () => {
    execSync(`npx tsx src/index.ts --target ${tmpDir} --exclude antigravity windsurf`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(false);
    expect(fs.pathExistsSync(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(false);
  });

  it('should generate framework-specific files', () => {
    execSync(`npx tsx src/index.ts --target ${tmpDir} --framework flutter --only cursor`, { cwd });
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/flutter.mdc'))).toBe(true);
  });
});
