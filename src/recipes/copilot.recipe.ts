import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateCopilotInstructions } from '../templates/copilot/instructions.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';

export class CopilotRecipe implements Recipe {
  readonly name = 'copilot' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    return [
      { path: '.github/copilot-instructions.md', content: generateCopilotInstructions(options.framework) + agentSection },
    ];
  }
}
