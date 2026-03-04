import { describe, it, expect } from 'vitest';
import { generateGeminiMd } from '../../../src/templates/antigravity/gemini_md.js';
import { wrapAsAntigravitySkill } from '../../../src/templates/antigravity/agent_wrapper.js';
import { loadAgentsByCategory } from '../../../src/templates/agents/registry.js';

describe('antigravity templates', () => {
  describe('generateGeminiMd', () => {
    it('should contain Flutter for flutter framework', () => {
      const result = generateGeminiMd('flutter');
      expect(result).toContain('Flutter');
    });
    it('should contain project rules heading', () => {
      const result = generateGeminiMd('general');
      expect(result).toContain('# Project Rules');
    });
    it('should include base rules for all frameworks', () => {
      const result = generateGeminiMd('general');
      expect(result).toContain('SOLID');
    });
    it('should contain coding style content', () => {
      const result = generateGeminiMd('general');
      expect(result).toContain('Nomenclature');
      expect(result).toContain('Functions');
    });
  });
  describe('wrapAsAntigravitySkill', () => {
    const agents = loadAgentsByCategory('core');
    const codeReviewer = agents.find(a => a.id === 'code-reviewer')!;

    it('should contain frontmatter and skill name', () => {
      const result = wrapAsAntigravitySkill(codeReviewer);
      expect(result).toContain('---');
      expect(result).toContain('name: code-reviewer');
    });
    it('should contain SOLID principles from shared content', () => {
      const result = wrapAsAntigravitySkill(codeReviewer);
      expect(result).toContain('SOLID');
      expect(result).toContain('Single Responsibility');
    });
  });
});
