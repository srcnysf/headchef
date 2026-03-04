import type { AgentDefinition } from '../registry.js';
import supportResponderContent from './support_responder.md';
import analyticsReporterContent from './analytics_reporter.md';
import financeTrackerContent from './finance_tracker.md';
import infrastructureMaintainerContent from './infrastructure_maintainer.md';
import legalComplianceCheckerContent from './legal_compliance_checker.md';
import executiveSummaryGeneratorContent from './executive_summary_generator.md';

export function getSupportDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'support-responder',
      name: 'Support Responder',
      description:
        'Expert customer support specialist delivering exceptional customer service, issue resolution, and user experience optimization.',
      category: 'support',
      getContent: () => supportResponderContent,
    },
    {
      id: 'analytics-reporter',
      name: 'Analytics Reporter',
      description:
        'Expert data analyst transforming raw data into actionable business insights through dashboards, statistical analysis, and KPI tracking.',
      category: 'support',
      getContent: () => analyticsReporterContent,
    },
    {
      id: 'finance-tracker',
      name: 'Finance Tracker',
      description:
        'Expert financial analyst specializing in financial planning, budget management, and business performance analysis.',
      category: 'support',
      getContent: () => financeTrackerContent,
    },
    {
      id: 'infrastructure-maintainer',
      name: 'Infrastructure Maintainer',
      description:
        'Expert infrastructure specialist focused on system reliability, performance optimization, and technical operations management.',
      category: 'support',
      getContent: () => infrastructureMaintainerContent,
    },
    {
      id: 'legal-compliance-checker',
      name: 'Legal Compliance Checker',
      description:
        'Expert legal and compliance specialist ensuring business operations comply with relevant laws, regulations, and industry standards.',
      category: 'support',
      getContent: () => legalComplianceCheckerContent,
    },
    {
      id: 'executive-summary-generator',
      name: 'Executive Summary Generator',
      description:
        'Consultant-grade specialist transforming complex business inputs into concise, actionable executive summaries for C-suite decision-makers.',
      category: 'support',
      getContent: () => executiveSummaryGeneratorContent,
    },
  ];
}
