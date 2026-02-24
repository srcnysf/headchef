import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClinerules, generateRooGeneralRules, generateRooFrameworkRules } from '../templates/cline/rules.js';

export class ClineRecipe implements Recipe {
  readonly name = 'cline' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const files: FileEntry[] = [
      { path: '.clinerules', content: generateClinerules(options.framework) },
      { path: '.roo/rules/general.md', content: generateRooGeneralRules() },
    ];
    const frameworkRules = generateRooFrameworkRules(options.framework);
    if (frameworkRules !== null) {
      files.push({ path: `.roo/rules/${options.framework}.md`, content: frameworkRules });
    }
    return files;
  }
}
