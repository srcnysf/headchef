import { describe, it, expect } from 'vitest';
import { generateAgentsMd } from '../../../src/templates/agents_md/agents_md.js';

describe('agents_md templates', () => {
  describe('generateAgentsMd', () => {
    it('should contain AGENTS.md heading', () => {
      const result = generateAgentsMd('general');
      expect(result).toContain('# AGENTS.md');
    });
    it('should not start with frontmatter delimiters', () => {
      const result = generateAgentsMd('general');
      expect(result.startsWith('---')).toBe(false);
    });
    it('should contain Build & Test Commands section', () => {
      const result = generateAgentsMd('general');
      expect(result).toContain('## Build & Test Commands');
      expect(result).toContain('npm run dev');
      expect(result).toContain('npm test');
    });
    it('should contain Code Style & Conventions section', () => {
      const result = generateAgentsMd('general');
      expect(result).toContain('## Code Style & Conventions');
    });
    it('should contain condensed SOLID principles', () => {
      const result = generateAgentsMd('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('Single Responsibility');
    });
    it('should contain Donts section', () => {
      const result = generateAgentsMd('general');
      expect(result).toContain("## Don'ts");
      expect(result).toContain('Do NOT install new packages without asking');
      expect(result).toContain('Do NOT commit secrets');
    });
    it('should include Framework Guidelines for flutter', () => {
      const result = generateAgentsMd('flutter');
      expect(result).toContain('## Framework Guidelines');
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
    });
    it('should not include Framework Guidelines for general', () => {
      const result = generateAgentsMd('general');
      expect(result).not.toContain('## Framework Guidelines');
    });
    it('should return non-empty content', () => {
      const result = generateAgentsMd('general');
      expect(result.length).toBeGreaterThan(0);
    });
    it('should be condensed (under 150 lines for general)', () => {
      const result = generateAgentsMd('general');
      const lineCount = result.split('\n').length;
      expect(lineCount).toBeLessThan(150);
    });
  });
});
