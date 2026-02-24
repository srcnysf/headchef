import { getCodeReviewerContent } from '../agents/code_reviewer.js';
import { getTestWriterContent } from '../agents/test_writer.js';
import { getBugDebuggerContent } from '../agents/bug_debugger.js';
import { getArchitecturePlannerContent } from '../agents/architecture_planner.js';
import { getDocsKeeperContent } from '../agents/docs_keeper.js';

function wrapClaudeAgent(name: string, description: string, content: string): string {
  return `---
name: ${name}
description: ${description}
model: inherit
---

${content}
`;
}

export function generateCodeReviewerAgent(): string {
  return wrapClaudeAgent(
    'code-reviewer',
    'Use this agent for code quality reviews. Checks clean code principles, SOLID adherence, security best practices, and type safety.',
    getCodeReviewerContent()
  );
}

export function generateTestWriterAgent(): string {
  return wrapClaudeAgent(
    'test-writer',
    'Use this agent for writing comprehensive tests. Follows Arrange-Act-Assert, covers edge cases, and uses proper test doubles.',
    getTestWriterContent()
  );
}

export function generateBugDebuggerAgent(): string {
  return wrapClaudeAgent(
    'bug-debugger',
    'Use this agent for systematic debugging. Reproduces, isolates, identifies root cause, proposes fix, and verifies resolution.',
    getBugDebuggerContent()
  );
}

export function generateArchitecturePlannerAgent(): string {
  return wrapClaudeAgent(
    'architecture-planner',
    'Use this agent for architecture design. Explores approaches, evaluates trade-offs, and proposes scalable designs using proven patterns.',
    getArchitecturePlannerContent()
  );
}

export function generateDocsKeeperAgent(): string {
  return wrapClaudeAgent(
    'docs-keeper',
    'Use this agent for documentation management. Creates, updates, and maintains project documentation including APIs, guides, and ADRs.',
    getDocsKeeperContent()
  );
}
