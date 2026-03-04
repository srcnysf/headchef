import { describe, it, expect } from 'vitest';
import { generateClaudeMd } from '../../../src/templates/claude/claude_md.js';
import { wrapAsClaudeAgent } from '../../../src/templates/claude/agent_wrapper.js';
import { wrapAsClaudeCommand } from '../../../src/templates/claude/skill_wrapper.js';
import { loadAgentsByCategory } from '../../../src/templates/agents/registry.js';
import { getAllSkills } from '../../../src/templates/skills/registry.js';
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
  describe('wrapAsClaudeAgent', () => {
    const agents = loadAgentsByCategory('core');
    const codeReviewer = agents.find(a => a.id === 'code-reviewer')!;

    it('should contain frontmatter with agent name', () => {
      const result = wrapAsClaudeAgent(codeReviewer);
      expect(result).toContain('---');
      expect(result).toContain('name: code-reviewer');
      expect(result).toContain('model: inherit');
    });
    it('should contain SOLID principles from shared content', () => {
      const result = wrapAsClaudeAgent(codeReviewer);
      expect(result).toContain('SOLID');
      expect(result).toContain('Single Responsibility');
    });
  });
  describe('wrapAsClaudeCommand', () => {
    const skills = getAllSkills();
    const codeReview = skills.find(s => s.id === 'code-review')!;

    it('should wrap skill with frontmatter', () => {
      const result = wrapAsClaudeCommand(codeReview);
      expect(result).toContain('---');
      expect(result).toContain('description:');
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
