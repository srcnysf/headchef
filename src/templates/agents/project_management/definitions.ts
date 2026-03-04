import type { AgentDefinition } from '../registry.js';
import studioProducerContent from './studio_producer.md';
import projectShepherdContent from './project_shepherd.md';
import studioOperationsContent from './studio_operations.md';
import experimentTrackerContent from './experiment_tracker.md';
import seniorProjectManagerContent from './senior_project_manager.md';

export function getProjectManagementDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'studio-producer',
      name: 'Studio Producer',
      description: 'Senior strategic leader specializing in high-level creative and technical project orchestration, resource allocation, and multi-project portfolio management.',
      category: 'project-management',
      getContent: () => studioProducerContent,
    },
    {
      id: 'project-shepherd',
      name: 'Project Shepherd',
      description: 'Expert project manager specializing in cross-functional project coordination, timeline management, and stakeholder alignment.',
      category: 'project-management',
      getContent: () => projectShepherdContent,
    },
    {
      id: 'studio-operations',
      name: 'Studio Operations',
      description: 'Expert operations manager specializing in day-to-day studio efficiency, process optimization, and resource coordination.',
      category: 'project-management',
      getContent: () => studioOperationsContent,
    },
    {
      id: 'experiment-tracker',
      name: 'Experiment Tracker',
      description: 'Expert project manager specializing in experiment design, execution tracking, and data-driven decision making.',
      category: 'project-management',
      getContent: () => experimentTrackerContent,
    },
    {
      id: 'senior-project-manager',
      name: 'Senior Project Manager',
      description: 'Converts specs to tasks, remembers previous projects. Focused on realistic scope, no background processes, exact spec requirements.',
      category: 'project-management',
      getContent: () => seniorProjectManagerContent,
    },
  ];
}
