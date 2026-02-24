import { describe, it, expect } from 'vitest';
import { generateGeminiMd } from '../../../src/templates/antigravity/gemini_md.js';
import { generateCodingStyleRules } from '../../../src/templates/antigravity/rules.js';
import { generatePrReviewerSkill, generateCodeReviewerSkill } from '../../../src/templates/antigravity/skills.js';
import { generateReviewWorkflow } from '../../../src/templates/antigravity/workflows.js';

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
  });
  describe('generateCodingStyleRules', () => {
    it('should contain coding style heading', () => {
      const result = generateCodingStyleRules();
      expect(result).toContain('Coding Style');
    });
    it('should contain naming conventions', () => {
      const result = generateCodingStyleRules();
      expect(result).toContain('Naming Conventions');
    });
  });
  describe('generatePrReviewerSkill', () => {
    it('should contain frontmatter and skill name', () => {
      const result = generatePrReviewerSkill();
      expect(result).toContain('---');
      expect(result).toContain('name: pr-reviewer');
    });
    it('should contain instructions', () => {
      const result = generatePrReviewerSkill();
      expect(result).toContain('Instructions');
    });
  });
  describe('generateCodeReviewerSkill', () => {
    it('should contain skill name', () => {
      const result = generateCodeReviewerSkill();
      expect(result).toContain('name: code-reviewer');
    });
    it('should contain checklist', () => {
      const result = generateCodeReviewerSkill();
      expect(result).toContain('Checklist');
    });
  });
  describe('generateReviewWorkflow', () => {
    it('should contain review-related content', () => {
      const result = generateReviewWorkflow();
      expect(result.toLowerCase()).toContain('review');
    });
    it('should contain workflow steps', () => {
      const result = generateReviewWorkflow();
      expect(result).toContain('npm test');
      expect(result).toContain('git diff');
    });
  });
});
