import { describe, it, expect } from 'vitest';
import { AgentsMdRecipe } from '../../src/recipes/agents_md.recipe.js';
import type { GeneratorOptions } from '../../src/types.js';

function createOptions(overrides: Partial<GeneratorOptions> = {}): GeneratorOptions {
  return {
    targetDir: '/tmp/test',
    ides: ['agentsmd'],
    framework: 'general',
    force: false,
    dryRun: false,
    ...overrides,
  };
}

describe('AgentsMdRecipe', () => {
  const recipe = new AgentsMdRecipe();

  it('should have name "agentsmd"', () => {
    expect(recipe.name).toBe('agentsmd');
  });

  it('should generate expected files for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const paths = files.map(f => f.path);
    expect(paths).toContain('AGENTS.md');
  });

  it('should generate files with non-empty content', () => {
    const files = recipe.generateFiles(createOptions());
    for (const file of files) {
      expect(file.content.length).toBeGreaterThan(0);
    }
  });

  it('should include Flutter content for flutter framework', () => {
    const files = recipe.generateFiles(createOptions({ framework: 'flutter' }));
    const agentsFile = files.find(f => f.path === 'AGENTS.md');
    expect(agentsFile).toBeDefined();
    expect(agentsFile!.content).toContain('Flutter');
    expect(agentsFile!.content).toContain('## Framework Guidelines');
  });

  it('should not include Framework Guidelines for general framework', () => {
    const files = recipe.generateFiles(createOptions());
    const agentsFile = files.find(f => f.path === 'AGENTS.md');
    expect(agentsFile).toBeDefined();
    expect(agentsFile!.content).not.toContain('## Framework Guidelines');
  });
});
