import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateWindsurfGeneralMd, generateWindsurfFrameworkMd } from '../templates/windsurf/general_md.js';
import { generateCodeiumIgnore } from '../templates/windsurf/ignore_file.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';

export class WindsurfRecipe implements Recipe {
  readonly name = 'windsurf' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    const files: FileEntry[] = [
      { path: '.windsurf/rules/general.md', content: generateWindsurfGeneralMd() + agentSection },
      { path: '.codeiumignore', content: generateCodeiumIgnore() },
    ];
    const frameworkMd = generateWindsurfFrameworkMd(options.framework);
    if (frameworkMd !== null) {
      files.push({ path: `.windsurf/rules/${options.framework}.md`, content: frameworkMd });
    }
    return files;
  }
}
