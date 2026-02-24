import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateGeminiMd } from '../templates/antigravity/gemini_md.js';
import { generateCodingStyleRules } from '../templates/antigravity/rules.js';
import { generatePrReviewerSkill, generateCodeReviewerSkill } from '../templates/antigravity/skills.js';
import { generateReviewWorkflow } from '../templates/antigravity/workflows.js';

export class AntigravityRecipe implements Recipe {
  readonly name = 'antigravity' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'GEMINI.md', content: generateGeminiMd(options.framework) },
      { path: '.agent/rules/coding-style.md', content: generateCodingStyleRules() },
      { path: '.agent/skills/pr-reviewer/SKILL.md', content: generatePrReviewerSkill() },
      { path: '.agent/skills/code-reviewer/SKILL.md', content: generateCodeReviewerSkill() },
      { path: '.agent/workflows/review.md', content: generateReviewWorkflow() },
    ];
  }
}
