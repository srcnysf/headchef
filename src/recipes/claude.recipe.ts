import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClaudeMd } from '../templates/claude/claude_md.js';
import { loadAgentsByCategories } from '../templates/agents/registry.js';
import { generateCondensedAgentSection } from '../templates/agents/condensed.js';
import { wrapAsClaudeAgent } from '../templates/claude/agent_wrapper.js';
import { getAllSkills } from '../templates/skills/registry.js';
import { wrapAsClaudeCommand } from '../templates/claude/skill_wrapper.js';

export class ClaudeRecipe implements Recipe {
  readonly name = 'claude' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const agents = loadAgentsByCategories(options.agentCategories);
    const agentSection = generateCondensedAgentSection(agents);
    const agentFiles = agents.map(agent => ({
      path: `.claude/agents/${agent.id}.md`,
      content: wrapAsClaudeAgent(agent),
    }));

    const skills = getAllSkills();
    const skillFiles = skills.map(skill => ({
      path: `.claude/commands/${skill.id}.md`,
      content: wrapAsClaudeCommand(skill),
    }));

    return [
      { path: 'CLAUDE.md', content: generateClaudeMd(options.framework) + agentSection },
      ...agentFiles,
      ...skillFiles,
    ];
  }
}
