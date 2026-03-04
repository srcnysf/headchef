import type { AgentDefinition } from '../agents/registry.js';

export function wrapAsAntigravitySkill(agent: AgentDefinition): string {
  const title = agent.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `---
name: ${agent.id}
description: ${agent.description}
---

# ${title} Skill

${agent.getContent()}
`;
}
