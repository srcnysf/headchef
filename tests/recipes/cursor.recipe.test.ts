import { describe, it, expect } from 'vitest';
import { CursorRecipe } from '../../src/recipes/cursor.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['cursor'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('CursorRecipe', () => {
  const recipe = new CursorRecipe();

  it('should have name "cursor"', () => {
    expect(recipe.name).toBe('cursor');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.cursor/rules/general.mdc');
    expect(paths).toContain('.cursor/mcp.json');
    expect(paths).toContain('.cursorignore');
    expect(paths).toContain('.cursorindexingignore');
  });

  it('should not include framework mdc for general', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    const frameworkFiles = paths.filter(p => p.endsWith('.mdc') && !p.includes('general'));
    expect(frameworkFiles).toHaveLength(0);
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include framework mdc for flutter', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const paths = files.map(f => f.path);
    expect(paths).toContain('.cursor/rules/flutter.mdc');
  });

  it('should include framework mdc for nextjs', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'nextjs' }));
    const paths = files.map(f => f.path);
    expect(paths).toContain('.cursor/rules/nextjs.mdc');
  });
});
