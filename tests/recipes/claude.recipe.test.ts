import { describe, it, expect } from 'vitest';
import { ClaudeRecipe } from '../../src/recipes/claude.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['claude'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('ClaudeRecipe', () => {
  const recipe = new ClaudeRecipe();

  it('should have name "claude"', () => {
    expect(recipe.name).toBe('claude');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('CLAUDE.md');
    expect(paths).toContain('.claude/agents/code-reviewer.md');
    expect(paths).toContain('.claude/agents/test-writer.md');
    expect(paths).toContain('.claude/agents/bug-debugger.md');
    expect(paths).toContain('.claude/agents/architecture-planner.md');
    expect(paths).toContain('.claude/agents/docs-keeper.md');
    expect(paths).toContain('.claude/commands/review.md');
  });

  it('should not generate pr-reviewer agent', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).not.toContain('.claude/agents/pr-reviewer.md');
  });

  it('should not generate settings.json or .mcp.json', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).not.toContain('.claude/settings.json');
    expect(paths).not.toContain('.mcp.json');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include framework rules in CLAUDE.md for flutter', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const claudeMd = files.find(f => f.path === 'CLAUDE.md');
    expect(claudeMd).toBeDefined();
    expect(claudeMd!.content).toContain('Flutter');
  });

  it('should generate 7 files total', () => {
    const files = recipe.generateFiles(createOptions());
    expect(files).toHaveLength(7);
  });
});
