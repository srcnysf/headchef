import { describe, it, expect } from 'vitest';
import { getFlutterRules } from '../../../src/templates/shared/flutter_rules.js';
import { getNextjsRules } from '../../../src/templates/shared/nextjs_rules.js';
import { getReactRules } from '../../../src/templates/shared/react_rules.js';
import { getPythonRules } from '../../../src/templates/shared/python_rules.js';

describe('framework rules', () => {
  describe('getFlutterRules', () => {
    it('should return a non-empty string', () => {
      const result = getFlutterRules();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should contain Flutter-specific keywords', () => {
      const result = getFlutterRules();
      expect(result).toContain('Flutter');
      expect(result).toContain('Dart');
      expect(result).toContain('Widget');
    });
  });
  describe('getNextjsRules', () => {
    it('should return a non-empty string', () => {
      const result = getNextjsRules();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should contain Next.js-specific keywords', () => {
      const result = getNextjsRules();
      expect(result).toContain('Next.js');
      expect(result).toContain('Server Component');
    });
  });
  describe('getReactRules', () => {
    it('should return a non-empty string', () => {
      const result = getReactRules();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should contain React-specific keywords', () => {
      const result = getReactRules();
      expect(result).toContain('React');
      expect(result).toContain('hook');
    });
  });
  describe('getPythonRules', () => {
    it('should return a non-empty string', () => {
      const result = getPythonRules();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should contain Python-specific keywords', () => {
      const result = getPythonRules();
      expect(result).toContain('Python');
      expect(result).toContain('PEP');
    });
  });
});
