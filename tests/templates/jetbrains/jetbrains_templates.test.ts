import { describe, it, expect } from 'vitest';
import { generateJetbrainsRules } from '../../../src/templates/jetbrains/rules.js';

describe('jetbrains templates', () => {
  describe('generateJetbrainsRules', () => {
    it('should contain Coding Standards heading', () => {
      const result = generateJetbrainsRules('general');
      expect(result).toContain('# Coding Standards');
    });
    it('should not start with frontmatter delimiters', () => {
      const result = generateJetbrainsRules('general');
      expect(result.startsWith('---')).toBe(false);
    });
    it('should include base rules content', () => {
      const result = generateJetbrainsRules('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('PascalCase');
    });
    it('should include Flutter rules for flutter framework', () => {
      const result = generateJetbrainsRules('flutter');
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
    });
    it('should not include Flutter rules for general framework', () => {
      const result = generateJetbrainsRules('general');
      expect(result).not.toContain('Flutter');
    });
    it('should return non-empty content', () => {
      const result = generateJetbrainsRules('general');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
