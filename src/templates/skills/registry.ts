import codeReviewSkillContent from './code_review.md';
import commitMessageSkillContent from './commit_message.md';
import unitTestSkillContent from './unit_test.md';
import regexGeneratorSkillContent from './regex_generator.md';
import securityAuditSkillContent from './security_audit.md';
import accessibilityAuditSkillContent from './accessibility_audit.md';
import architectureDesignSkillContent from './architecture_design.md';
import codeConverterSkillContent from './code_converter.md';
import promptEnhancerSkillContent from './prompt_enhancer.md';
import diagramGeneratorSkillContent from './diagram_generator.md';
import techReviewSkillContent from './tech_review.md';
import sqlTerminalSkillContent from './sql_terminal.md';
import logicBuilderSkillContent from './logic_builder.md';
import dataVisualizerSkillContent from './data_visualizer.md';
import domainNameGeneratorSkillContent from './domain_name_generator.md';

export interface SkillDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly getContent: () => string;
}

export function getAllSkills(): readonly SkillDefinition[] {
  return [
    {
      id: 'code-review',
      name: 'Code Review',
      description: 'Review code quality with feedback, suggestions, and alternatives.',
      getContent: () => codeReviewSkillContent,
    },
    {
      id: 'commit-message',
      name: 'Commit Message',
      description: 'Generate conventional commit messages from diffs or change descriptions.',
      getContent: () => commitMessageSkillContent,
    },
    {
      id: 'unit-test',
      name: 'Unit Test',
      description: 'Analyze code and generate test cases with test code.',
      getContent: () => unitTestSkillContent,
    },
    {
      id: 'regex-generator',
      name: 'RegEx Generator',
      description: 'Generate regular expressions for matching specific text patterns.',
      getContent: () => regexGeneratorSkillContent,
    },
    {
      id: 'security-audit',
      name: 'Security Audit',
      description: 'Develop cybersecurity strategies and audit data protection.',
      getContent: () => securityAuditSkillContent,
    },
    {
      id: 'accessibility-audit',
      name: 'Accessibility Audit',
      description: 'Check WCAG 2.2 compliance, keyboard navigation, and color contrast.',
      getContent: () => accessibilityAuditSkillContent,
    },
    {
      id: 'architecture-design',
      name: 'Architecture Design',
      description: 'Design system architecture with gap analysis and integration mapping.',
      getContent: () => architectureDesignSkillContent,
    },
    {
      id: 'code-converter',
      name: 'Code Converter',
      description: 'Convert code from any programming language to Python with comments.',
      getContent: () => codeConverterSkillContent,
    },
    {
      id: 'prompt-enhancer',
      name: 'Prompt Enhancer',
      description: 'Transform prompts into more engaging, detailed questions.',
      getContent: () => promptEnhancerSkillContent,
    },
    {
      id: 'diagram-generator',
      name: 'Diagram Generator',
      description: 'Create Graphviz DOT diagrams from descriptions.',
      getContent: () => diagramGeneratorSkillContent,
    },
    {
      id: 'tech-review',
      name: 'Tech Review',
      description: 'In-depth technology reviews with pros, cons, and comparisons.',
      getContent: () => techReviewSkillContent,
    },
    {
      id: 'sql-terminal',
      name: 'SQL Terminal',
      description: 'Act as an interactive SQL terminal for query testing.',
      getContent: () => sqlTerminalSkillContent,
    },
    {
      id: 'logic-builder',
      name: 'Logic Builder',
      description: 'Guide step-by-step logic building for coding problems.',
      getContent: () => logicBuilderSkillContent,
    },
    {
      id: 'data-visualizer',
      name: 'Data Visualizer',
      description: 'Create scientific data visualizations and interactive dashboards.',
      getContent: () => dataVisualizerSkillContent,
    },
    {
      id: 'domain-name-generator',
      name: 'Domain Name Generator',
      description: 'Generate short, unique domain name alternatives.',
      getContent: () => domainNameGeneratorSkillContent,
    },
  ];
}
