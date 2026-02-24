import { describe, it, expect } from 'vitest';
import { AntigravityRecipe } from '../../src/recipes/antigravity.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['antigravity'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('AntigravityRecipe', () => {
  const recipe = new AntigravityRecipe();

  it('should have name "antigravity"', () => {
    expect(recipe.name).toBe('antigravity');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('GEMINI.md');
    expect(paths).toContain('.agent/rules/coding-style.md');
    expect(paths).toContain('.agent/skills/code-reviewer/SKILL.md');
    expect(paths).toContain('.agent/skills/test-writer/SKILL.md');
    expect(paths).toContain('.agent/skills/bug-debugger/SKILL.md');
    expect(paths).toContain('.agent/skills/architecture-planner/SKILL.md');
    expect(paths).toContain('.agent/skills/docs-keeper/SKILL.md');
    expect(paths).toContain('.agent/workflows/review.md');
  });

  it('should not generate pr-reviewer skill', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).not.toContain('.agent/skills/pr-reviewer/SKILL.md');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include framework rules in GEMINI.md for flutter', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const geminiMd = files.find(f => f.path === 'GEMINI.md');
    expect(geminiMd).toBeDefined();
    expect(geminiMd!.content).toContain('Flutter');
  });

  it('should generate 8 files total', () => {
    const files = recipe.generateFiles(createOptions());
    expect(files).toHaveLength(8);
  });

  it('should generate same file count regardless of framework', () => {
    const generalFiles = recipe.generateFiles(createOptions());
    const flutterFiles = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    expect(generalFiles).toHaveLength(flutterFiles.length);
  });
});
