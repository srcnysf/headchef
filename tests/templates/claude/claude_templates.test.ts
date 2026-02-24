import { describe, it, expect } from 'vitest';
import { generateClaudeMd } from '../../../src/templates/claude/claude_md.js';
import {
  generateCodeReviewerAgent,
  generateTestWriterAgent,
  generateBugDebuggerAgent,
  generateArchitecturePlannerAgent,
  generateDocsKeeperAgent,
} from '../../../src/templates/claude/agents.js';
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
  describe('generateCodeReviewerAgent', () => {
    it('should contain frontmatter with agent name', () => {
      const result = generateCodeReviewerAgent();
      expect(result).toContain('---');
      expect(result).toContain('name: code-reviewer');
      expect(result).toContain('model: inherit');
    });
    it('should contain SOLID principles from shared content', () => {
      const result = generateCodeReviewerAgent();
      expect(result).toContain('SOLID');
      expect(result).toContain('Single Responsibility');
    });
    it('should contain security review section', () => {
      const result = generateCodeReviewerAgent();
      expect(result).toContain('Security Review');
    });
  });
  describe('generateTestWriterAgent', () => {
    it('should contain frontmatter with agent name', () => {
      const result = generateTestWriterAgent();
      expect(result).toContain('---');
      expect(result).toContain('name: test-writer');
      expect(result).toContain('model: inherit');
    });
    it('should contain Arrange-Act-Assert from shared content', () => {
      const result = generateTestWriterAgent();
      expect(result).toContain('Arrange');
      expect(result).toContain('Act');
      expect(result).toContain('Assert');
    });
  });
  describe('generateBugDebuggerAgent', () => {
    it('should contain frontmatter with agent name', () => {
      const result = generateBugDebuggerAgent();
      expect(result).toContain('---');
      expect(result).toContain('name: bug-debugger');
      expect(result).toContain('model: inherit');
    });
    it('should contain debugging process from shared content', () => {
      const result = generateBugDebuggerAgent();
      expect(result).toContain('Reproduce');
      expect(result).toContain('Root Cause');
    });
  });
  describe('generateArchitecturePlannerAgent', () => {
    it('should contain frontmatter with agent name', () => {
      const result = generateArchitecturePlannerAgent();
      expect(result).toContain('---');
      expect(result).toContain('name: architecture-planner');
      expect(result).toContain('model: inherit');
    });
    it('should contain design patterns from shared content', () => {
      const result = generateArchitecturePlannerAgent();
      expect(result).toContain('Repository Pattern');
      expect(result).toContain('Strategy Pattern');
    });
  });
  describe('generateDocsKeeperAgent', () => {
    it('should contain frontmatter with agent name', () => {
      const result = generateDocsKeeperAgent();
      expect(result).toContain('---');
      expect(result).toContain('name: docs-keeper');
      expect(result).toContain('model: inherit');
    });
    it('should contain documentation types from shared content', () => {
      const result = generateDocsKeeperAgent();
      expect(result).toContain('API Documentation');
      expect(result).toContain('Architecture Decision Records');
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
