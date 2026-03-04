import type { AgentDefinition } from '../registry.js';
import frontendDeveloperContent from './frontend_developer.md';
import backendArchitectContent from './backend_architect.md';
import aiEngineerContent from './ai_engineer.md';
import devopsAutomatorContent from './devops_automator.md';
import mobileAppBuilderContent from './mobile_app_builder.md';
import rapidPrototyperContent from './rapid_prototyper.md';
import seniorDeveloperContent from './senior_developer.md';

export function getEngineeringDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'frontend-developer',
      name: 'Frontend Developer',
      description: 'Expert frontend developer specializing in modern web technologies, React/Vue/Angular frameworks, UI implementation, and performance optimization.',
      category: 'engineering',
      getContent: () => frontendDeveloperContent,
    },
    {
      id: 'backend-architect',
      name: 'Backend Architect',
      description: 'Senior backend architect specializing in scalable system design, database architecture, API development, and cloud infrastructure.',
      category: 'engineering',
      getContent: () => backendArchitectContent,
    },
    {
      id: 'ai-engineer',
      name: 'AI Engineer',
      description: 'Expert AI/ML engineer specializing in machine learning model development, deployment, and integration into production systems.',
      category: 'engineering',
      getContent: () => aiEngineerContent,
    },
    {
      id: 'devops-automator',
      name: 'DevOps Automator',
      description: 'Expert DevOps engineer specializing in infrastructure automation, CI/CD pipeline development, and cloud operations.',
      category: 'engineering',
      getContent: () => devopsAutomatorContent,
    },
    {
      id: 'mobile-app-builder',
      name: 'Mobile App Builder',
      description: 'Specialized mobile application developer with expertise in native iOS/Android development and cross-platform frameworks.',
      category: 'engineering',
      getContent: () => mobileAppBuilderContent,
    },
    {
      id: 'rapid-prototyper',
      name: 'Rapid Prototyper',
      description: 'Specialized in ultra-fast proof-of-concept development and MVP creation using efficient tools and frameworks.',
      category: 'engineering',
      getContent: () => rapidPrototyperContent,
    },
    {
      id: 'senior-developer',
      name: 'Senior Developer',
      description: 'Premium implementation specialist - Masters Laravel/Livewire/FluxUI, advanced CSS, Three.js integration.',
      category: 'engineering',
      getContent: () => seniorDeveloperContent,
    },
  ];
}
