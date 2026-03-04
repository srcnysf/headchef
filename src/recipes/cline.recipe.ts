import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClinerules, generateRooGeneralRules, generateRooFrameworkRules } from '../templates/cline/rules.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';

export class ClineRecipe implements Recipe {
  readonly name = 'cline' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    const files: FileEntry[] = [
      { path: '.clinerules', content: generateClinerules(options.framework) + agentSection },
      { path: '.roo/rules/general.md', content: generateRooGeneralRules() },
    ];
    const frameworkRules = generateRooFrameworkRules(options.framework);
    if (frameworkRules !== null) {
      files.push({ path: `.roo/rules/${options.framework}.md`, content: frameworkRules });
    }
    return files;
  }
}
