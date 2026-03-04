import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateAgentsMd } from '../templates/agents_md/agents_md.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';

export class AgentsMdRecipe implements Recipe {
  readonly name = 'agentsmd' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    return [
      { path: 'AGENTS.md', content: generateAgentsMd(options.framework) + agentSection },
    ];
  }
}
