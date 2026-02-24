import { describe, it, expect } from 'vitest';
import { getCodeReviewerContent } from '../../../src/templates/agents/code_reviewer.js';
import { getTestWriterContent } from '../../../src/templates/agents/test_writer.js';
import { getBugDebuggerContent } from '../../../src/templates/agents/bug_debugger.js';
import { getArchitecturePlannerContent } from '../../../src/templates/agents/architecture_planner.js';
import { getDocsKeeperContent } from '../../../src/templates/agents/docs_keeper.js';

describe('shared agent templates', () => {
  describe('getCodeReviewerContent', () => {
    it('should return non-empty string', () => {
      const content = getCodeReviewerContent();
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
    });
    it('should contain SOLID principles', () => {
      const content = getCodeReviewerContent();
      expect(content).toContain('SOLID');
      expect(content).toContain('Single Responsibility');
      expect(content).toContain('Dependency Inversion');
    });
    it('should contain security review section', () => {
      const content = getCodeReviewerContent();
      expect(content).toContain('Security Review');
      expect(content).toContain('hardcoded secrets');
    });
    it('should contain output format sections', () => {
      const content = getCodeReviewerContent();
      expect(content).toContain('Critical Issues');
      expect(content).toContain('Major Concerns');
      expect(content).toContain('Minor Suggestions');
    });
    it('should not contain frontmatter', () => {
      const content = getCodeReviewerContent();
      expect(content).not.toMatch(/^---/);
    });
  });
  describe('getTestWriterContent', () => {
    it('should return non-empty string', () => {
      const content = getTestWriterContent();
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
    });
    it('should contain Arrange-Act-Assert pattern', () => {
      const content = getTestWriterContent();
      expect(content).toContain('Arrange');
      expect(content).toContain('Act');
      expect(content).toContain('Assert');
    });
    it('should contain variable naming conventions', () => {
      const content = getTestWriterContent();
      expect(content).toContain('inputX');
      expect(content).toContain('mockX');
      expect(content).toContain('actualX');
      expect(content).toContain('expectedX');
    });
    it('should contain test types', () => {
      const content = getTestWriterContent();
      expect(content).toContain('Unit Tests');
      expect(content).toContain('Integration Tests');
      expect(content).toContain('Regression Tests');
    });
    it('should contain test doubles section', () => {
      const content = getTestWriterContent();
      expect(content).toContain('Mocks');
      expect(content).toContain('Stubs');
      expect(content).toContain('Spies');
    });
  });
  describe('getBugDebuggerContent', () => {
    it('should return non-empty string', () => {
      const content = getBugDebuggerContent();
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
    });
    it('should contain debugging process steps', () => {
      const content = getBugDebuggerContent();
      expect(content).toContain('Reproduce');
      expect(content).toContain('Isolate');
      expect(content).toContain('Root Cause');
      expect(content).toContain('Propose Fix');
      expect(content).toContain('Verify');
    });
    it('should contain common bug patterns', () => {
      const content = getBugDebuggerContent();
      expect(content).toContain('Null reference');
      expect(content).toContain('Race conditions');
      expect(content).toContain('Off-by-one');
    });
    it('should contain investigation techniques', () => {
      const content = getBugDebuggerContent();
      expect(content).toContain('Log analysis');
      expect(content).toContain('Breakpoints');
      expect(content).toContain('Git bisect');
    });
    it('should contain output format', () => {
      const content = getBugDebuggerContent();
      expect(content).toContain('Bug Report');
      expect(content).toContain('Summary');
      expect(content).toContain('Proposed Fix');
    });
  });
  describe('getArchitecturePlannerContent', () => {
    it('should return non-empty string', () => {
      const content = getArchitecturePlannerContent();
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
    });
    it('should contain design process steps', () => {
      const content = getArchitecturePlannerContent();
      expect(content).toContain('Understand Requirements');
      expect(content).toContain('Explore Approaches');
      expect(content).toContain('Evaluate Trade-offs');
      expect(content).toContain('Propose Design');
    });
    it('should contain design patterns', () => {
      const content = getArchitecturePlannerContent();
      expect(content).toContain('Repository Pattern');
      expect(content).toContain('Factory Pattern');
      expect(content).toContain('Strategy Pattern');
      expect(content).toContain('Observer Pattern');
    });
    it('should contain architecture principles', () => {
      const content = getArchitecturePlannerContent();
      expect(content).toContain('Separation of concerns');
      expect(content).toContain('Dependency inversion');
      expect(content).toContain('Interface-driven design');
    });
    it('should contain technology evaluation criteria', () => {
      const content = getArchitecturePlannerContent();
      expect(content).toContain('Maturity');
      expect(content).toContain('Community');
      expect(content).toContain('Performance');
    });
  });
  describe('getDocsKeeperContent', () => {
    it('should return non-empty string', () => {
      const content = getDocsKeeperContent();
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
    });
    it('should contain documentation types', () => {
      const content = getDocsKeeperContent();
      expect(content).toContain('API Documentation');
      expect(content).toContain('Architecture Documentation');
      expect(content).toContain('Setup Guides');
      expect(content).toContain('Architecture Decision Records');
      expect(content).toContain('Changelogs');
    });
    it('should contain writing standards', () => {
      const content = getDocsKeeperContent();
      expect(content).toContain('Clear and concise');
      expect(content).toContain('Present tense');
      expect(content).toContain('Active voice');
    });
    it('should contain documentation workflow', () => {
      const content = getDocsKeeperContent();
      expect(content).toContain('Identify');
      expect(content).toContain('Write');
      expect(content).toContain('Review');
      expect(content).toContain('Maintain');
    });
    it('should contain quality checklist', () => {
      const content = getDocsKeeperContent();
      expect(content).toContain('Quality Checklist');
      expect(content).toContain('Technically accurate');
    });
    it('should contain proactive behavior section', () => {
      const content = getDocsKeeperContent();
      expect(content).toContain('Proactive Behavior');
      expect(content).toContain('undocumented');
    });
  });
});
