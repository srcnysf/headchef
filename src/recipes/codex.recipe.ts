import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateCodexConfig } from '../templates/codex/config_toml.js';

export class CodexRecipe implements Recipe {
  readonly name = 'codex' as const;

  generateFiles(_options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: '.codex/config.toml', content: generateCodexConfig() },
    ];
  }
}
