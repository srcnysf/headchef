import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateGeneralMdc, generateFrameworkMdc } from '../templates/cursor/general_mdc.js';
import { generateCursorIgnore, generateCursorIndexingIgnore } from '../templates/cursor/ignore_files.js';

export class CursorRecipe implements Recipe {
  readonly name = 'cursor' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const files: FileEntry[] = [
      { path: '.cursor/rules/general.mdc', content: generateGeneralMdc() },
      { path: '.cursorignore', content: generateCursorIgnore() },
      { path: '.cursorindexingignore', content: generateCursorIndexingIgnore() },
    ];
    const frameworkMdc = generateFrameworkMdc(options.framework);
    if (frameworkMdc !== null) {
      files.push({ path: `.cursor/rules/${options.framework}.mdc`, content: frameworkMdc });
    }
    return files;
  }
}
