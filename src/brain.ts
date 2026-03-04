import fs from 'fs-extra';
import path from 'path';
import { generateOverviewMd } from './templates/brain/overview_md.js';

export interface BrainOptions {
  readonly projectName: string;
  readonly projectPath: string;
  readonly brainPath: string;
  readonly dryRun: boolean;
}

export interface BrainResult {
  readonly brainProjectDir: string;
  readonly overviewCreated: boolean;
  readonly symlinkCreated: boolean;
  readonly symlinkMigrated: boolean;
  readonly indexUpdated: boolean;
}

export async function setupBrainDocs(options: BrainOptions): Promise<BrainResult> {
  const brainProjectDir = buildBrainProjectDir(options.brainPath, options.projectName);
  const result: BrainResult = {
    brainProjectDir,
    overviewCreated: false,
    symlinkCreated: false,
    symlinkMigrated: false,
    indexUpdated: false,
  };

  if (options.dryRun) {
    return result;
  }

  await fs.ensureDir(brainProjectDir);
  const overviewCreated = await createOverviewMd(brainProjectDir, options.projectName);
  const symlinkResult = await setupDocsSymlink(options.projectPath, brainProjectDir);
  const indexUpdated = await updateBrainIndex(options.brainPath, options.projectName);

  return {
    brainProjectDir,
    overviewCreated,
    symlinkCreated: symlinkResult.created,
    symlinkMigrated: symlinkResult.migrated,
    indexUpdated,
  };
}

function buildBrainProjectDir(brainPath: string, projectName: string): string {
  return path.join(brainPath, 'Projects', 'Active', projectName);
}

async function createOverviewMd(brainProjectDir: string, projectName: string): Promise<boolean> {
  const overviewPath = path.join(brainProjectDir, 'Overview.md');
  if (await fs.pathExists(overviewPath)) {
    return false;
  }
  await fs.writeFile(overviewPath, generateOverviewMd(projectName), 'utf-8');
  return true;
}

async function setupDocsSymlink(
  projectPath: string,
  brainProjectDir: string
): Promise<{ created: boolean; migrated: boolean }> {
  const docsPath = path.join(projectPath, 'docs');
  const stat = await fs.lstat(docsPath).catch(() => null);

  if (stat?.isSymbolicLink()) {
    return { created: false, migrated: false };
  }

  if (stat?.isDirectory()) {
    await fs.copy(docsPath, brainProjectDir, { overwrite: false });
    await fs.move(docsPath, `${docsPath}.bak`);
    await fs.symlink(brainProjectDir, docsPath);
    return { created: true, migrated: true };
  }

  await fs.symlink(brainProjectDir, docsPath);
  return { created: true, migrated: false };
}

async function updateBrainIndex(brainPath: string, projectName: string): Promise<boolean> {
  const indexPath = path.join(brainPath, 'Projects', '_Index.md');
  await fs.ensureDir(path.dirname(indexPath));

  if (!await fs.pathExists(indexPath)) {
    const header = `# Projects Index\n\n| Project | Docs |\n|---------|------|\n`;
    await fs.writeFile(indexPath, header, 'utf-8');
  }

  const content = await fs.readFile(indexPath, 'utf-8');
  const entry = `| [[${projectName}/Overview|${projectName}]] | [[Projects/Active/${projectName}/Overview]] |`;

  if (content.includes(`[[${projectName}`)) {
    return false;
  }

  await fs.appendFile(indexPath, `${entry}\n`, 'utf-8');
  return true;
}
