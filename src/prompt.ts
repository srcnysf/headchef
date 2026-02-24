import { checkbox, select } from '@inquirer/prompts';
import { IDE_TYPES, IDE_METADATA, FRAMEWORKS } from './types.js';
import type { IdeType, Framework } from './types.js';

export async function promptIdeSelection(): Promise<IdeType[]> {
  const choices = IDE_TYPES.map(ide => ({
    name: `${IDE_METADATA[ide].displayName.padEnd(22)} (${IDE_METADATA[ide].description})`,
    value: ide,
    checked: true,
  }));
  const selected = await checkbox({
    message: 'Select AI IDEs to configure (space to toggle, enter to confirm)',
    choices,
  });
  return selected as IdeType[];
}

export async function promptFrameworkSelection(): Promise<Framework> {
  const choices = FRAMEWORKS.map(fw => ({
    name: fw,
    value: fw,
  }));
  const selected = await select({
    message: 'Select framework',
    choices,
  });
  return selected as Framework;
}

export async function promptOverwriteSelection(conflicts: readonly string[]): Promise<string[]> {
  if (conflicts.length === 0) {
    return [];
  }
  const choices = conflicts.map(filePath => ({
    name: filePath,
    value: filePath,
    checked: false,
  }));
  const selected = await checkbox({
    message: 'These files already exist. Select files to overwrite (enter to skip all)',
    choices,
  });
  return selected as string[];
}
