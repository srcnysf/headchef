import { describe, it, expect } from 'vitest';
import { CodexRecipe } from '../../src/recipes/codex.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['codex'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('CodexRecipe', () => {
  const recipe = new CodexRecipe();

  it('should have name "codex"', () => {
    expect(recipe.name).toBe('codex');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.codex/instructions.md');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include Flutter content for flutter framework', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const instructionsFile = files.find(f => f.path === '.codex/instructions.md');
    expect(instructionsFile).toBeDefined();
    expect(instructionsFile!.content).toContain('Flutter');
  });

  it('should not include Flutter content for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const instructionsFile = files.find(f => f.path === '.codex/instructions.md');
    expect(instructionsFile).toBeDefined();
    expect(instructionsFile!.content).not.toContain('Flutter');
  });
});
