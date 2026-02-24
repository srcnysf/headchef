import { describe, it, expect } from 'vitest';
import { generateCodexConfig } from '../../../src/templates/codex/config_toml.js';

describe('codex templates', () => {
  describe('generateCodexConfig', () => {
    it('should contain TOML comment header', () => {
      const result = generateCodexConfig();
      expect(result).toContain('# Codex CLI');
    });
    it('should reference AGENTS.md as doc fallback', () => {
      const result = generateCodexConfig();
      expect(result).toContain('AGENTS.md');
    });
    it('should return non-empty content', () => {
      const result = generateCodexConfig();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should contain model configuration', () => {
      const result = generateCodexConfig();
      expect(result).toContain('model');
    });
  });
});
