import { describe, it, expect } from 'vitest';
import { generateCopilotInstructions } from '../../../src/templates/copilot/instructions.js';

describe('copilot templates', () => {
  describe('generateCopilotInstructions', () => {
    it('should contain Copilot Instructions heading', () => {
      const result = generateCopilotInstructions('general');
      expect(result).toContain('# Copilot Instructions');
    });
    it('should not start with frontmatter delimiters', () => {
      const result = generateCopilotInstructions('general');
      expect(result.startsWith('---')).toBe(false);
    });
    it('should include base rules content', () => {
      const result = generateCopilotInstructions('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('PascalCase');
    });
    it('should include Flutter rules for flutter framework', () => {
      const result = generateCopilotInstructions('flutter');
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
    });
    it('should not include Flutter rules for general framework', () => {
      const result = generateCopilotInstructions('general');
      expect(result).not.toContain('Flutter');
    });
    it('should return non-empty content', () => {
      const result = generateCopilotInstructions('general');
      expect(result.length).toBeGreaterThan(0);
    });
    it('should include framework-specific rules for nextjs', () => {
      const result = generateCopilotInstructions('nextjs');
      expect(result).toContain('Next.js');
    });
  });
});
