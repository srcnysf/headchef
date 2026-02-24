import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClaudeMd } from '../templates/claude/claude_md.js';
import { generateClaudeSettings } from '../templates/claude/settings.js';
import {
  generateCodeReviewerAgent,
  generateTestWriterAgent,
  generateBugDebuggerAgent,
  generateArchitecturePlannerAgent,
  generateDocsKeeperAgent,
} from '../templates/claude/agents.js';
import { generateReviewCommand } from '../templates/claude/commands.js';

export class ClaudeRecipe implements Recipe {
  readonly name = 'claude' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'CLAUDE.md', content: generateClaudeMd(options.framework) },
      { path: '.claude/settings.json', content: generateClaudeSettings() },
      { path: '.claude/agents/code-reviewer.md', content: generateCodeReviewerAgent() },
      { path: '.claude/agents/test-writer.md', content: generateTestWriterAgent() },
      { path: '.claude/agents/bug-debugger.md', content: generateBugDebuggerAgent() },
      { path: '.claude/agents/architecture-planner.md', content: generateArchitecturePlannerAgent() },
      { path: '.claude/agents/docs-keeper.md', content: generateDocsKeeperAgent() },
      { path: '.claude/commands/review.md', content: generateReviewCommand() },
      { path: '.mcp.json', content: '{\n  "mcpServers": {}\n}\n' },
    ];
  }
}
