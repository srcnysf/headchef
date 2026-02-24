import chalk from 'chalk';
import type { Command } from 'commander';
import { planGeneration, writeFiles } from '../generator.js';
import { IDE_TYPES, IDE_METADATA, FRAMEWORKS, isValidIdeType, isValidFramework } from '../types.js';
import { promptIdeSelection, promptFrameworkSelection, promptOverwriteSelection } from '../prompt.js';
import { loadRcConfig, saveRcConfig } from '../rc.js';
import type { IdeType, Framework, GeneratorResult } from '../types.js';

interface SharedCommandOptions {
  readonly only?: string[];
  readonly exclude?: string[];
  readonly framework?: string;
  readonly force: boolean;
  readonly dryRun: boolean;
  readonly interactive: boolean;
}

interface ExecutionContext {
  readonly targetDir: string;
  readonly options: SharedCommandOptions;
}

export function attachSharedOptions(command: Command): Command {
  return command
    .option('--only <ides...>', 'Only generate configs for specified IDEs')
    .option('--exclude <ides...>', 'Exclude specified IDEs')
    .option('--framework <framework>', 'Framework-specific rules layer')
    .option('--force', 'Overwrite existing config files', false)
    .option('--dry-run', 'Preview files without writing', false)
    .option('--no-interactive', 'Skip interactive prompts (use all IDEs)');
}

export function resolveIdes(only?: string[], exclude?: string[]): IdeType[] {
  let ides: IdeType[] = [...IDE_TYPES];
  if (only) {
    const validated = only.filter(isValidIdeType);
    if (validated.length === 0) {
      console.error(chalk.red(`Invalid IDE types. Available: ${IDE_TYPES.join(', ')}`));
      process.exit(1);
    }
    ides = validated;
  }
  if (exclude) {
    const excludeSet = new Set(exclude.filter(isValidIdeType));
    ides = ides.filter(ide => !excludeSet.has(ide));
  }
  return ides;
}

export function resolveFramework(value: string): Framework {
  if (!isValidFramework(value)) {
    console.error(chalk.red(`Invalid framework "${value}". Available: ${FRAMEWORKS.join(', ')}`));
    process.exit(1);
  }
  return value;
}

export function buildCommandOptions(options: Record<string, unknown>): SharedCommandOptions {
  return {
    only: options.only as string[] | undefined,
    exclude: options.exclude as string[] | undefined,
    framework: options.framework as string | undefined,
    force: options.force as boolean,
    dryRun: options.dryRun as boolean,
    interactive: options.interactive !== false,
  };
}

export async function executeGeneration(context: ExecutionContext): Promise<void> {
  const { targetDir, options } = context;
  const hasIdeFlags = options.only || options.exclude;
  const hasFrameworkFlag = options.framework;
  const isInteractive = options.interactive && !hasIdeFlags;
  let ides: IdeType[];
  let framework: Framework;
  if (isInteractive) {
    console.log(chalk.bold('\n🍳 headchef — Cooking up your AI IDE configs...\n'));
    const rcConfig = await loadRcConfig();
    ides = await promptIdeSelection(rcConfig?.ides);
    if (ides.length === 0) {
      console.log(chalk.yellow('No IDEs selected. Nothing to do.\n'));
      return;
    }
    framework = hasFrameworkFlag ? resolveFramework(options.framework!) : await promptFrameworkSelection();
    await saveRcConfig({ ides, framework });
  } else {
    ides = resolveIdes(options.only, options.exclude);
    framework = resolveFramework(options.framework || 'general');
    console.log(chalk.bold('\n🍳 headchef — Cooking up your AI IDE configs...\n'));
  }
  const generatorOptions = {
    targetDir,
    ides,
    framework,
    force: options.force,
    dryRun: options.dryRun,
  };
  const plan = await planGeneration(generatorOptions);
  let approvedOverwrites: string[] = [];
  if (plan.conflicts.length > 0 && isInteractive && !options.force) {
    approvedOverwrites = await promptOverwriteSelection(plan.conflicts);
  }
  const result = await writeFiles(generatorOptions, plan, approvedOverwrites);
  printResult(result, options.dryRun);
}

export function printResult(result: GeneratorResult, isDryRun: boolean): void {
  if (result.skipped.length > 0) {
    console.log(chalk.yellow('⚠ Existing configs detected (skipped):'));
    for (const file of result.skipped) {
      console.log(chalk.yellow(`  ├── ${file}`));
    }
    console.log();
  }
  if (result.generated.length > 0) {
    const label = isDryRun ? 'Would generate:' : 'Generated:';
    console.log(chalk.green(`✓ ${label}`));
    for (const file of result.generated) {
      console.log(chalk.green(`  ├── ${file}`));
    }
    console.log();
  }
  if (result.skipped.length > 0 && !isDryRun) {
    console.log(chalk.dim('Use --force to overwrite existing files.\n'));
  }
  if (result.generated.length === 0 && result.skipped.length === 0) {
    console.log(chalk.yellow('No files to generate.\n'));
  }
}

export function printList(): void {
  console.log(chalk.bold('\nAvailable IDEs:'));
  for (const ide of IDE_TYPES) {
    const meta = IDE_METADATA[ide];
    console.log(`  - ${meta.displayName.padEnd(22)} (${ide})`);
  }
  console.log(chalk.bold('\nAvailable Frameworks:'));
  for (const fw of FRAMEWORKS) {
    console.log(`  - ${fw}`);
  }
  console.log();
}
