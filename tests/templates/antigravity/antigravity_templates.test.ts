import { describe, it, expect } from 'vitest';
import { generateGeminiMd } from '../../../src/templates/antigravity/gemini_md.js';
import { generateCodingStyleRules } from '../../../src/templates/antigravity/rules.js';
import {
  generateCodeReviewerSkill,
  generateTestWriterSkill,
  generateBugDebuggerSkill,
  generateArchitecturePlannerSkill,
  generateDocsKeeperSkill,
} from '../../../src/templates/antigravity/skills.js';
import { generateReviewWorkflow } from '../../../src/templates/antigravity/workflows.js';

describe('antigravity templates', () => {
  describe('generateGeminiMd', () => {
    it('should contain Flutter for flutter framework', () => {
      const result = generateGeminiMd('flutter');
      expect(result).toContain('Flutter');
    });
    it('should contain project rules heading', () => {
      const result = generateGeminiMd('general');
      expect(result).toContain('# Project Rules');
    });
    it('should include base rules for all frameworks', () => {
      const result = generateGeminiMd('general');
      expect(result).toContain('SOLID');
    });
  });
  describe('generateCodingStyleRules', () => {
    it('should contain coding style heading', () => {
      const result = generateCodingStyleRules();
      expect(result).toContain('Coding Style');
    });
    it('should contain naming conventions', () => {
      const result = generateCodingStyleRules();
      expect(result).toContain('Naming Conventions');
    });
  });
  describe('generateCodeReviewerSkill', () => {
    it('should contain frontmatter and skill name', () => {
      const result = generateCodeReviewerSkill();
      expect(result).toContain('---');
      expect(result).toContain('name: code-reviewer');
    });
    it('should contain skill title heading', () => {
      const result = generateCodeReviewerSkill();
      expect(result).toContain('# Code Reviewer Skill');
    });
    it('should contain SOLID principles from shared content', () => {
      const result = generateCodeReviewerSkill();
      expect(result).toContain('SOLID');
      expect(result).toContain('Single Responsibility');
    });
  });
  describe('generateTestWriterSkill', () => {
    it('should contain frontmatter and skill name', () => {
      const result = generateTestWriterSkill();
      expect(result).toContain('---');
      expect(result).toContain('name: test-writer');
    });
    it('should contain skill title heading', () => {
      const result = generateTestWriterSkill();
      expect(result).toContain('# Test Writer Skill');
    });
    it('should contain Arrange-Act-Assert from shared content', () => {
      const result = generateTestWriterSkill();
      expect(result).toContain('Arrange');
      expect(result).toContain('Assert');
    });
  });
  describe('generateBugDebuggerSkill', () => {
    it('should contain frontmatter and skill name', () => {
      const result = generateBugDebuggerSkill();
      expect(result).toContain('---');
      expect(result).toContain('name: bug-debugger');
    });
    it('should contain skill title heading', () => {
      const result = generateBugDebuggerSkill();
      expect(result).toContain('# Bug Debugger Skill');
    });
    it('should contain debugging process from shared content', () => {
      const result = generateBugDebuggerSkill();
      expect(result).toContain('Reproduce');
      expect(result).toContain('Root Cause');
    });
  });
  describe('generateArchitecturePlannerSkill', () => {
    it('should contain frontmatter and skill name', () => {
      const result = generateArchitecturePlannerSkill();
      expect(result).toContain('---');
      expect(result).toContain('name: architecture-planner');
    });
    it('should contain skill title heading', () => {
      const result = generateArchitecturePlannerSkill();
      expect(result).toContain('# Architecture Planner Skill');
    });
    it('should contain design patterns from shared content', () => {
      const result = generateArchitecturePlannerSkill();
      expect(result).toContain('Repository Pattern');
      expect(result).toContain('Strategy Pattern');
    });
  });
  describe('generateDocsKeeperSkill', () => {
    it('should contain frontmatter and skill name', () => {
      const result = generateDocsKeeperSkill();
      expect(result).toContain('---');
      expect(result).toContain('name: docs-keeper');
    });
    it('should contain skill title heading', () => {
      const result = generateDocsKeeperSkill();
      expect(result).toContain('# Docs Keeper Skill');
    });
    it('should contain documentation types from shared content', () => {
      const result = generateDocsKeeperSkill();
      expect(result).toContain('API Documentation');
      expect(result).toContain('Architecture Decision Records');
    });
  });
  describe('generateReviewWorkflow', () => {
    it('should contain review-related content', () => {
      const result = generateReviewWorkflow();
      expect(result.toLowerCase()).toContain('review');
    });
    it('should contain workflow steps', () => {
      const result = generateReviewWorkflow();
      expect(result).toContain('npm test');
      expect(result).toContain('git diff');
    });
  });
});
