import { describe, it, expect } from 'vitest';
import { generateClinerules, generateRooGeneralRules, generateRooFrameworkRules } from '../../../src/templates/cline/rules.js';

describe('cline templates', () => {
  describe('generateClinerules', () => {
    it('should return non-empty content', () => {
      const result = generateClinerules('general');
      expect(result.length).toBeGreaterThan(0);
    });
    it('should include base rules content', () => {
      const result = generateClinerules('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('PascalCase');
    });
    it('should include Flutter rules for flutter framework', () => {
      const result = generateClinerules('flutter');
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
    });
    it('should not include Flutter rules for general framework', () => {
      const result = generateClinerules('general');
      expect(result).not.toContain('Flutter');
    });
  });
  describe('generateRooGeneralRules', () => {
    it('should return non-empty content', () => {
      const result = generateRooGeneralRules();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should include base rules content', () => {
      const result = generateRooGeneralRules();
      expect(result).toContain('SOLID');
    });
  });
  describe('generateRooFrameworkRules', () => {
    it('should return null for general framework', () => {
      const result = generateRooFrameworkRules('general');
      expect(result).toBeNull();
    });
    it('should return Flutter rules for flutter framework', () => {
      const result = generateRooFrameworkRules('flutter');
      expect(result).not.toBeNull();
      expect(result).toContain('Flutter');
    });
    it('should return React rules for react framework', () => {
      const result = generateRooFrameworkRules('react');
      expect(result).not.toBeNull();
      expect(result).toContain('React');
    });
  });
});
