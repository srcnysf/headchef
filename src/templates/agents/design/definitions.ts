import type { AgentDefinition } from '../registry.js';
import uiDesignerContent from './ui_designer.md';
import uxResearcherContent from './ux_researcher.md';
import uxArchitectContent from './ux_architect.md';
import brandGuardianContent from './brand_guardian.md';
import visualStorytellerContent from './visual_storyteller.md';
import whimsyInjectorContent from './whimsy_injector.md';
import imagePromptEngineerContent from './image_prompt_engineer.md';

export function getDesignDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'ui-designer',
      name: 'UI Designer',
      description: 'Expert UI designer specializing in visual design systems, component libraries, and pixel-perfect interface creation.',
      category: 'design',
      getContent: () => uiDesignerContent,
    },
    {
      id: 'ux-researcher',
      name: 'UX Researcher',
      description: 'Expert user experience researcher specializing in user behavior analysis, usability testing, and data-driven design insights.',
      category: 'design',
      getContent: () => uxResearcherContent,
    },
    {
      id: 'ux-architect',
      name: 'UX Architect',
      description: 'Technical architecture and UX specialist who provides developers with solid foundations, CSS systems, and clear implementation guidance.',
      category: 'design',
      getContent: () => uxArchitectContent,
    },
    {
      id: 'brand-guardian',
      name: 'Brand Guardian',
      description: 'Expert brand strategist and guardian specializing in brand identity development, consistency maintenance, and strategic brand positioning.',
      category: 'design',
      getContent: () => brandGuardianContent,
    },
    {
      id: 'visual-storyteller',
      name: 'Visual Storyteller',
      description: 'Expert visual communication specialist focused on creating compelling visual narratives, multimedia content, and brand storytelling through design.',
      category: 'design',
      getContent: () => visualStorytellerContent,
    },
    {
      id: 'whimsy-injector',
      name: 'Whimsy Injector',
      description: 'Expert creative specialist focused on adding personality, delight, and playful elements to brand experiences.',
      category: 'design',
      getContent: () => whimsyInjectorContent,
    },
    {
      id: 'image-prompt-engineer',
      name: 'Image Prompt Engineer',
      description: 'Expert photography prompt engineer specializing in crafting detailed, evocative prompts for AI image generation.',
      category: 'design',
      getContent: () => imagePromptEngineerContent,
    },
  ];
}
