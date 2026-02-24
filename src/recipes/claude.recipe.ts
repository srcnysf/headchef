import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClaudeMd } from '../templates/claude/claude_md.js';
import { generateClaudeSettings } from '../templates/claude/settings.js';
import { generatePrReviewerAgent, generateCodeReviewerAgent } from '../templates/claude/agents.js';
import { generateReviewCommand } from '../templates/claude/commands.js';

export class ClaudeRecipe implements Recipe {
  readonly name = 'claude' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'CLAUDE.md', content: generateClaudeMd(options.framework) },
      { path: '.claude/settings.json', content: generateClaudeSettings() },
      { path: '.claude/agents/pr-reviewer.md', content: generatePrReviewerAgent() },
      { path: '.claude/agents/code-reviewer.md', content: generateCodeReviewerAgent() },
      { path: '.claude/commands/review.md', content: generateReviewCommand() },
      { path: '.mcp.json', content: '{\n  "mcpServers": {}\n}\n' },
    ];
  }
}
