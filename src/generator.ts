import fs from 'fs-extra';
import path from 'path';
import type { GeneratorOptions, GeneratorResult, GenerationPlan, Recipe, FileEntry } from './types.js';
import { ClaudeRecipe } from './recipes/claude.recipe.js';
import { CodexRecipe } from './recipes/codex.recipe.js';
import { CursorRecipe } from './recipes/cursor.recipe.js';
import { WindsurfRecipe } from './recipes/windsurf.recipe.js';
import { AntigravityRecipe } from './recipes/antigravity.recipe.js';
import { CopilotRecipe } from './recipes/copilot.recipe.js';
import { ClineRecipe } from './recipes/cline.recipe.js';
import { JetbrainsRecipe } from './recipes/jetbrains.recipe.js';
import { AugmentRecipe } from './recipes/augment.recipe.js';
import { AgentsMdRecipe } from './recipes/agents_md.recipe.js';
import { detectExistingFiles } from './detector.js';
import { getGitignoreAdditions } from './templates/shared/ignore_patterns.js';

function createRecipes(): readonly Recipe[] {
  return [
    new ClaudeRecipe(),
    new CodexRecipe(),
    new CursorRecipe(),
    new WindsurfRecipe(),
    new AntigravityRecipe(),
    new CopilotRecipe(),
    new ClineRecipe(),
    new JetbrainsRecipe(),
    new AugmentRecipe(),
    new AgentsMdRecipe(),
  ];
}

export async function planGeneration(options: GeneratorOptions): Promise<GenerationPlan> {
  const recipes = createRecipes().filter(r => options.ides.includes(r.name));
  const allFiles: FileEntry[] = [];
  for (const recipe of recipes) {
    allFiles.push(...recipe.generateFiles(options));
  }
  allFiles.push({ path: '.gitignore.headchef', content: getGitignoreAdditions() });
  const conflicts = options.force ? [] : await detectExistingFiles(options.targetDir, allFiles.map(f => f.path));
  return { filesToWrite: allFiles, conflicts };
}

export async function writeFiles(
  options: GeneratorOptions,
  plan: GenerationPlan,
  approvedOverwrites: readonly string[] = [],
): Promise<GeneratorResult> {
  const overwriteSet = new Set(approvedOverwrites);
  const generated: string[] = [];
  const skipped: string[] = [];
  for (const file of plan.filesToWrite) {
    const isConflict = plan.conflicts.includes(file.path);
    if (isConflict && !overwriteSet.has(file.path)) {
      skipped.push(file.path);
      continue;
    }
    generated.push(file.path);
    if (!options.dryRun) {
      const fullPath = path.join(options.targetDir, file.path);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.content, 'utf-8');
    }
  }
  return { generated, skipped };
}

export async function generateConfigs(options: GeneratorOptions): Promise<GeneratorResult> {
  const plan = await planGeneration(options);
  return writeFiles(options, plan);
}
