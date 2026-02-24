export const IDE_TYPES = ['claude', 'cursor', 'windsurf', 'antigravity'] as const;
export type IdeType = typeof IDE_TYPES[number];

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
