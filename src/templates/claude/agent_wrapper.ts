import type { AgentDefinition } from '../agents/registry.js';

export function wrapAsClaudeAgent(agent: AgentDefinition): string {
  return `---
name: ${agent.id}
description: ${agent.description}
model: inherit
---

${agent.getContent()}
`;
}
