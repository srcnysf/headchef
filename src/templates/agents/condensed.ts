import type { AgentDefinition } from './registry.js';
import type { AgentCategory } from '../../types.js';
import { AGENT_CATEGORY_METADATA } from '../../types.js';

export function generateCondensedAgentSection(agents: readonly AgentDefinition[]): string {
  const grouped = groupByCategory(agents);
  const sections = Array.from(grouped.entries()).map(([category, categoryAgents]) => {
    const meta = AGENT_CATEGORY_METADATA[category];
    const list = categoryAgents.map(a => `- **${a.name}**: ${a.description}`).join('\n');
    return `### ${meta.displayName}\n${list}`;
  });
  return `\n## Available Agents\n\n${sections.join('\n\n')}\n`;
}

function groupByCategory(
  agents: readonly AgentDefinition[]
): Map<AgentCategory, AgentDefinition[]> {
  const map = new Map<AgentCategory, AgentDefinition[]>();
  for (const agent of agents) {
    const list = map.get(agent.category) ?? [];
    list.push(agent);
    map.set(agent.category, list);
  }
  return map;
}
