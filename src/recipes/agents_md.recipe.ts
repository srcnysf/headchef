import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateAgentsMd } from '../templates/agents_md/agents_md.js';

export class AgentsMdRecipe implements Recipe {
  readonly name = 'agentsmd' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'AGENTS.md', content: generateAgentsMd(options.framework) },
    ];
  }
}
