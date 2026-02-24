import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateWindsurfGeneralMd, generateWindsurfFrameworkMd } from '../templates/windsurf/general_md.js';
import { generateCodeiumIgnore } from '../templates/windsurf/ignore_file.js';

export class WindsurfRecipe implements Recipe {
  readonly name = 'windsurf' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const files: FileEntry[] = [
      { path: '.windsurf/rules/general.md', content: generateWindsurfGeneralMd() },
      { path: '.codeiumignore', content: generateCodeiumIgnore() },
    ];
    const frameworkMd = generateWindsurfFrameworkMd(options.framework);
    if (frameworkMd !== null) {
      files.push({ path: `.windsurf/rules/${options.framework}.md`, content: frameworkMd });
    }
    return files;
  }
}
