import { describe, it, expect } from 'vitest';
import { WindsurfRecipe } from '../../src/recipes/windsurf.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['windsurf'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('WindsurfRecipe', () => {
  const recipe = new WindsurfRecipe();

  it('should have name "windsurf"', () => {
    expect(recipe.name).toBe('windsurf');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.windsurf/rules/general.md');
    expect(paths).toContain('.codeiumignore');
  });

  it('should not include framework md for general', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    const frameworkFiles = paths.filter(p => p.includes('.windsurf/rules/') && !p.includes('general'));
    expect(frameworkFiles).toHaveLength(0);
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include framework md for flutter', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const paths = files.map(f => f.path);
    expect(paths).toContain('.windsurf/rules/flutter.md');
  });

  it('should include framework md for react', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'react' }));
    const paths = files.map(f => f.path);
    expect(paths).toContain('.windsurf/rules/react.md');
  });
});
