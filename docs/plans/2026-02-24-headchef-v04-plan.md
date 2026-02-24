# headchef v0.4 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove JSON settings files, fix Codex/Antigravity recipes per official docs, add ~/.headchefrc for remembering selections, add interactive overwrite prompt.

**Architecture:** Five independent recipe/template changes (Tasks 1-5), then two new features (RC file Task 6, overwrite prompt Tasks 7-8), then integration wiring (Task 9), tests (Task 10), docs (Task 11).

**Tech Stack:** TypeScript, vitest, @inquirer/prompts (checkbox), fs-extra, os.homedir()

---

### Task 1: Remove Claude settings files

**Files:**
- Modify: `src/recipes/claude.recipe.ts:2-3,19,26`
- Delete: `src/templates/claude/settings.ts`
- Modify: `tests/recipes/claude.recipe.test.ts:27,34,57-59`

**Step 1: Update test expectations**

In `tests/recipes/claude.recipe.test.ts`, remove the `settings.json` and `.mcp.json` expectations and update file count from 9 to 7:

```typescript
// Remove these lines from 'should generate expected files':
//   expect(paths).toContain('.claude/settings.json');
//   expect(paths).toContain('.mcp.json');

// Update file count test:
it('should generate 7 files total', () => {
  const files = recipe.generateFiles(createOptions());
  expect(files).toHaveLength(7);
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/recipes/claude.recipe.test.ts`
Expected: FAIL — recipe still generates 9 files

**Step 3: Update Claude recipe**

In `src/recipes/claude.recipe.ts`:
- Remove import of `generateClaudeSettings`
- Remove the `settings.json` entry (line 19)
- Remove the `.mcp.json` entry (line 26)

```typescript
import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClaudeMd } from '../templates/claude/claude_md.js';
import {
  generateCodeReviewerAgent,
  generateTestWriterAgent,
  generateBugDebuggerAgent,
  generateArchitecturePlannerAgent,
  generateDocsKeeperAgent,
} from '../templates/claude/agents.js';
import { generateReviewCommand } from '../templates/claude/commands.js';

export class ClaudeRecipe implements Recipe {
  readonly name = 'claude' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'CLAUDE.md', content: generateClaudeMd(options.framework) },
      { path: '.claude/agents/code-reviewer.md', content: generateCodeReviewerAgent() },
      { path: '.claude/agents/test-writer.md', content: generateTestWriterAgent() },
      { path: '.claude/agents/bug-debugger.md', content: generateBugDebuggerAgent() },
      { path: '.claude/agents/architecture-planner.md', content: generateArchitecturePlannerAgent() },
      { path: '.claude/agents/docs-keeper.md', content: generateDocsKeeperAgent() },
      { path: '.claude/commands/review.md', content: generateReviewCommand() },
    ];
  }
}
```

**Step 4: Delete `src/templates/claude/settings.ts`**

**Step 5: Run tests**

Run: `npx vitest run tests/recipes/claude.recipe.test.ts`
Expected: PASS

**Step 6: Commit**

```bash
git add -A && git commit -m "refactor: remove settings.json and .mcp.json from Claude recipe"
```

---

### Task 2: Remove Cursor mcp.json

**Files:**
- Modify: `src/recipes/cursor.recipe.ts:3,12`
- Delete: `src/templates/cursor/mcp_json.ts`
- Modify: `tests/recipes/cursor.recipe.test.ts:27`

**Step 1: Update test — remove `.cursor/mcp.json` expectation**

In `tests/recipes/cursor.recipe.test.ts`, remove `expect(paths).toContain('.cursor/mcp.json')`.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/recipes/cursor.recipe.test.ts`
Expected: FAIL — recipe still generates mcp.json

**Step 3: Update Cursor recipe**

Remove the `generateCursorMcpJson` import and the `.cursor/mcp.json` entry from the files array.

```typescript
import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateGeneralMdc, generateFrameworkMdc } from '../templates/cursor/general_mdc.js';
import { generateCursorIgnore, generateCursorIndexingIgnore } from '../templates/cursor/ignore_files.js';

export class CursorRecipe implements Recipe {
  readonly name = 'cursor' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    const files: FileEntry[] = [
      { path: '.cursor/rules/general.mdc', content: generateGeneralMdc() },
      { path: '.cursorignore', content: generateCursorIgnore() },
      { path: '.cursorindexingignore', content: generateCursorIndexingIgnore() },
    ];
    const frameworkMdc = generateFrameworkMdc(options.framework);
    if (frameworkMdc !== null) {
      files.push({ path: `.cursor/rules/${options.framework}.mdc`, content: frameworkMdc });
    }
    return files;
  }
}
```

**Step 4: Delete `src/templates/cursor/mcp_json.ts`**

**Step 5: Run tests**

Run: `npx vitest run tests/recipes/cursor.recipe.test.ts`
Expected: PASS

**Step 6: Commit**

```bash
git add -A && git commit -m "refactor: remove mcp.json from Cursor recipe"
```

---

### Task 3: Fix Codex — replace instructions.md with config.toml

**Files:**
- Modify: `src/recipes/codex.recipe.ts` (full rewrite)
- Modify: `src/templates/codex/instructions.ts` → rename to `config_toml.ts`
- Modify: `tests/recipes/codex.recipe.test.ts` (update paths)
- Modify: `tests/templates/codex/codex_templates.test.ts` (update paths + content)

**Step 1: Update recipe test**

In `tests/recipes/codex.recipe.test.ts`, change all `.codex/instructions.md` references to `.codex/config.toml`:

```typescript
it('should generate expected files for general framework', () => {
  const files = recipe.generateFiles(createOptions());
  const paths = files.map(f => f.path);
  expect(paths).toContain('.codex/config.toml');
});

it('should generate files with non-empty content', () => {
  // unchanged
});

it('should include model provider in config', () => {
  const files = recipe.generateFiles(createOptions());
  const configFile = files.find(f => f.path === '.codex/config.toml');
  expect(configFile).toBeDefined();
  expect(configFile!.content).toContain('model');
});

it('should reference AGENTS.md', () => {
  const files = recipe.generateFiles(createOptions());
  const configFile = files.find(f => f.path === '.codex/config.toml');
  expect(configFile).toBeDefined();
  expect(configFile!.content).toContain('AGENTS.md');
});
```

**Step 2: Update template test**

Rewrite `tests/templates/codex/codex_templates.test.ts` to test the new `generateCodexConfig` function:

```typescript
import { describe, it, expect } from 'vitest';
import { generateCodexConfig } from '../../../src/templates/codex/config_toml.js';

describe('codex templates', () => {
  describe('generateCodexConfig', () => {
    it('should contain TOML comment header', () => {
      const result = generateCodexConfig();
      expect(result).toContain('# Codex CLI');
    });
    it('should reference AGENTS.md as doc fallback', () => {
      const result = generateCodexConfig();
      expect(result).toContain('AGENTS.md');
    });
    it('should return non-empty content', () => {
      const result = generateCodexConfig();
      expect(result.length).toBeGreaterThan(0);
    });
    it('should contain model configuration', () => {
      const result = generateCodexConfig();
      expect(result).toContain('model');
    });
  });
});
```

**Step 3: Run tests to verify they fail**

Run: `npx vitest run tests/recipes/codex.recipe.test.ts tests/templates/codex/codex_templates.test.ts`
Expected: FAIL

**Step 4: Create new template `src/templates/codex/config_toml.ts`**

```typescript
export function generateCodexConfig(): string {
  return `# Codex CLI — Project Configuration
# See: https://developers.openai.com/codex/config-basic/

model = "o4-mini"

[history]
persistence = true
max_entries = 1000

[project_doc]
max_bytes = 65536
fallback_filenames = ["AGENTS.md", "README.md"]
`;
}
```

**Step 5: Delete old `src/templates/codex/instructions.ts`**

**Step 6: Update Codex recipe**

```typescript
import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateCodexConfig } from '../templates/codex/config_toml.js';

export class CodexRecipe implements Recipe {
  readonly name = 'codex' as const;

  generateFiles(_options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: '.codex/config.toml', content: generateCodexConfig() },
    ];
  }
}
```

**Step 7: Run tests**

Run: `npx vitest run tests/recipes/codex.recipe.test.ts tests/templates/codex/codex_templates.test.ts`
Expected: PASS

**Step 8: Commit**

```bash
git add -A && git commit -m "refactor: replace Codex instructions.md with config.toml per official docs"
```

---

### Task 4: Fix Antigravity — merge rules into GEMINI.md, remove workflows

**Files:**
- Modify: `src/recipes/antigravity.recipe.ts` (remove rules + workflows)
- Modify: `src/templates/antigravity/gemini_md.ts` (merge coding style content)
- Delete: `src/templates/antigravity/rules.ts`
- Delete: `src/templates/antigravity/workflows.ts`
- Modify: `tests/recipes/antigravity.recipe.test.ts` (update file list + count)
- Modify: `tests/templates/antigravity/antigravity_templates.test.ts` (remove rules + workflow tests)
- Modify: `src/types.ts:17` (update description for antigravity)

**Step 1: Update recipe test**

In `tests/recipes/antigravity.recipe.test.ts`:
- Remove expectations for `.agent/rules/coding-style.md` and `.agent/workflows/review.md`
- Update file count from 8 to 6

```typescript
it('should generate expected files for general framework', () => {
  const files = recipe.generateFiles(createOptions());
  const paths = files.map(f => f.path);
  expect(paths).toContain('GEMINI.md');
  expect(paths).toContain('.agent/skills/code-reviewer/SKILL.md');
  expect(paths).toContain('.agent/skills/test-writer/SKILL.md');
  expect(paths).toContain('.agent/skills/bug-debugger/SKILL.md');
  expect(paths).toContain('.agent/skills/architecture-planner/SKILL.md');
  expect(paths).toContain('.agent/skills/docs-keeper/SKILL.md');
  expect(paths).not.toContain('.agent/rules/coding-style.md');
  expect(paths).not.toContain('.agent/workflows/review.md');
});

it('should generate 6 files total', () => {
  const files = recipe.generateFiles(createOptions());
  expect(files).toHaveLength(6);
});
```

**Step 2: Update template test**

In `tests/templates/antigravity/antigravity_templates.test.ts`:
- Remove entire `generateCodingStyleRules` describe block
- Remove entire `generateReviewWorkflow` describe block
- Remove their imports
- Add test for coding style content now being in GEMINI.md

```typescript
it('should contain coding style content', () => {
  const result = generateGeminiMd('general');
  expect(result).toContain('Naming Conventions');
  expect(result).toContain('Function Guidelines');
});
```

**Step 3: Run tests to verify they fail**

Run: `npx vitest run tests/recipes/antigravity.recipe.test.ts tests/templates/antigravity/antigravity_templates.test.ts`
Expected: FAIL

**Step 4: Update GEMINI.md template — merge coding style content**

In `src/templates/antigravity/gemini_md.ts`, add the coding style section:

```typescript
import { Framework } from '../../types.js';
import { getBaseRules } from '../shared/base_rules.js';
import { getFlutterRules } from '../shared/flutter_rules.js';
import { getNextjsRules } from '../shared/nextjs_rules.js';
import { getReactRules } from '../shared/react_rules.js';
import { getPythonRules } from '../shared/python_rules.js';

const FRAMEWORK_RULE_GETTERS: Record<Exclude<Framework, 'general'>, () => string> = {
  flutter: getFlutterRules,
  nextjs: getNextjsRules,
  react: getReactRules,
  python: getPythonRules,
} as const;

function getFrameworkRules(framework: Framework): string {
  if (framework === 'general') {
    return '';
  }
  const getRules = FRAMEWORK_RULE_GETTERS[framework];
  return `\n${getRules()}`;
}

function getCodingStyleSection(): string {
  return `
## Coding Style

### Naming Conventions

- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use underscores_case for file and directory names.
- Use UPPERCASE for environment variables and constants.
- Start each function with a verb.
- Use verbs for boolean variables: isLoading, hasError, canDelete.
- Use complete words instead of abbreviations.

### Function Guidelines

- Write short functions with a single purpose (less than 20 instructions).
- Name functions with a verb and something else.
- Avoid nesting blocks with early checks and returns.
- Use higher-order functions (map, filter, reduce) to avoid nesting.
- Use default parameter values instead of null checks.
- Reduce function parameters using RO-RO (Receive an Object, Return an Object).
- Use a single level of abstraction per function.`;
}

export function generateGeminiMd(framework: Framework): string {
  const baseRules = getBaseRules();
  const codingStyle = getCodingStyleSection();
  const frameworkRules = getFrameworkRules(framework);
  return `# Project Rules

${baseRules}
${codingStyle}
${frameworkRules}`;
}
```

**Step 5: Update Antigravity recipe**

```typescript
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
```

**Step 6: Delete `src/templates/antigravity/rules.ts` and `src/templates/antigravity/workflows.ts`**

**Step 7: Update `src/types.ts` line 17 — update Antigravity description**

Change: `description: '.agent/, GEMINI.md'` → `description: 'GEMINI.md, .agent/skills/'`

**Step 8: Run tests**

Run: `npx vitest run tests/recipes/antigravity.recipe.test.ts tests/templates/antigravity/antigravity_templates.test.ts`
Expected: PASS

**Step 9: Commit**

```bash
git add -A && git commit -m "refactor: merge Antigravity rules into GEMINI.md, remove unverified dirs"
```

---

### Task 5: Run full test suite, fix integration tests

After Tasks 1-4, the CLI integration tests in `tests/index.test.ts` will fail because they check for files that no longer exist (`.claude/settings.json`, `.codex/instructions.md`).

**Step 1: Run full test suite**

Run: `npx vitest run`
Expected: Some tests in `tests/index.test.ts` and `tests/generator.test.ts` fail

**Step 2: Fix integration tests**

In `tests/index.test.ts`:
- The `init` test checking `.codex/instructions.md` → change to `.codex/config.toml`
- The `create` test checking CLAUDE.md is fine (still generated)

In `tests/generator.test.ts`:
- Update any file path expectations that reference removed files

**Step 3: Run full tests**

Run: `npx vitest run`
Expected: ALL PASS

**Step 4: Commit**

```bash
git add -A && git commit -m "test: fix integration tests for v0.4 recipe changes"
```

---

### Task 6: Create RC file module

**Files:**
- Create: `src/rc.ts`
- Create: `tests/rc.test.ts`

**Step 1: Write tests for RC module**

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

// We mock os.homedir to use a temp dir
import { loadRcConfig, saveRcConfig } from '../src/rc.js';
import type { RcConfig } from '../src/rc.js';

describe('RC config', () => {
  let tmpHome: string;
  let originalHome: string;

  beforeEach(async () => {
    tmpHome = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-rc-'));
    originalHome = process.env.HOME || '';
    process.env.HOME = tmpHome;
  });

  afterEach(async () => {
    process.env.HOME = originalHome;
    await fs.remove(tmpHome);
  });

  it('should return null when no RC file exists', async () => {
    const config = await loadRcConfig();
    expect(config).toBeNull();
  });

  it('should save and load RC config', async () => {
    const config: RcConfig = { ides: ['claude', 'cursor'], framework: 'flutter' };
    await saveRcConfig(config);
    const loaded = await loadRcConfig();
    expect(loaded).toEqual(config);
  });

  it('should save to ~/.headchefrc', async () => {
    await saveRcConfig({ ides: ['claude'], framework: 'general' });
    expect(fs.pathExistsSync(path.join(tmpHome, '.headchefrc'))).toBe(true);
  });

  it('should return null for malformed JSON', async () => {
    await fs.writeFile(path.join(tmpHome, '.headchefrc'), 'not json', 'utf-8');
    const config = await loadRcConfig();
    expect(config).toBeNull();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/rc.test.ts`
Expected: FAIL — module doesn't exist

**Step 3: Implement RC module**

Create `src/rc.ts`:

```typescript
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import type { IdeType, Framework } from './types.js';

export interface RcConfig {
  readonly ides: readonly IdeType[];
  readonly framework: Framework;
}

function getRcPath(): string {
  return path.join(os.homedir(), '.headchefrc');
}

export async function loadRcConfig(): Promise<RcConfig | null> {
  const rcPath = getRcPath();
  const isExists = await fs.pathExists(rcPath);
  if (!isExists) {
    return null;
  }
  try {
    const raw = await fs.readFile(rcPath, 'utf-8');
    const parsed = JSON.parse(raw) as RcConfig;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveRcConfig(config: RcConfig): Promise<void> {
  const rcPath = getRcPath();
  const content = JSON.stringify(config, null, 2) + '\n';
  await fs.writeFile(rcPath, content, 'utf-8');
}
```

**Step 4: Run tests**

Run: `npx vitest run tests/rc.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/rc.ts tests/rc.test.ts && git commit -m "feat: add ~/.headchefrc module for remembering IDE selections"
```

---

### Task 7: Add overwrite prompt

**Files:**
- Modify: `src/prompt.ts` (add `promptOverwriteSelection`)
- Modify: `src/types.ts` (update GeneratorResult to include `conflicts`)

**Step 1: Update types — add conflicts to generator flow**

In `src/types.ts`, add a new interface for the pre-generation result:

```typescript
export interface GenerationPlan {
  readonly filesToWrite: readonly FileEntry[];
  readonly conflicts: readonly string[];
}
```

**Step 2: Add overwrite prompt function**

In `src/prompt.ts`, add:

```typescript
export async function promptOverwriteSelection(conflicts: readonly string[]): Promise<string[]> {
  if (conflicts.length === 0) {
    return [];
  }
  const choices = conflicts.map(filePath => ({
    name: filePath,
    value: filePath,
    checked: false,
  }));
  const selected = await checkbox({
    message: 'These files already exist. Select files to overwrite (enter to skip all)',
    choices,
  });
  return selected as string[];
}
```

**Step 3: Run lint**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 4: Commit**

```bash
git add src/prompt.ts src/types.ts && git commit -m "feat: add overwrite prompt and GenerationPlan type"
```

---

### Task 8: Refactor generator for overwrite support

**Files:**
- Modify: `src/generator.ts` (split into plan + execute)

**Step 1: Refactor generator**

Split `generateConfigs` into two phases: `planGeneration` (returns what to write + conflicts) and `executeGeneration` (writes files).

```typescript
import fs from 'fs-extra';
import path from 'path';
import type { GeneratorOptions, GeneratorResult, GenerationPlan, Recipe, FileEntry } from './types.js';
// ... recipe imports unchanged ...
import { detectExistingFiles } from './detector.js';
import { getGitignoreAdditions } from './templates/shared/ignore_patterns.js';

function createRecipes(): readonly Recipe[] {
  // unchanged
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

// Keep backward-compatible wrapper
export async function generateConfigs(options: GeneratorOptions): Promise<GeneratorResult> {
  const plan = await planGeneration(options);
  return writeFiles(options, plan);
}
```

**Step 2: Run full tests**

Run: `npx vitest run`
Expected: ALL PASS (backward-compatible wrapper preserves existing behavior)

**Step 3: Commit**

```bash
git add src/generator.ts && git commit -m "refactor: split generator into plan + write phases for overwrite support"
```

---

### Task 9: Wire RC file + overwrite prompt into shared command logic

**Files:**
- Modify: `src/commands/shared.ts` (integrate RC load/save + overwrite prompt)
- Modify: `src/prompt.ts` (update `promptIdeSelection` to accept defaults)

**Step 1: Update `promptIdeSelection` to accept pre-selected IDEs**

In `src/prompt.ts`:

```typescript
export async function promptIdeSelection(preSelected?: readonly IdeType[]): Promise<IdeType[]> {
  const preSelectedSet = preSelected ? new Set(preSelected) : null;
  const choices = IDE_TYPES.map(ide => ({
    name: `${IDE_METADATA[ide].displayName.padEnd(22)} (${IDE_METADATA[ide].description})`,
    value: ide,
    checked: preSelectedSet ? preSelectedSet.has(ide) : true,
  }));
  const selected = await checkbox({
    message: 'Select AI IDEs to configure (space to toggle, enter to confirm)',
    choices,
  });
  return selected as IdeType[];
}
```

**Step 2: Update `executeGeneration` in `src/commands/shared.ts`**

Import and use `loadRcConfig`, `saveRcConfig`, `promptOverwriteSelection`, `planGeneration`, `writeFiles`:

```typescript
import { planGeneration, writeFiles } from '../generator.js';
import { loadRcConfig, saveRcConfig } from '../rc.js';
import { promptIdeSelection, promptFrameworkSelection, promptOverwriteSelection } from '../prompt.js';

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
```

**Step 3: Run full tests**

Run: `npx vitest run`
Expected: ALL PASS

**Step 4: Commit**

```bash
git add src/commands/shared.ts src/prompt.ts && git commit -m "feat: integrate RC file and overwrite prompt into generation flow"
```

---

### Task 10: Update all tests and run full suite

**Step 1: Run full test suite**

Run: `npx vitest run`

**Step 2: Fix any remaining failures**

Check `tests/index.test.ts` — update `init` test assertions:
- Change `.codex/instructions.md` → `.codex/config.toml`
- Remove any assertions for `.claude/settings.json` or `.mcp.json`
- Remove any assertions for `.agent/rules/coding-style.md`

**Step 3: Run full suite again**

Run: `npx vitest run`
Expected: ALL PASS

**Step 4: Build**

Run: `npm run build`
Expected: Clean build

**Step 5: Commit**

```bash
git add -A && git commit -m "test: update all tests for v0.4 changes"
```

---

### Task 11: Update docs + version bump

**Files:**
- Modify: `package.json` (version → `0.4.0`)
- Modify: `src/index.ts` (version → `0.4.0`)
- Modify: `README.md` (update file listings, add RC file section, update test count)
- Modify: `CLAUDE.md` (update)

**Step 1: Bump version in `package.json` and `src/index.ts`**

**Step 2: Update README.md**

- Update Claude file listing (remove settings.json, .mcp.json)
- Update Cursor file listing (remove mcp.json)
- Update Codex file listing (change instructions.md → config.toml)
- Update Antigravity file listing (remove rules + workflows)
- Add `~/.headchefrc` section explaining RC behavior
- Add overwrite prompt behavior to Collision Detection section
- Update test count

**Step 3: Update CLAUDE.md**

- Add `src/rc.ts` to architecture section
- Note overwrite prompt feature

**Step 4: Build + final test**

Run: `npm run build && npx vitest run`
Expected: Clean build, ALL PASS

**Step 5: Commit**

```bash
git add -A && git commit -m "chore: bump to v0.4.0, update docs for settings cleanup + RC file + overwrite prompt"
```
