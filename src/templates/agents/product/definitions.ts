import type { AgentDefinition } from '../registry.js';
import sprintPrioritizerContent from './sprint_prioritizer.md';
import trendResearcherContent from './trend_researcher.md';
import feedbackSynthesizerContent from './feedback_synthesizer.md';

export function getProductDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'sprint-prioritizer',
      name: 'Sprint Prioritizer',
      description: 'Expert product manager specializing in agile sprint planning, feature prioritization, and resource allocation.',
      category: 'product',
      getContent: () => sprintPrioritizerContent,
    },
    {
      id: 'trend-researcher',
      name: 'Trend Researcher',
      description: 'Expert market intelligence analyst specializing in identifying emerging trends, competitive analysis, and opportunity assessment.',
      category: 'product',
      getContent: () => trendResearcherContent,
    },
    {
      id: 'feedback-synthesizer',
      name: 'Feedback Synthesizer',
      description: 'Expert in collecting, analyzing, and synthesizing user feedback from multiple channels to extract actionable product insights.',
      category: 'product',
      getContent: () => feedbackSynthesizerContent,
    },
  ];
}
