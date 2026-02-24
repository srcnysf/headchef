import { describe, it, expect } from 'vitest';
import { JetbrainsRecipe } from '../../src/recipes/jetbrains.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['jetbrains'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('JetbrainsRecipe', () => {
  const recipe = new JetbrainsRecipe();

  it('should have name "jetbrains"', () => {
    expect(recipe.name).toBe('jetbrains');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.aiassistant/rules/general.md');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include Flutter content for flutter framework', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const rulesFile = files.find(f => f.path === '.aiassistant/rules/general.md');
    expect(rulesFile).toBeDefined();
    expect(rulesFile!.content).toContain('Flutter');
  });

  it('should not include Flutter content for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const rulesFile = files.find(f => f.path === '.aiassistant/rules/general.md');
    expect(rulesFile).toBeDefined();
    expect(rulesFile!.content).not.toContain('Flutter');
  });
});
