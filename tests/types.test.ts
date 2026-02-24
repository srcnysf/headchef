import { describe, it, expect } from 'vitest';
import { IDE_TYPES, FRAMEWORKS, isValidIdeType, isValidFramework } from '../src/types.js';

describe('types', () => {
  describe('isValidIdeType', () => {
    it('should return true for valid IDE types', () => {
      expect(isValidIdeType('claude')).toBe(true);
      expect(isValidIdeType('cursor')).toBe(true);
      expect(isValidIdeType('windsurf')).toBe(true);
      expect(isValidIdeType('antigravity')).toBe(true);
    });
    it('should return false for invalid IDE types', () => {
      expect(isValidIdeType('vscode')).toBe(false);
      expect(isValidIdeType('')).toBe(false);
    });
  });
  describe('isValidFramework', () => {
    it('should return true for valid frameworks', () => {
      expect(isValidFramework('flutter')).toBe(true);
      expect(isValidFramework('nextjs')).toBe(true);
      expect(isValidFramework('react')).toBe(true);
      expect(isValidFramework('python')).toBe(true);
      expect(isValidFramework('general')).toBe(true);
    });
    it('should return false for invalid frameworks', () => {
      expect(isValidFramework('angular')).toBe(false);
    });
  });
  describe('constants', () => {
    it('should export IDE_TYPES array', () => {
      expect(IDE_TYPES).toEqual(['claude', 'cursor', 'windsurf', 'antigravity']);
    });
    it('should export FRAMEWORKS array', () => {
      expect(FRAMEWORKS).toEqual(['general', 'flutter', 'nextjs', 'react', 'python']);
    });
  });
});
