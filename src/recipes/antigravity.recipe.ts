import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateGeminiMd } from '../templates/antigravity/gemini_md.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';
import { wrapAsAntigravitySkill } from '../templates/antigravity/agent_wrapper.js';

export class AntigravityRecipe implements Recipe {
  readonly name = 'antigravity' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    const agentFiles = agents.map(agent => ({
      path: `.agent/skills/${agent.id}/SKILL.md`,
      content: wrapAsAntigravitySkill(agent),
    }));

    return [
      { path: 'GEMINI.md', content: generateGeminiMd(options.framework) + agentSection },
      ...agentFiles,
    ];
  }
}
