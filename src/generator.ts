import fs from 'fs-extra';
import path from 'path';
import type { GeneratorOptions, GeneratorResult, Recipe, FileEntry } from './types.js';
import { ClaudeRecipe } from './recipes/claude.recipe.js';
import { CursorRecipe } from './recipes/cursor.recipe.js';
import { WindsurfRecipe } from './recipes/windsurf.recipe.js';
import { AntigravityRecipe } from './recipes/antigravity.recipe.js';
import { detectExistingFiles } from './detector.js';
import { getGitignoreAdditions } from './templates/shared/ignore_patterns.js';

function createRecipes(): readonly Recipe[] {
  return [new ClaudeRecipe(), new CursorRecipe(), new WindsurfRecipe(), new AntigravityRecipe()];
}

export async function generateConfigs(options: GeneratorOptions): Promise<GeneratorResult> {
  const recipes = createRecipes().filter(r => options.ides.includes(r.name));
  const allFiles: FileEntry[] = [];
  for (const recipe of recipes) {
    allFiles.push(...recipe.generateFiles(options));
  }
  allFiles.push({ path: '.gitignore.headchef', content: getGitignoreAdditions() });
  const allPaths = allFiles.map(f => f.path);
  const existingPaths = options.force ? [] : await detectExistingFiles(options.targetDir, allPaths);
  const generated: string[] = [];
  const skipped: string[] = [...existingPaths];
  for (const file of allFiles) {
    if (existingPaths.includes(file.path)) {
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
