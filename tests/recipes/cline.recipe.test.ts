import { describe, it, expect } from 'vitest';
import { ClineRecipe } from '../../src/recipes/cline.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['cline'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('ClineRecipe', () => {
  const recipe = new ClineRecipe();

  it('should have name "cline"', () => {
    expect(recipe.name).toBe('cline');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.clinerules');
    expect(paths).toContain('.roo/rules/general.md');
  });

  it('should not include framework roo rules for general', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    const frameworkFiles = paths.filter(p => p.includes('.roo/rules/') && !p.includes('general'));
    expect(frameworkFiles).toHaveLength(0);
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include framework roo rules for flutter', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const paths = files.map(f => f.path);
    expect(paths).toContain('.roo/rules/flutter.md');
  });

  it('should include Flutter content in clinerules for flutter', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const clinerules = files.find(f => f.path === '.clinerules');
    expect(clinerules).toBeDefined();
    expect(clinerules!.content).toContain('Flutter');
  });

  it('should include framework roo rules for react', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'react' }));
    const paths = files.map(f => f.path);
    expect(paths).toContain('.roo/rules/react.md');
  });
});
