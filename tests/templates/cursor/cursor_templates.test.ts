import { describe, it, expect } from 'vitest';
import { generateGeneralMdc, generateFrameworkMdc } from '../../../src/templates/cursor/general_mdc.js';
import { generateCursorIgnore, generateCursorIndexingIgnore } from '../../../src/templates/cursor/ignore_files.js';

describe('cursor templates', () => {
  describe('generateGeneralMdc', () => {
    it('should contain alwaysApply and frontmatter delimiters', () => {
      const result = generateGeneralMdc();
      expect(result).toContain('alwaysApply: true');
      expect(result).toContain('---');
    });
    it('should include base rules content', () => {
      const result = generateGeneralMdc();
      expect(result).toContain('SOLID');
    });
  });
  describe('generateFrameworkMdc', () => {
    it('should contain globs and Flutter for flutter framework', () => {
      const result = generateFrameworkMdc('flutter');
      expect(result).not.toBeNull();
      expect(result).toContain('globs:');
      expect(result).toContain('Flutter');
    });
    it('should return null for general framework', () => {
      const result = generateFrameworkMdc('general');
      expect(result).toBeNull();
    });
    it('should contain correct globs for nextjs', () => {
      const result = generateFrameworkMdc('nextjs');
      expect(result).toContain('*.ts,*.tsx');
    });
  });
  describe('generateCursorIgnore', () => {
    it('should contain node_modules', () => {
      const result = generateCursorIgnore();
      expect(result).toContain('node_modules');
    });
    it('should contain common ignore patterns', () => {
      const result = generateCursorIgnore();
      expect(result).toContain('.env');
      expect(result).toContain('dist/');
    });
  });
  describe('generateCursorIndexingIgnore', () => {
    it('should contain dist', () => {
      const result = generateCursorIndexingIgnore();
      expect(result).toContain('dist');
    });
    it('should contain generated file pattern', () => {
      const result = generateCursorIndexingIgnore();
      expect(result).toContain('*.generated.*');
    });
  });
});
