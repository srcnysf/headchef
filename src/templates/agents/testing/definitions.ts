import type { AgentDefinition } from '../registry.js';
import evidenceCollectorContent from './evidence_collector.md';
import realityCheckerContent from './reality_checker.md';
import testResultsAnalyzerContent from './test_results_analyzer.md';
import performanceBenchmarkerContent from './performance_benchmarker.md';
import apiTesterContent from './api_tester.md';
import toolEvaluatorContent from './tool_evaluator.md';
import workflowOptimizerContent from './workflow_optimizer.md';

export function getTestingDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'evidence-collector',
      name: 'Evidence Collector',
      description: 'Screenshot-obsessed, fantasy-allergic QA specialist. Default to finding 3-5 issues, requires visual proof for everything.',
      category: 'testing',
      getContent: () => evidenceCollectorContent,
    },
    {
      id: 'reality-checker',
      name: 'Reality Checker',
      description: 'Stops fantasy approvals, evidence-based certification. Default to "NEEDS WORK", requires overwhelming proof for production readiness.',
      category: 'testing',
      getContent: () => realityCheckerContent,
    },
    {
      id: 'test-results-analyzer',
      name: 'Test Results Analyzer',
      description: 'Expert test analysis specialist focused on comprehensive test result evaluation, quality metrics analysis, and actionable insight generation.',
      category: 'testing',
      getContent: () => testResultsAnalyzerContent,
    },
    {
      id: 'performance-benchmarker',
      name: 'Performance Benchmarker',
      description: 'Expert performance testing and optimization specialist focused on measuring, analyzing, and improving system performance.',
      category: 'testing',
      getContent: () => performanceBenchmarkerContent,
    },
    {
      id: 'api-tester',
      name: 'API Tester',
      description: 'Expert API testing specialist focused on comprehensive API validation, performance testing, and quality assurance.',
      category: 'testing',
      getContent: () => apiTesterContent,
    },
    {
      id: 'tool-evaluator',
      name: 'Tool Evaluator',
      description: 'Expert technology assessment specialist focused on evaluating, testing, and recommending tools and platforms for business use.',
      category: 'testing',
      getContent: () => toolEvaluatorContent,
    },
    {
      id: 'workflow-optimizer',
      name: 'Workflow Optimizer',
      description: 'Expert process improvement specialist focused on analyzing, optimizing, and automating workflows for maximum productivity.',
      category: 'testing',
      getContent: () => workflowOptimizerContent,
    },
  ];
}
