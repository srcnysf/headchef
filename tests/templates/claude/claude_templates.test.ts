import { describe, it, expect } from 'vitest';
import { generateClaudeMd } from '../../../src/templates/claude/claude_md.js';
import { generateClaudeSettings } from '../../../src/templates/claude/settings.js';
import { generatePrReviewerAgent, generateCodeReviewerAgent } from '../../../src/templates/claude/agents.js';
import { generateReviewCommand } from '../../../src/templates/claude/commands.js';

describe('claude templates', () => {
  describe('generateClaudeMd', () => {
    it('should contain project heading and Flutter for flutter framework', () => {
      const result = generateClaudeMd('flutter');
      expect(result).toContain('# Project');
      expect(result).toContain('Flutter');
    });
    it('should contain project heading but not Flutter for general framework', () => {
      const result = generateClaudeMd('general');
      expect(result).toContain('# Project');
      expect(result).not.toContain('Flutter');
    });
    it('should include base rules content', () => {
      const result = generateClaudeMd('general');
      expect(result).toContain('SOLID');
      expect(result).toContain('PascalCase');
    });
    it('should include framework-specific rules for nextjs', () => {
      const result = generateClaudeMd('nextjs');
      expect(result).toContain('Next.js');
      expect(result).toContain('Server Component');
    });
  });
  describe('generateClaudeSettings', () => {
    it('should return valid JSON with permissions key', () => {
      const result = generateClaudeSettings();
      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('permissions');
      expect(parsed.permissions).toHaveProperty('allow');
    });
  });
  describe('generatePrReviewerAgent', () => {
    it('should contain frontmatter and agent name', () => {
      const result = generatePrReviewerAgent();
      expect(result).toContain('---');
      expect(result).toContain('name: pr-reviewer');
    });
    it('should contain review process sections', () => {
      const result = generatePrReviewerAgent();
      expect(result).toContain('Change Analysis');
      expect(result).toContain('Bug Detection');
    });
  });
  describe('generateCodeReviewerAgent', () => {
    it('should contain agent name', () => {
      const result = generateCodeReviewerAgent();
      expect(result).toContain('name: code-reviewer');
    });
    it('should contain review checklist', () => {
      const result = generateCodeReviewerAgent();
      expect(result).toContain('Review Checklist');
    });
  });
  describe('generateReviewCommand', () => {
    it('should contain review-related content', () => {
      const result = generateReviewCommand();
      expect(result).toContain('review');
    });
    it('should contain frontmatter with allowed tools', () => {
      const result = generateReviewCommand();
      expect(result).toContain('---');
      expect(result).toContain('allowed-tools');
    });
  });
});
