import { describe, it, expect } from 'vitest';
import { getCommonIgnorePatterns, getGitignoreAdditions } from '../../../src/templates/shared/ignore_patterns.js';

describe('ignore patterns', () => {
  describe('getCommonIgnorePatterns', () => {
    it('should contain node_modules', () => {
      const result = getCommonIgnorePatterns();
      expect(result).toContain('node_modules/');
    });
    it('should contain env files', () => {
      const result = getCommonIgnorePatterns();
      expect(result).toContain('.env');
    });
    it('should contain DS_Store', () => {
      const result = getCommonIgnorePatterns();
      expect(result).toContain('.DS_Store');
    });
    it('should contain common build directories', () => {
      const result = getCommonIgnorePatterns();
      expect(result).toContain('dist/');
      expect(result).toContain('build/');
    });
  });
  describe('getGitignoreAdditions', () => {
    it('should contain claude settings local path', () => {
      const result = getGitignoreAdditions();
      expect(result).toContain('.claude/settings.local.json');
    });
    it('should contain claude local md path', () => {
      const result = getGitignoreAdditions();
      expect(result).toContain('.claude/CLAUDE.local.md');
    });
  });
});
