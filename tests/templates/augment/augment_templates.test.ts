import { describe, it, expect } from 'vitest';
import { generateAugmentRules } from '../../../src/templates/augment/rules.js';

describe('augment templates', () => {
  describe('generateAugmentRules', () => {
    it('should start with YAML frontmatter', () => {
      const result = generateAugmentRules('general');
      expect(result.startsWith('---')).toBe(true);
    });
    it('should contain description in frontmatter', () => {
      const result = generateAugmentRules('general');
      expect(result).toContain('description: "Coding standards and conventions"');
    });
    it('should contain globs in frontmatter', () => {
      const result = generateAugmentRules('general');
      expect(result).toContain('globs: "**/*"');
    });
    it('should contain closing frontmatter delimiter', () => {
      const result = generateAugmentRules('general');
      const lines = result.split('\n');
      const frontmatterCloseIndex = lines.indexOf('---', 1);
      expect(frontmatterCloseIndex).toBeGreaterThan(0);
    });
    it('should contain Coding Standards heading', () => {
      const result = generateAugmentRules('general');
      expect(result).toContain('# Coding Standards');
    });
    it('should include base rules content', () => {
      const result = generateAugmentRules('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('PascalCase');
    });
    it('should include Flutter rules for flutter framework', () => {
      const result = generateAugmentRules('flutter');
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
    });
    it('should not include Flutter rules for general framework', () => {
      const result = generateAugmentRules('general');
      expect(result).not.toContain('Flutter');
    });
    it('should return non-empty content', () => {
      const result = generateAugmentRules('general');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
