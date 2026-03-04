import type { AgentCategory } from '../../types.js';
import { getCoreDefinitions } from './core/definitions.js';
import { getEngineeringDefinitions } from './engineering/definitions.js';
import { getDesignDefinitions } from './design/definitions.js';
import { getMarketingDefinitions } from './marketing/definitions.js';
import { getProductDefinitions } from './product/definitions.js';
import { getProjectManagementDefinitions } from './project_management/definitions.js';
import { getTestingDefinitions } from './testing/definitions.js';
import { getSupportDefinitions } from './support/definitions.js';
import { getSpatialComputingDefinitions } from './spatial_computing/definitions.js';
import { getSpecializedDefinitions } from './specialized/definitions.js';

export interface AgentDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: AgentCategory;
  readonly getContent: () => string;
}

const categoryLoaders: Record<AgentCategory, () => readonly AgentDefinition[]> = {
  core: getCoreDefinitions,
  engineering: getEngineeringDefinitions,
  design: getDesignDefinitions,
  marketing: getMarketingDefinitions,
  product: getProductDefinitions,
  'project-management': getProjectManagementDefinitions,
  testing: getTestingDefinitions,
  support: getSupportDefinitions,
  'spatial-computing': getSpatialComputingDefinitions,
  specialized: getSpecializedDefinitions,
};

export function loadAgentsByCategories(
  categories: readonly AgentCategory[]
): readonly AgentDefinition[] {
  return categories.flatMap(cat => categoryLoaders[cat]());
}

export function loadAgentsByCategory(
  category: AgentCategory
): readonly AgentDefinition[] {
  return categoryLoaders[category]();
}
