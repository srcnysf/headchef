import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { detectExistingFiles } from '../src/detector.js';

describe('detectExistingFiles', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-test-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should return empty array when no configs exist', async () => {
    const existing = await detectExistingFiles(tmpDir, ['CLAUDE.md', '.cursor/rules/general.mdc']);
    expect(existing).toEqual([]);
  });

  it('should detect existing files', async () => {
    await fs.writeFile(path.join(tmpDir, 'CLAUDE.md'), 'test');
    const existing = await detectExistingFiles(tmpDir, ['CLAUDE.md', '.cursor/rules/general.mdc']);
    expect(existing).toEqual(['CLAUDE.md']);
  });

  it('should detect existing files in subdirectories', async () => {
    await fs.ensureDir(path.join(tmpDir, '.claude'));
    await fs.writeFile(path.join(tmpDir, '.claude/settings.json'), '{}');
    const existing = await detectExistingFiles(tmpDir, ['.claude/settings.json']);
    expect(existing).toEqual(['.claude/settings.json']);
  });
});
