import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateCopilotInstructions } from '../templates/copilot/instructions.js';

export class CopilotRecipe implements Recipe {
  readonly name = 'copilot' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: '.github/copilot-instructions.md', content: generateCopilotInstructions(options.framework) },
    ];
  }
}
