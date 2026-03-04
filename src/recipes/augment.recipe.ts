import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateAugmentRules } from '../templates/augment/rules.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';

export class AugmentRecipe implements Recipe {
  readonly name = 'augment' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    return [
      { path: '.augment/rules/general.md', content: generateAugmentRules(options.framework) + agentSection },
    ];
  }
}
