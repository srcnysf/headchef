import { describe, it, expect } from 'vitest';
import { AugmentRecipe } from '../../src/recipes/augment.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['augment'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('AugmentRecipe', () => {
  const recipe = new AugmentRecipe();

  it('should have name "augment"', () => {
    expect(recipe.name).toBe('augment');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.augment/rules/general.md');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include YAML frontmatter', () => {
    const files = recipe.generateFiles(createOptions());
    const rulesFile = files.find(f => f.path === '.augment/rules/general.md');
    expect(rulesFile).toBeDefined();
    expect(rulesFile!.content.startsWith('---')).toBe(true);
    expect(rulesFile!.content).toContain('description:');
    expect(rulesFile!.content).toContain('globs:');
  });

  it('should include Flutter content for flutter framework', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const rulesFile = files.find(f => f.path === '.augment/rules/general.md');
    expect(rulesFile).toBeDefined();
    expect(rulesFile!.content).toContain('Flutter');
  });

  it('should not include Flutter content for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const rulesFile = files.find(f => f.path === '.augment/rules/general.md');
    expect(rulesFile).toBeDefined();
    expect(rulesFile!.content).not.toContain('Flutter');
  });
});
