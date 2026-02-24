import { describe, it, expect } from 'vitest';
import { generateCodexInstructions } from '../../../src/templates/codex/instructions.js';

describe('codex templates', () => {
  describe('generateCodexInstructions', () => {
    it('should contain Project Instructions heading', () => {
      const result = generateCodexInstructions('general');
      expect(result).toContain('# Project Instructions');
    });
    it('should not start with frontmatter delimiters', () => {
      const result = generateCodexInstructions('general');
      expect(result.startsWith('---')).toBe(false);
    });
    it('should include base rules content', () => {
      const result = generateCodexInstructions('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('PascalCase');
    });
    it('should include Flutter rules for flutter framework', () => {
      const result = generateCodexInstructions('flutter');
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
    });
    it('should not include Flutter rules for general framework', () => {
      const result = generateCodexInstructions('general');
      expect(result).not.toContain('Flutter');
    });
    it('should return non-empty content', () => {
      const result = generateCodexInstructions('general');
      expect(result.length).toBeGreaterThan(0);
    });
    it('should include framework-specific rules for python', () => {
      const result = generateCodexInstructions('python');
      expect(result).toContain('Python');
    });
  });
});
