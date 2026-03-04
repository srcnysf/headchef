import { describe, it, expect } from 'vitest';
import { loadAgentsByCategories, loadAgentsByCategory } from '../../../src/templates/agents/registry.js';

describe('agent registry', () => {
  describe('core agents', () => {
    const agents = loadAgentsByCategory('core');

    it('should return 6 core agents', () => {
      expect(agents).toHaveLength(6);
    });

    it('should include all core agent ids', () => {
      const ids = agents.map(a => a.id);
      expect(ids).toContain('headchef-orchestrator');
      expect(ids).toContain('code-reviewer');
      expect(ids).toContain('test-writer');
      expect(ids).toContain('bug-debugger');
      expect(ids).toContain('architecture-planner');
      expect(ids).toContain('docs-keeper');
    });

    it('should return non-empty content for all agents', () => {
      for (const agent of agents) {
        const content = agent.getContent();
        expect(content).toBeTruthy();
        expect(content.length).toBeGreaterThan(100);
      }
    });

    it('should contain SOLID in code-reviewer', () => {
      const content = agents.find(a => a.id === 'code-reviewer')!.getContent();
      expect(content).toContain('SOLID');
      expect(content).toContain('Single Responsibility');
      expect(content).toContain('Security Review');
    });

    it('should contain Arrange-Act-Assert in test-writer', () => {
      const content = agents.find(a => a.id === 'test-writer')!.getContent();
      expect(content).toContain('Arrange');
      expect(content).toContain('Act');
      expect(content).toContain('Assert');
    });

    it('should contain debugging process in bug-debugger', () => {
      const content = agents.find(a => a.id === 'bug-debugger')!.getContent();
      expect(content).toContain('Reproduce');
      expect(content).toContain('Root Cause');
    });

    it('should contain design patterns in architecture-planner', () => {
      const content = agents.find(a => a.id === 'architecture-planner')!.getContent();
      expect(content).toContain('Repository Pattern');
      expect(content).toContain('Strategy Pattern');
    });

    it('should contain doc types in docs-keeper', () => {
      const content = agents.find(a => a.id === 'docs-keeper')!.getContent();
      expect(content).toContain('API Documentation');
      expect(content).toContain('Architecture Decision Records');
    });

    it('should not contain frontmatter in raw content', () => {
      for (const agent of agents) {
        expect(agent.getContent()).not.toMatch(/^---/);
      }
    });
  });

  describe('loadAgentsByCategories', () => {
    it('should load agents from multiple categories', () => {
      const agents = loadAgentsByCategories(['core', 'engineering']);
      expect(agents.length).toBeGreaterThan(5);
    });

    it('should return only core agents when only core selected', () => {
      const agents = loadAgentsByCategories(['core']);
      expect(agents).toHaveLength(6);
      for (const agent of agents) {
        expect(agent.category).toBe('core');
      }
    });
  });
});
