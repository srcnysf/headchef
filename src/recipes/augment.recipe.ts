import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateAugmentRules } from '../templates/augment/rules.js';

export class AugmentRecipe implements Recipe {
  readonly name = 'augment' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: '.augment/rules/general.md', content: generateAugmentRules(options.framework) },
    ];
  }
}
