import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateGeminiMd } from '../templates/antigravity/gemini_md.js';
import {
  generateCodeReviewerSkill,
  generateTestWriterSkill,
  generateBugDebuggerSkill,
  generateArchitecturePlannerSkill,
  generateDocsKeeperSkill,
} from '../templates/antigravity/skills.js';

export class AntigravityRecipe implements Recipe {
  readonly name = 'antigravity' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'GEMINI.md', content: generateGeminiMd(options.framework) },
      { path: '.agent/skills/code-reviewer/SKILL.md', content: generateCodeReviewerSkill() },
      { path: '.agent/skills/test-writer/SKILL.md', content: generateTestWriterSkill() },
      { path: '.agent/skills/bug-debugger/SKILL.md', content: generateBugDebuggerSkill() },
      { path: '.agent/skills/architecture-planner/SKILL.md', content: generateArchitecturePlannerSkill() },
      { path: '.agent/skills/docs-keeper/SKILL.md', content: generateDocsKeeperSkill() },
    ];
  }
}
