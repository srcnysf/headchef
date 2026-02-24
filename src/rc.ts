import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import type { IdeType, Framework } from './types.js';

export interface RcConfig {
  readonly ides: readonly IdeType[];
  readonly framework: Framework;
}

function getRcPath(): string {
  return path.join(os.homedir(), '.headchefrc');
}

export async function loadRcConfig(): Promise<RcConfig | null> {
  const rcPath = getRcPath();
  const isExists = await fs.pathExists(rcPath);
  if (!isExists) {
    return null;
  }
  try {
    const raw = await fs.readFile(rcPath, 'utf-8');
    const parsed = JSON.parse(raw) as RcConfig;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveRcConfig(config: RcConfig): Promise<void> {
  const rcPath = getRcPath();
  const content = JSON.stringify(config, null, 2) + '\n';
  await fs.writeFile(rcPath, content, 'utf-8');
}
