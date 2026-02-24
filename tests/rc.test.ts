import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { loadRcConfig, saveRcConfig } from '../src/rc.js';
import type { RcConfig } from '../src/rc.js';

describe('RC config', () => {
  let tmpHome: string;
  let originalHome: string;

  beforeEach(async () => {
    tmpHome = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-rc-'));
    originalHome = process.env.HOME || '';
    process.env.HOME = tmpHome;
  });

  afterEach(async () => {
    process.env.HOME = originalHome;
    await fs.remove(tmpHome);
  });

  it('should return null when no RC file exists', async () => {
    const config = await loadRcConfig();
    expect(config).toBeNull();
  });

  it('should save and load RC config', async () => {
    const config: RcConfig = { ides: ['claude', 'cursor'], framework: 'flutter' };
    await saveRcConfig(config);
    const loaded = await loadRcConfig();
    expect(loaded).toEqual(config);
  });

  it('should save to ~/.headchefrc', async () => {
    await saveRcConfig({ ides: ['claude'], framework: 'general' });
    expect(fs.pathExistsSync(path.join(tmpHome, '.headchefrc'))).toBe(true);
  });

  it('should return null for malformed JSON', async () => {
    await fs.writeFile(path.join(tmpHome, '.headchefrc'), 'not json', 'utf-8');
    const config = await loadRcConfig();
    expect(config).toBeNull();
  });
});
