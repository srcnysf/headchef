export const IDE_TYPES = [
  'claude', 'codex', 'cursor', 'windsurf', 'antigravity',
  'copilot', 'cline', 'jetbrains', 'augment', 'agentsmd'
] as const;
export type IdeType = typeof IDE_TYPES[number];

export interface IdeMetadata {
  readonly displayName: string;
  readonly description: string;
}

export const IDE_METADATA: Record<IdeType, IdeMetadata> = {
  claude: { displayName: 'Claude Code', description: '.claude/, CLAUDE.md' },
  codex: { displayName: 'OpenAI Codex', description: '.codex/' },
  cursor: { displayName: 'Cursor', description: '.cursor/rules/' },
  windsurf: { displayName: 'Windsurf', description: '.windsurf/rules/' },
  antigravity: { displayName: 'Google Antigravity', description: 'GEMINI.md, .agent/skills/' },
  copilot: { displayName: 'GitHub Copilot', description: '.github/copilot-instructions.md' },
  cline: { displayName: 'Cline / Roo Code', description: '.clinerules, .roo/rules/' },
  jetbrains: { displayName: 'JetBrains AI', description: '.aiassistant/rules/' },
  augment: { displayName: 'Augment Code', description: '.augment/rules/' },
  agentsmd: { displayName: 'AGENTS.md', description: 'Universal standard' },
};

export const FRAMEWORKS = ['general', 'flutter', 'nextjs', 'react', 'python'] as const;
export type Framework = typeof FRAMEWORKS[number];

export const AGENT_CATEGORIES = [
  'core', 'engineering', 'design', 'marketing', 'product',
  'project-management', 'testing', 'support', 'spatial-computing', 'specialized'
] as const;
export type AgentCategory = typeof AGENT_CATEGORIES[number];

export interface AgentCategoryMetadata {
  readonly displayName: string;
  readonly description: string;
  readonly agentCount: number;
}

export const AGENT_CATEGORY_METADATA: Record<AgentCategory, AgentCategoryMetadata> = {
  core: { displayName: 'Core', description: 'Essential development agents (always included)', agentCount: 6 },
  engineering: { displayName: 'Engineering', description: 'Frontend, backend, mobile, AI, DevOps', agentCount: 7 },
  design: { displayName: 'Design', description: 'UI/UX, brand, visual storytelling', agentCount: 7 },
  marketing: { displayName: 'Marketing', description: 'Growth, content, social media', agentCount: 8 },
  product: { displayName: 'Product', description: 'Sprint planning, research, feedback', agentCount: 3 },
  'project-management': { displayName: 'Project Management', description: 'Producers, operations, tracking', agentCount: 5 },
  testing: { displayName: 'Testing', description: 'QA, performance, API testing', agentCount: 7 },
  support: { displayName: 'Support', description: 'Customer service, analytics, compliance', agentCount: 6 },
  'spatial-computing': { displayName: 'Spatial Computing', description: 'XR/VR, Vision Pro, WebXR', agentCount: 6 },
  specialized: { displayName: 'Specialized', description: 'Data analytics, orchestration, LSP', agentCount: 6 },
};

export function isValidAgentCategory(value: string): value is AgentCategory {
  return (AGENT_CATEGORIES as readonly string[]).includes(value);
}

export interface FileEntry {
  readonly path: string;
  readonly content: string;
}

export interface GeneratorOptions {
  readonly targetDir: string;
  readonly ides: readonly IdeType[];
  readonly framework: Framework;
  readonly agentCategories: readonly AgentCategory[];
  readonly force: boolean;
  readonly dryRun: boolean;
}

export interface GeneratorResult {
  readonly generated: readonly string[];
  readonly skipped: readonly string[];
}
export interface GenerationPlan {
  readonly filesToWrite: readonly FileEntry[];
  readonly conflicts: readonly string[];
}


export interface Recipe {
  readonly name: IdeType;
  generateFiles(options: GeneratorOptions): readonly FileEntry[];
}

export function isValidIdeType(value: string): value is IdeType {
  return (IDE_TYPES as readonly string[]).includes(value);
}

export function isValidFramework(value: string): value is Framework {
  return (FRAMEWORKS as readonly string[]).includes(value);
}
