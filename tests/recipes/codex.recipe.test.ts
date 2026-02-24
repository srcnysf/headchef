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

  it('should generate config.toml', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('.codex/config.toml');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should reference AGENTS.md in config', () => {
    const files = recipe.generateFiles(createOptions());
    const configFile = files.find(f => f.path === '.codex/config.toml');
    expect(configFile).toBeDefined();
    expect(configFile!.content).toContain('AGENTS.md');
  });

  it('should generate exactly 1 file', () => {
    const files = recipe.generateFiles(createOptions());
    expect(files).toHaveLength(1);
  });
});
