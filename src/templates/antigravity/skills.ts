import { getCodeReviewerContent } from '../agents/code_reviewer.js';
import { getTestWriterContent } from '../agents/test_writer.js';
import { getBugDebuggerContent } from '../agents/bug_debugger.js';
import { getArchitecturePlannerContent } from '../agents/architecture_planner.js';
import { getDocsKeeperContent } from '../agents/docs_keeper.js';

function wrapAntigravitySkill(name: string, description: string, content: string): string {
  const title = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `---
name: ${name}
description: ${description}
---

# ${title} Skill

${content}
`;
}

export function generateCodeReviewerSkill(): string {
  return wrapAntigravitySkill(
    'code-reviewer',
    'Use when reviewing code quality. Checks clean code principles, SOLID adherence, security best practices, and type safety.',
    getCodeReviewerContent()
  );
}

export function generateTestWriterSkill(): string {
  return wrapAntigravitySkill(
    'test-writer',
    'Use when writing comprehensive tests. Follows Arrange-Act-Assert, covers edge cases, and uses proper test doubles.',
    getTestWriterContent()
  );
}

export function generateBugDebuggerSkill(): string {
  return wrapAntigravitySkill(
    'bug-debugger',
    'Use when debugging issues. Reproduces, isolates, identifies root cause, proposes fix, and verifies resolution.',
    getBugDebuggerContent()
  );
}

export function generateArchitecturePlannerSkill(): string {
  return wrapAntigravitySkill(
    'architecture-planner',
    'Use when designing system architecture. Explores approaches, evaluates trade-offs, and proposes scalable designs.',
    getArchitecturePlannerContent()
  );
}

export function generateDocsKeeperSkill(): string {
  return wrapAntigravitySkill(
    'docs-keeper',
    'Use when managing documentation. Creates, updates, and maintains project documentation including APIs, guides, and ADRs.',
    getDocsKeeperContent()
  );
}
