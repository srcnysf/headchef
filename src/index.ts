import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { attachSharedOptions, buildCommandOptions, executeGeneration, printList } from './commands/shared.js';

const program = new Command();

program
  .name('headchef')
  .description('Scaffold AI IDE configs for 10 code editors')
  .version('0.4.0');

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
  .description('Create a new project directory and scaffold AI IDE configs')
  .argument('<projectname>', 'Name of the new project directory')
  .action(async (projectname: string, options) => {
    const targetDir = path.resolve(process.cwd(), projectname);
    if (!options.dryRun) {
      await fs.ensureDir(targetDir);
    }
    console.log(chalk.dim(`\nProject directory: ${targetDir}`));
    await executeGeneration({
      targetDir,
      options: buildCommandOptions(options),
    });
    if (!options.dryRun) {
      printNextSteps(projectname);
    }
  });

const listCommand = new Command('list')
  .description('List available IDEs and frameworks')
  .action(() => {
    printList();
  });

function printNextSteps(projectname: string): void {
  console.log(chalk.bold('Next steps:'));
  console.log(chalk.dim(`  cd ${projectname}`));
  console.log(chalk.dim('  git init'));
  console.log(chalk.dim('  npm init -y\n'));
}

attachSharedOptions(initCommand);
attachSharedOptions(createCommand);

program.addCommand(initCommand);
program.addCommand(createCommand);
program.addCommand(listCommand);

program.parse();
