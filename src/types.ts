export const IDE_TYPES = [
  'claude', 'cursor', 'windsurf', 'antigravity',
  'copilot', 'cline', 'continuedev', 'amazonq',
  'jetbrains', 'aider', 'trae', 'augment',
  'codex', 'agentsmd'
] as const;
export type IdeType = typeof IDE_TYPES[number];

export interface IdeMetadata {
  readonly displayName: string;
  readonly description: string;
}

export const IDE_METADATA: Record<IdeType, IdeMetadata> = {
  claude: { displayName: 'Claude Code', description: '.claude/, CLAUDE.md' },
  cursor: { displayName: 'Cursor', description: '.cursor/rules/' },
  windsurf: { displayName: 'Windsurf', description: '.windsurf/rules/' },
  antigravity: { displayName: 'Google Antigravity', description: '.agent/, GEMINI.md' },
  copilot: { displayName: 'GitHub Copilot', description: '.github/copilot-instructions.md' },
  cline: { displayName: 'Cline / Roo Code', description: '.clinerules, .roo/rules/' },
  continuedev: { displayName: 'Continue.dev', description: '.continue/rules/' },
  amazonq: { displayName: 'Amazon Q Developer', description: '.amazonq/rules/' },
  jetbrains: { displayName: 'JetBrains AI', description: '.aiassistant/rules/' },
  aider: { displayName: 'Aider', description: '.aider.conf.yml, CONVENTIONS.md' },
  trae: { displayName: 'Trae', description: '.trae/rules/' },
  augment: { displayName: 'Augment Code', description: '.augment/rules/' },
  codex: { displayName: 'OpenAI Codex', description: '.codex/' },
  agentsmd: { displayName: 'AGENTS.md', description: 'Universal standard' },
};

export const FRAMEWORKS = ['general', 'flutter', 'nextjs', 'react', 'python'] as const;
export type Framework = typeof FRAMEWORKS[number];

export interface FileEntry {
  readonly path: string;
  readonly content: string;
}

export interface GeneratorOptions {
  readonly targetDir: string;
  readonly ides: readonly IdeType[];
  readonly framework: Framework;
  readonly force: boolean;
  readonly dryRun: boolean;
}

export interface GeneratorResult {
  readonly generated: readonly string[];
  readonly skipped: readonly string[];
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
