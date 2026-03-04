import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { attachSharedOptions, buildCommandOptions, executeGeneration, printList } from './commands/shared.js';
import { loadRcConfig, saveRcConfig } from './rc.js';
import { resolveBrainPath, resolveProjectsRoot, resolveDefaultIde, resolveProjectPath } from './config.js';
import { setupBrainDocs } from './brain.js';
import { openInIde } from './opener.js';
import { generateChecklistMd } from './templates/shared/checklist_md.js';
import { generateChangelogMd } from './templates/shared/changelog_md.js';

const program = new Command();

program
  .name('headchef')
  .description('Scaffold AI IDE configs for 10 code editors')
  .version('0.5.0');

const initCommand = new Command('init')
  .description('Scaffold AI IDE configs into the current directory')
  .option('--target <dir>', 'Target directory', process.cwd())
  .action(async (options) => {
    await executeGeneration({
      targetDir: options.target,
      options: buildCommandOptions(options),
    });
  });

const createCommand = new Command('create')
  .description('Create a new project directory, link brain docs, and scaffold AI IDE configs')
  .argument('[projectname]', 'Name or path of the new project directory')
  .option('--brain <path>', 'Obsidian vault path (overrides RC config)')
  .option('--no-brain', 'Skip brain/docs integration')
  .option('--open', 'Open project in IDE after creation')
  .option('--ide-cmd <cmd>', 'IDE command to open with (e.g., cursor, code)')
  .action(async (projectname: string | undefined, options) => {
    let rcConfig = await loadRcConfig();
    const projectsRoot = resolveProjectsRoot(rcConfig);
    const isInteractive = options.interactive !== false;

    let resolvedName = projectname;
    if (!resolvedName && isInteractive) {
      const { input } = await import('@inquirer/prompts');
      resolvedName = await input({ message: 'Project name or path:' });
      if (!resolvedName.trim()) {
        console.log(chalk.yellow('No project name provided. Aborting.'));
        return;
      }
    } else if (!resolvedName) {
      console.error(chalk.red('Project name is required in non-interactive mode.'));
      process.exit(1);
    }

    const targetDir = resolveProjectPath(resolvedName, projectsRoot);

    if (!options.dryRun) {
      await fs.ensureDir(targetDir);
    }
    console.log(chalk.dim(`\nProject directory: ${targetDir}`));

    // Brain integration: prompt for path if interactive and not configured
    if (options.brain !== false) {
      let brainPath = options.brain || resolveBrainPath(rcConfig);
      if (!brainPath && isInteractive) {
        const { input } = await import('@inquirer/prompts');
        const answer = await input({
          message: 'Obsidian brain vault path (leave empty to skip):',
          default: '',
        });
        if (answer.trim()) {
          brainPath = answer.trim();
          // Save to RC so it's remembered next time
          rcConfig = { ...(rcConfig ?? { ides: [], framework: 'general' as const }), brainPath };
          await saveRcConfig(rcConfig);
          console.log(chalk.dim(`  Saved brain path to ~/.headchefrc`));
        }
      }
      if (brainPath) {
        const brainResult = await setupBrainDocs({
          projectName: resolvedName,
          projectPath: targetDir,
          brainPath,
          dryRun: options.dryRun ?? false,
        });
        printBrainResult(brainResult);
      }
    }

    // Generate CHECKLIST.md and CHANGELOG.md
    if (!options.dryRun) {
      await writeIfMissing(path.join(targetDir, 'CHECKLIST.md'), generateChecklistMd(resolvedName));
      await writeIfMissing(path.join(targetDir, 'CHANGELOG.md'), generateChangelogMd(resolvedName));
      // Create docs/plans/ if docs exists (brain symlink or regular dir)
      const docsPlansDir = path.join(targetDir, 'docs', 'plans');
      if (await fs.pathExists(path.join(targetDir, 'docs'))) {
        await fs.ensureDir(docsPlansDir);
      }
    }

    await executeGeneration({
      targetDir,
      options: buildCommandOptions(options),
    });

    if (options.open && !options.dryRun) {
      const ideCmd = options.ideCmd || resolveDefaultIde(rcConfig);
      console.log(chalk.dim(`Opening in ${ideCmd}...`));
      openInIde(ideCmd, targetDir);
    }

    if (!options.dryRun) {
      printNextSteps(resolvedName);
    }
  });

const openCommand = new Command('open')
  .description('Open an existing project in the configured IDE')
  .argument('<projectname>', 'Name of the project to open')
  .option('--ide-cmd <cmd>', 'IDE command (e.g., cursor, code, windsurf)')
  .action(async (projectname: string, options) => {
    const rcConfig = await loadRcConfig();
    const projectsRoot = resolveProjectsRoot(rcConfig);
    const projectPath = resolveProjectPath(projectname, projectsRoot);

    if (!await fs.pathExists(projectPath)) {
      console.error(chalk.red(`Project not found: ${projectPath}`));
      console.log(chalk.dim(`Run: headchef create "${projectname}" first`));
      process.exit(1);
    }

    const ideCmd = options.ideCmd || resolveDefaultIde(rcConfig);
    console.log(chalk.dim(`Opening ${projectname} in ${ideCmd}...`));
    openInIde(ideCmd, projectPath);
  });

const listCommand = new Command('list')
  .description('List available IDEs, frameworks, and agent categories')
  .action(() => {
    printList();
  });

async function writeIfMissing(filePath: string, content: string): Promise<void> {
  if (!await fs.pathExists(filePath)) {
    await fs.writeFile(filePath, content, 'utf-8');
  }
}

function printNextSteps(projectname: string): void {
  console.log(chalk.bold('Next steps:'));
  console.log(chalk.dim(`  cd ${projectname}`));
  console.log(chalk.dim('  git init'));
  console.log(chalk.dim('  npm init -y\n'));
}

function printBrainResult(result: { brainProjectDir: string; overviewCreated: boolean; symlinkCreated: boolean; symlinkMigrated: boolean; indexUpdated: boolean }): void {
  if (result.overviewCreated) {
    console.log(chalk.green('  ✓ Created Overview.md in brain'));
  }
  if (result.symlinkCreated) {
    const migrated = result.symlinkMigrated ? ' (migrated existing docs)' : '';
    console.log(chalk.green(`  ✓ Linked docs/ → brain${migrated}`));
  }
  if (result.indexUpdated) {
    console.log(chalk.green('  ✓ Added to brain index'));
  }
}

attachSharedOptions(initCommand);
attachSharedOptions(createCommand);

program.addCommand(initCommand);
program.addCommand(createCommand);
program.addCommand(openCommand);
program.addCommand(listCommand);

program.parse();
