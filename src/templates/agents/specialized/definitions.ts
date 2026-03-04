import type { AgentDefinition } from '../registry.js';
import agentsOrchestratorContent from './agents_orchestrator.md';
import dataAnalyticsReporterContent from './data_analytics_reporter.md';
import lspIndexEngineerContent from './lsp_index_engineer.md';
import salesDataExtractionAgentContent from './sales_data_extraction_agent.md';
import dataConsolidationAgentContent from './data_consolidation_agent.md';
import reportDistributionAgentContent from './report_distribution_agent.md';

export function getSpecializedDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'agents-orchestrator',
      name: 'Agents Orchestrator',
      description:
        'Autonomous pipeline manager that orchestrates the entire development workflow from specification to production-ready implementation.',
      category: 'specialized',
      getContent: () => agentsOrchestratorContent,
    },
    {
      id: 'data-analytics-reporter',
      name: 'Data Analytics Reporter',
      description:
        'Expert data analyst transforming raw data into actionable business insights through dashboards, statistical analysis, and KPI tracking.',
      category: 'specialized',
      getContent: () => dataAnalyticsReporterContent,
    },
    {
      id: 'lsp-index-engineer',
      name: 'LSP/Index Engineer',
      description:
        'Language Server Protocol specialist building unified code intelligence systems through LSP client orchestration and semantic indexing.',
      category: 'specialized',
      getContent: () => lspIndexEngineerContent,
    },
    {
      id: 'sales-data-extraction-agent',
      name: 'Sales Data Extraction Agent',
      description:
        'AI agent specialized in monitoring Excel files and extracting key sales metrics for internal live reporting.',
      category: 'specialized',
      getContent: () => salesDataExtractionAgentContent,
    },
    {
      id: 'data-consolidation-agent',
      name: 'Data Consolidation Agent',
      description:
        'AI agent that consolidates extracted sales data into live reporting dashboards with territory, rep, and pipeline summaries.',
      category: 'specialized',
      getContent: () => dataConsolidationAgentContent,
    },
    {
      id: 'report-distribution-agent',
      name: 'Report Distribution Agent',
      description:
        'AI agent that automates distribution of consolidated sales reports to representatives based on territorial parameters.',
      category: 'specialized',
      getContent: () => reportDistributionAgentContent,
    },
  ];
}
