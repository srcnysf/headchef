import type { SkillDefinition } from '../skills/registry.js';

export function wrapAsClaudeCommand(skill: SkillDefinition): string {
  return `---
name: ${skill.id}
description: ${skill.description}
---

${skill.getContent()}
`;
}
