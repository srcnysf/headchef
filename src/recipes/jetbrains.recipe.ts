import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateJetbrainsRules } from '../templates/jetbrains/rules.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';

export class JetbrainsRecipe implements Recipe {
  readonly name = 'jetbrains' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    return [
      { path: '.aiassistant/rules/general.md', content: generateJetbrainsRules(options.framework) + agentSection },
    ];
  }
}
