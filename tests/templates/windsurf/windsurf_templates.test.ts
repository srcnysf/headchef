import { describe, it, expect } from 'vitest';
import { generateWindsurfGeneralMd, generateWindsurfFrameworkMd } from '../../../src/templates/windsurf/general_md.js';
import { generateCodeiumIgnore } from '../../../src/templates/windsurf/ignore_file.js';

describe('windsurf templates', () => {
  describe('generateWindsurfGeneralMd', () => {
    it('should not start with frontmatter delimiters', () => {
      const result = generateWindsurfGeneralMd();
      expect(result.startsWith('---')).toBe(false);
    });
    it('should contain coding standards heading', () => {
      const result = generateWindsurfGeneralMd();
      expect(result).toContain('# Coding Standards');
    });
    it('should include base rules content', () => {
      const result = generateWindsurfGeneralMd();
      expect(result).toContain('SOLID');
    });
  });
  describe('generateWindsurfFrameworkMd', () => {
    it('should contain Flutter for flutter framework', () => {
      const result = generateWindsurfFrameworkMd('flutter');
      expect(result).not.toBeNull();
      expect(result).toContain('Flutter');
    });
    it('should return null for general framework', () => {
      const result = generateWindsurfFrameworkMd('general');
      expect(result).toBeNull();
    });
    it('should contain framework heading for react', () => {
      const result = generateWindsurfFrameworkMd('react');
      expect(result).toContain('# React Conventions');
    });
  });
  describe('generateCodeiumIgnore', () => {
    it('should contain node_modules', () => {
      const result = generateCodeiumIgnore();
      expect(result).toContain('node_modules');
    });
    it('should contain common ignore patterns', () => {
      const result = generateCodeiumIgnore();
      expect(result).toContain('.env');
      expect(result).toContain('.DS_Store');
    });
  });
});
