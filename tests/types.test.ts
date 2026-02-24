import { describe, it, expect } from 'vitest';
import { IDE_TYPES, IDE_METADATA, FRAMEWORKS, isValidIdeType, isValidFramework } from '../src/types.js';
import type { IdeType } from '../src/types.js';

describe('types', () => {
  describe('isValidIdeType', () => {
    it('should return true for valid IDE types', () => {
      expect(isValidIdeType('claude')).toBe(true);
      expect(isValidIdeType('cursor')).toBe(true);
      expect(isValidIdeType('windsurf')).toBe(true);
      expect(isValidIdeType('antigravity')).toBe(true);
      expect(isValidIdeType('copilot')).toBe(true);
      expect(isValidIdeType('cline')).toBe(true);
      expect(isValidIdeType('continuedev')).toBe(true);
      expect(isValidIdeType('amazonq')).toBe(true);
      expect(isValidIdeType('jetbrains')).toBe(true);
      expect(isValidIdeType('aider')).toBe(true);
      expect(isValidIdeType('trae')).toBe(true);
      expect(isValidIdeType('augment')).toBe(true);
      expect(isValidIdeType('codex')).toBe(true);
      expect(isValidIdeType('agentsmd')).toBe(true);
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
    it('should export IDE_TYPES array with 14 entries', () => {
      expect(IDE_TYPES).toEqual([
        'claude', 'cursor', 'windsurf', 'antigravity',
        'copilot', 'cline', 'continuedev', 'amazonq',
        'jetbrains', 'aider', 'trae', 'augment',
        'codex', 'agentsmd'
      ]);
      expect(IDE_TYPES).toHaveLength(14);
    });
    it('should export FRAMEWORKS array', () => {
      expect(FRAMEWORKS).toEqual(['general', 'flutter', 'nextjs', 'react', 'python']);
    });
  });
  describe('IDE_METADATA', () => {
    it('should have metadata for every IDE type', () => {
      for (const ideType of IDE_TYPES) {
        expect(IDE_METADATA[ideType]).toBeDefined();
        expect(IDE_METADATA[ideType].displayName).toBeTruthy();
        expect(IDE_METADATA[ideType].description).toBeTruthy();
      }
    });
    it('should have correct display names for known IDEs', () => {
      expect(IDE_METADATA.claude.displayName).toBe('Claude Code');
      expect(IDE_METADATA.cursor.displayName).toBe('Cursor');
      expect(IDE_METADATA.antigravity.displayName).toBe('Google Antigravity');
      expect(IDE_METADATA.copilot.displayName).toBe('GitHub Copilot');
      expect(IDE_METADATA.cline.displayName).toBe('Cline / Roo Code');
    });
    it('should have descriptions referencing config paths', () => {
      expect(IDE_METADATA.claude.description).toContain('CLAUDE.md');
      expect(IDE_METADATA.antigravity.description).toContain('GEMINI.md');
      expect(IDE_METADATA.copilot.description).toContain('copilot-instructions.md');
    });
    it('should cover all 14 IDE types', () => {
      const metadataKeys = Object.keys(IDE_METADATA) as IdeType[];
      expect(metadataKeys).toHaveLength(14);
    });
  });
});
