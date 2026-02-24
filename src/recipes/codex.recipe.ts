import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateCodexInstructions } from '../templates/codex/instructions.js';

export class CodexRecipe implements Recipe {
  readonly name = 'codex' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: '.codex/instructions.md', content: generateCodexInstructions(options.framework) },
    ];
  }
}
