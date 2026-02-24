import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateJetbrainsRules } from '../templates/jetbrains/rules.js';

export class JetbrainsRecipe implements Recipe {
  readonly name = 'jetbrains' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: '.aiassistant/rules/general.md', content: generateJetbrainsRules(options.framework) },
    ];
  }
}
