import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { generateConfigs } from '../src/generator.js';
import type { GeneratorOptions } from '../src/types.js';

function createOptions(targetDir: string, overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir,
    ides: ['claude', 'codex', 'cursor', 'windsurf', 'antigravity', 'copilot', 'cline', 'jetbrains', 'augment', 'agentsmd'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('generateConfigs', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-gen-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should generate all IDE files on disk', async () => {
    const result = await generateConfigs(createOptions(tmpDir));
    expect(result.generated.length).toBeGreaterThan(0);
    expect(result.skipped).toHaveLength(0);
    expect(await fs.pathExists(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.codex/config.toml'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, 'GEMINI.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.github/copilot-instructions.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.clinerules'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.aiassistant/rules/general.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.augment/rules/general.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, 'AGENTS.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.gitignore.headchef'))).toBe(true);
  });

  it('should skip existing files and preserve their content', async () => {
    const originalContent = '# My existing CLAUDE.md';
    await fs.writeFile(path.join(tmpDir, 'CLAUDE.md'), originalContent);
    const result = await generateConfigs(createOptions(tmpDir, { ides: ['claude'] }));
    expect(result.skipped).toContain('CLAUDE.md');
    expect(result.generated).not.toContain('CLAUDE.md');
    const content = await fs.readFile(path.join(tmpDir, 'CLAUDE.md'), 'utf-8');
    expect(content).toBe(originalContent);
  });

  it('should overwrite existing files when force is true', async () => {
    const originalContent = '# My existing CLAUDE.md';
    await fs.writeFile(path.join(tmpDir, 'CLAUDE.md'), originalContent);
    const result = await generateConfigs(createOptions(tmpDir, { ides: ['claude'], force: true }));
    expect(result.skipped).toHaveLength(0);
    expect(result.generated).toContain('CLAUDE.md');
    const content = await fs.readFile(path.join(tmpDir, 'CLAUDE.md'), 'utf-8');
    expect(content).not.toBe(originalContent);
  });

  it('should not write files in dry-run mode but populate generated array', async () => {
    const result = await generateConfigs(createOptions(tmpDir, { dryRun: true }));
    expect(result.generated.length).toBeGreaterThan(0);
    expect(await fs.pathExists(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
    expect(await fs.pathExists(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should only generate files for specified IDEs', async () => {
    const result = await generateConfigs(createOptions(tmpDir, { ides: ['claude'] }));
    expect(result.generated).toContain('CLAUDE.md');
    expect(result.generated.some(f => f.includes('.cursor'))).toBe(false);
    expect(result.generated.some(f => f.includes('.windsurf'))).toBe(false);
    expect(result.generated.some(f => f.includes('GEMINI'))).toBe(false);
  });

  it('should always generate .gitignore.headchef', async () => {
    const result = await generateConfigs(createOptions(tmpDir, { ides: ['claude'] }));
    expect(result.generated).toContain('.gitignore.headchef');
    expect(await fs.pathExists(path.join(tmpDir, '.gitignore.headchef'))).toBe(true);
  });

  it('should generate framework-specific files for cursor', async () => {
    const result = await generateConfigs(createOptions(tmpDir, { ides: ['cursor'], framework: 'flutter' }));
    expect(result.generated).toContain('.cursor/rules/flutter.mdc');
    expect(await fs.pathExists(path.join(tmpDir, '.cursor/rules/flutter.mdc'))).toBe(true);
  });
});
