import type { AgentDefinition } from '../registry.js';
import headchefOrchestratorContent from './headchef_orchestrator.md';
import codeReviewerContent from './code_reviewer.md';
import testWriterContent from './test_writer.md';
import bugDebuggerContent from './bug_debugger.md';
import architecturePlannerContent from './architecture_planner.md';
import docsKeeperContent from './docs_keeper.md';

export function getCoreDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'headchef-orchestrator',
      name: 'Headchef Orchestrator',
      description: 'Lead agent that delegates to specialists and coordinates multi-agent workflows.',
      category: 'core',
      getContent: () => headchefOrchestratorContent,
    },
    {
      id: 'code-reviewer',
      name: 'Code Reviewer',
      description: 'Code quality reviews with clean code, SOLID, and security checks.',
      category: 'core',
      getContent: () => codeReviewerContent,
    },
    {
      id: 'test-writer',
      name: 'Test Writer',
      description: 'Comprehensive tests with Arrange-Act-Assert, edge cases, and test doubles.',
      category: 'core',
      getContent: () => testWriterContent,
    },
    {
      id: 'bug-debugger',
      name: 'Bug Debugger',
      description: 'Systematic debugging: reproduce, isolate, root cause, fix, verify.',
      category: 'core',
      getContent: () => bugDebuggerContent,
    },
    {
      id: 'architecture-planner',
      name: 'Architecture Planner',
      description: 'Architecture design with trade-off analysis and proven patterns.',
      category: 'core',
      getContent: () => architecturePlannerContent,
    },
    {
      id: 'docs-keeper',
      name: 'Docs Keeper',
      description: 'Documentation management: APIs, guides, ADRs, and changelogs.',
      category: 'core',
      getContent: () => docsKeeperContent,
    },
  ];
}
