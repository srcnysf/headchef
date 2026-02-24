import { describe, it, expect } from 'vitest';
import { CopilotRecipe } from '../../src/recipes/copilot.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['copilot'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('CopilotRecipe', () => {
  const recipe = new CopilotRecipe();

  it('should have name "copilot"', () => {
    expect(recipe.name).toBe('copilot');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.github/copilot-instructions.md');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include Flutter content for flutter framework', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const instructionsFile = files.find(f => f.path === '.github/copilot-instructions.md');
    expect(instructionsFile).toBeDefined();
    expect(instructionsFile!.content).toContain('Flutter');
  });

  it('should not include Flutter content for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const instructionsFile = files.find(f => f.path === '.github/copilot-instructions.md');
    expect(instructionsFile).toBeDefined();
    expect(instructionsFile!.content).not.toContain('Flutter');
  });
});
