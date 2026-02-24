import { Command } from 'commander';
import chalk from 'chalk';
import { generateConfigs } from './generator.js';
import { IDE_TYPES, FRAMEWORKS, isValidIdeType, isValidFramework } from './types.js';
import type { IdeType, Framework } from './types.js';

const program = new Command();

program
  .name('create-headchef')
  .description('Scaffold AI IDE configs for Claude Code, Cursor, Windsurf, and Antigravity')
  .version('0.1.0')
  .option('--only <ides...>', 'Only generate configs for specified IDEs')
  .option('--exclude <ides...>', 'Exclude specified IDEs')
  .option('--framework <framework>', 'Framework-specific rules layer', 'general')
  .option('--force', 'Overwrite existing config files', false)
  .option('--dry-run', 'Preview files without writing', false)
  .option('--list', 'List available IDEs and frameworks')
  .option('--target <dir>', 'Target directory', process.cwd())
  .action(async (options) => {
    if (options.list) {
      printList();
      return;
    }
    const ides = resolveIdes(options.only, options.exclude);
    const framework = resolveFramework(options.framework);
    console.log(chalk.bold('\n🍸 headchef - Mixing your AI IDE configs...\n'));
    const result = await generateConfigs({
      targetDir: options.target,
      ides,
      framework,
      force: options.force,
      dryRun: options.dryRun,
    });
    printResult(result, options.dryRun);
  });

function resolveIdes(only?: string[], exclude?: string[]): IdeType[] {
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

function resolveFramework(value: string): Framework {
  if (!isValidFramework(value)) {
    console.error(chalk.red(`Invalid framework "${value}". Available: ${FRAMEWORKS.join(', ')}`));
    process.exit(1);
  }
  return value;
}

function printList(): void {
  console.log(chalk.bold('\nAvailable IDEs:'));
  for (const ide of IDE_TYPES) {
    console.log(`  - ${ide}`);
  }
  console.log(chalk.bold('\nAvailable Frameworks:'));
  for (const fw of FRAMEWORKS) {
    console.log(`  - ${fw}`);
  }
  console.log();
}

function printResult(result: { generated: readonly string[]; skipped: readonly string[] }, isDryRun: boolean): void {
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

program.parse();
