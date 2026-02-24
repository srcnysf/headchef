import { describe, it, expect } from 'vitest';
import { getBaseRules } from '../../../src/templates/shared/base_rules.js';

describe('getBaseRules', () => {
  it('should return a non-empty string', () => {
    const result = getBaseRules();
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });
  it('should contain SOLID principles', () => {
    const result = getBaseRules();
    expect(result).toContain('SOLID');
  });
  it('should contain PascalCase and camelCase naming conventions', () => {
    const result = getBaseRules();
    expect(result).toContain('PascalCase');
    expect(result).toContain('camelCase');
  });
  it('should contain Arrange-Act-Assert testing convention', () => {
    const result = getBaseRules();
    expect(result).toContain('Arrange-Act-Assert');
  });
});
