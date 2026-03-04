import { checkbox, select } from '@inquirer/prompts';
import { IDE_TYPES, IDE_METADATA, FRAMEWORKS, AGENT_CATEGORIES, AGENT_CATEGORY_METADATA } from './types.js';
import type { IdeType, Framework, AgentCategory } from './types.js';

export async function promptIdeSelection(preSelected?: readonly IdeType[]): Promise<IdeType[]> {
  const preSelectedSet = preSelected ? new Set(preSelected) : null;
  const choices = IDE_TYPES.map(ide => ({
    name: `${IDE_METADATA[ide].displayName.padEnd(22)} (${IDE_METADATA[ide].description})`,
    value: ide,
    checked: preSelectedSet ? preSelectedSet.has(ide) : true,
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

export async function promptAgentCategorySelection(
  preSelected?: readonly AgentCategory[]
): Promise<AgentCategory[]> {
  const preSelectedSet = preSelected ? new Set(preSelected) : null;
  const choices = AGENT_CATEGORIES.filter(cat => cat !== 'core').map(cat => {
    const meta = AGENT_CATEGORY_METADATA[cat];
    return {
      name: `${meta.displayName.padEnd(22)} (${meta.agentCount} agents — ${meta.description})`,
      value: cat,
      checked: preSelectedSet ? preSelectedSet.has(cat) : false,
    };
  });
  const selected = await checkbox({
    message: 'Select agent categories to include (core is always included)',
    choices,
  });
  return ['core', ...selected] as AgentCategory[];
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
