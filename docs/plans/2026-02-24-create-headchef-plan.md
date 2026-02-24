# create-headchef Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `create-headchef`, a CLI tool that scaffolds AI IDE configs (Claude Code, Cursor, Windsurf, Antigravity) with opinionated rules and starter agents.

**Architecture:** Monolithic generator with a Recipe interface per IDE. Each recipe knows which files to generate and their content. A central generator orchestrates detection of existing files, recipe execution, and output formatting. Templates stored as TypeScript template literal functions.

**Tech Stack:** Node.js 18+, TypeScript, commander (CLI), chalk (colors), fs-extra (file ops), vitest (tests), tsup (bundling)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `CLAUDE.md`

**Step 1: Initialize the project**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npm init -y`

**Step 2: Configure package.json**

Replace `package.json` with:

```json
{
  "name": "create-headchef",
  "version": "0.1.0",
  "description": "Scaffold AI IDE configs for Claude Code, Cursor, Windsurf, and Google Antigravity",
  "type": "module",
  "bin": {
    "create-headchef": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  },
  "engines": {
    "node": ">=18"
  },
  "keywords": ["cli", "ai", "ide", "claude", "cursor", "windsurf", "antigravity", "scaffold", "headchef"],
  "author": "Eventually Solutions",
  "license": "MIT",
  "files": ["dist"]
}
```

**Step 3: Install dependencies**

Run: `npm install commander chalk fs-extra`
Run: `npm install -D typescript @types/node @types/fs-extra vitest tsup`

**Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Step 5: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

**Step 6: Create tsup config (in package.json or tsup.config.ts)**

Create `tsup.config.ts`:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
```

**Step 7: Create .gitignore**

```
node_modules/
dist/
*.tsbuildinfo
.DS_Store
```

**Step 8: Create CLAUDE.md**

```markdown
# create-headchef

CLI tool that scaffolds AI IDE configuration files for Claude Code, Cursor, Windsurf, and Google Antigravity.

## Tech Stack
- Node.js 18+, TypeScript, ESM modules
- commander (CLI), chalk (colors), fs-extra (file ops)
- vitest (testing), tsup (bundling)

## Commands
- `npm run build` - Build with tsup
- `npm run dev` - Watch mode build
- `npm test` - Run vitest
- `npm run lint` - TypeScript check

## Architecture
- `src/index.ts` - CLI entry point (commander)
- `src/types.ts` - Shared types (IdeType, Framework, GeneratorOptions, FileEntry)
- `src/detector.ts` - Detects existing IDE config files
- `src/generator.ts` - Orchestrates recipe execution and file writing
- `src/recipes/` - One Recipe per IDE (claude, cursor, windsurf, antigravity)
- `src/templates/` - Template content as template literal functions

## Conventions
- One export per file
- camelCase for functions/variables, PascalCase for types/interfaces
- underscores_case for file names
- Verb-first function names
- < 20 lines per function
- Arrange-Act-Assert for tests
```

**Step 9: Initialize git**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && git init && git add -A && git commit -m "chore: initialize create-headchef project"`

---

### Task 2: Types and Interfaces

**Files:**
- Create: `src/types.ts`
- Test: `tests/types.test.ts`

**Step 1: Write the test for types**

```typescript
// tests/types.test.ts
import { describe, it, expect } from 'vitest';
import { IDE_TYPES, FRAMEWORKS, isValidIdeType, isValidFramework } from '../src/types.js';

describe('types', () => {
  describe('isValidIdeType', () => {
    it('should return true for valid IDE types', () => {
      expect(isValidIdeType('claude')).toBe(true);
      expect(isValidIdeType('cursor')).toBe(true);
      expect(isValidIdeType('windsurf')).toBe(true);
      expect(isValidIdeType('antigravity')).toBe(true);
    });

    it('should return false for invalid IDE types', () => {
      expect(isValidIdeType('vscode')).toBe(false);
      expect(isValidIdeType('')).toBe(false);
    });
  });

  describe('isValidFramework', () => {
    it('should return true for valid frameworks', () => {
      expect(isValidFramework('flutter')).toBe(true);
      expect(isValidFramework('nextjs')).toBe(true);
      expect(isValidFramework('react')).toBe(true);
      expect(isValidFramework('python')).toBe(true);
      expect(isValidFramework('general')).toBe(true);
    });

    it('should return false for invalid frameworks', () => {
      expect(isValidFramework('angular')).toBe(false);
    });
  });

  describe('constants', () => {
    it('should export IDE_TYPES array', () => {
      expect(IDE_TYPES).toEqual(['claude', 'cursor', 'windsurf', 'antigravity']);
    });

    it('should export FRAMEWORKS array', () => {
      expect(FRAMEWORKS).toEqual(['general', 'flutter', 'nextjs', 'react', 'python']);
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/types.test.ts`
Expected: FAIL - module not found

**Step 3: Implement types.ts**

```typescript
// src/types.ts
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
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/types.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/types.ts tests/types.test.ts
git commit -m "feat: add core types and interfaces"
```

---

### Task 3: Shared Template Content (Base Rules)

**Files:**
- Create: `src/templates/shared/base_rules.ts`
- Test: `tests/templates/shared/base_rules.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/shared/base_rules.test.ts
import { describe, it, expect } from 'vitest';
import { getBaseRules } from '../../../src/templates/shared/base_rules.js';

describe('getBaseRules', () => {
  it('should return non-empty string', () => {
    const rules = getBaseRules();
    expect(rules.length).toBeGreaterThan(0);
  });

  it('should contain SOLID principles section', () => {
    const rules = getBaseRules();
    expect(rules).toContain('SOLID');
  });

  it('should contain nomenclature section', () => {
    const rules = getBaseRules();
    expect(rules).toContain('PascalCase');
    expect(rules).toContain('camelCase');
  });

  it('should contain testing section', () => {
    const rules = getBaseRules();
    expect(rules).toContain('Arrange-Act-Assert');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/templates/shared/base_rules.test.ts`

**Step 3: Implement base_rules.ts**

The content should be adapted from `General Rules.md` (lines 1-154). Strip the YAML frontmatter and the Documentation Structure section (which is vault-specific). Keep everything from Basic Principles through Security Principles. This is the canonical base rules content that all IDE formats will use.

```typescript
// src/templates/shared/base_rules.ts
export function getBaseRules(): string {
  return `## Basic Principles

- Use English for all code and documentation.
- Always declare the type of each variable and function (parameters and return value).
  - Avoid using any.
  - Create necessary types.
- Don't leave blank lines within a function.
- One export per file.

## Nomenclature

- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use underscores_case for file and directory names.
- Use UPPERCASE for environment variables.
  - Avoid magic numbers and define constants.
- Start each function with a verb.
- Use verbs for boolean variables. Example: isLoading, hasError, canDelete, etc.
- Use complete words instead of abbreviations and correct spelling.
  - Except for standard abbreviations like API, URL, etc.
  - Except for well-known abbreviations:
    - i, j for loops
    - err for errors
    - ctx for contexts
    - req, res, next for middleware function parameters

## Functions

- Write short functions with a single purpose. Less than 20 instructions.
- Name functions with a verb and something else.
  - If it returns a boolean, use isX or hasX, canX, etc.
  - If it doesn't return anything, use executeX or saveX, etc.
- Avoid nesting blocks by:
  - Early checks and returns.
  - Extraction to utility functions.
- Use higher-order functions (map, filter, reduce, etc.) to avoid function nesting.
  - Use arrow functions for simple functions (less than 3 instructions).
  - Use named functions for non-simple functions.
- Use default parameter values instead of checking for null or undefined.
- Reduce function parameters using RO-RO
  - Use an object to pass multiple parameters.
  - Use an object to return results.
  - Declare necessary types for input arguments and output.
- Use a single level of abstraction.

## Data

- Don't abuse primitive types and encapsulate data in composite types.
- Avoid data validations in functions and use classes with internal validation.
- Prefer immutability for data.
  - Use readonly for data that doesn't change.
  - Use as const for literals that don't change.

## Classes

- Follow SOLID principles.
- Prefer composition over inheritance.
- Declare interfaces to define contracts.
- Write small classes with a single purpose.
  - Less than 200 instructions.
  - Less than 10 public methods.
  - Less than 10 properties.

## Exceptions

- Use exceptions to handle errors you don't expect.
- If you catch an exception, it should be to:
  - Fix an expected problem.
  - Add context.
  - Otherwise, use a global handler.

## Testing

- Follow the Arrange-Act-Assert convention for tests.
- Name test variables clearly.
  - Follow the convention: inputX, mockX, actualX, expectedX, etc.
- Write unit tests for each public function.
  - Use test doubles to simulate dependencies.
    - Except for third-party dependencies that are not expensive to execute.
- Write acceptance tests for each module.
  - Follow the Given-When-Then convention.

## SOLID Principles

### Single Responsibility Principle (S)

Each class/function should have only one reason to change. Separate concerns into different modules.

### Open/Closed Principle (O)

Software entities should be open for extension but closed for modification. Use abstractions and interfaces.

### Liskov Substitution Principle (L)

Objects of a superclass should be replaceable with objects of subclasses without breaking the application.

### Interface Segregation Principle (I)

Many client-specific interfaces are better than one general-purpose interface. Don't force implementations to depend on methods they don't use.

### Dependency Inversion Principle (D)

Depend on abstractions, not concretions. High-level modules should not depend on low-level modules.

## Design Patterns

### Repository Pattern

Abstract data access logic behind interfaces. Repositories handle data retrieval and persistence.

### Factory Pattern

Create objects without exposing creation logic. Use factories when object creation is complex.

### Strategy Pattern

Define a family of algorithms, encapsulate each one, and make them interchangeable.

### Observer Pattern

Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

## Security Principles

- Never hardcode secrets or API keys.
- Use environment variables for configuration.
- Validate all user input.
- Sanitize data before display.
- Use HTTPS for all network requests.
- Implement proper authentication/authorization.
- Keep dependencies updated.`;
}
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/templates/shared/base_rules.test.ts`

**Step 5: Commit**

```bash
git add src/templates/shared/base_rules.ts tests/templates/shared/base_rules.test.ts
git commit -m "feat: add shared base rules template"
```

---

### Task 4: Framework Rule Templates

**Files:**
- Create: `src/templates/shared/flutter_rules.ts`
- Create: `src/templates/shared/nextjs_rules.ts`
- Create: `src/templates/shared/react_rules.ts`
- Create: `src/templates/shared/python_rules.ts`
- Test: `tests/templates/shared/framework_rules.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/shared/framework_rules.test.ts
import { describe, it, expect } from 'vitest';
import { getFlutterRules } from '../../../src/templates/shared/flutter_rules.js';
import { getNextjsRules } from '../../../src/templates/shared/nextjs_rules.js';
import { getReactRules } from '../../../src/templates/shared/react_rules.js';
import { getPythonRules } from '../../../src/templates/shared/python_rules.js';

describe('framework rules', () => {
  it('should return Flutter rules with Dart conventions', () => {
    const rules = getFlutterRules();
    expect(rules).toContain('Flutter');
    expect(rules).toContain('Dart');
    expect(rules).toContain('Widget');
  });

  it('should return Next.js rules with RSC conventions', () => {
    const rules = getNextjsRules();
    expect(rules).toContain('Next.js');
    expect(rules).toContain('Server Component');
  });

  it('should return React rules with hooks conventions', () => {
    const rules = getReactRules();
    expect(rules).toContain('React');
    expect(rules).toContain('hook');
  });

  it('should return Python rules with PEP 8', () => {
    const rules = getPythonRules();
    expect(rules).toContain('Python');
    expect(rules).toContain('PEP');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/templates/shared/framework_rules.test.ts`

**Step 3: Implement all four framework rule files**

Each file exports a single function (`getFlutterRules`, `getNextjsRules`, etc.) returning the framework-specific markdown content. Source material:
- Flutter: adapted from `Flutter Rules.md` (the "Specific to Flutter" section, lines 94-400)
- Next.js: adapted from `Web Rules.md` (the web-specific sections)
- React: a subset of the web rules focused on React without Next.js specifics
- Python: original content following the same pattern for Python/FastAPI

Keep each template focused — no package version lists (those change too fast). Focus on architecture, patterns, and conventions.

**Step 4: Run test to verify it passes**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/templates/shared/framework_rules.test.ts`

**Step 5: Commit**

```bash
git add src/templates/shared/ tests/templates/shared/framework_rules.test.ts
git commit -m "feat: add framework-specific rule templates"
```

---

### Task 5: Claude Recipe Templates

**Files:**
- Create: `src/templates/claude/claude_md.ts`
- Create: `src/templates/claude/settings.ts`
- Create: `src/templates/claude/agents.ts`
- Create: `src/templates/claude/commands.ts`
- Test: `tests/templates/claude/claude_templates.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/claude/claude_templates.test.ts
import { describe, it, expect } from 'vitest';
import { generateClaudeMd } from '../../../src/templates/claude/claude_md.js';
import { generateClaudeSettings } from '../../../src/templates/claude/settings.js';
import { generatePrReviewerAgent, generateCodeReviewerAgent } from '../../../src/templates/claude/agents.js';
import { generateReviewCommand } from '../../../src/templates/claude/commands.js';

describe('claude templates', () => {
  it('should generate CLAUDE.md with framework section', () => {
    const result = generateClaudeMd('flutter');
    expect(result).toContain('# Project');
    expect(result).toContain('Flutter');
  });

  it('should generate CLAUDE.md with general framework', () => {
    const result = generateClaudeMd('general');
    expect(result).toContain('# Project');
    expect(result).not.toContain('Flutter');
  });

  it('should generate settings.json', () => {
    const result = generateClaudeSettings();
    expect(JSON.parse(result)).toHaveProperty('permissions');
  });

  it('should generate pr-reviewer agent with YAML frontmatter', () => {
    const result = generatePrReviewerAgent();
    expect(result).toContain('---');
    expect(result).toContain('name: pr-reviewer');
  });

  it('should generate code-reviewer agent', () => {
    const result = generateCodeReviewerAgent();
    expect(result).toContain('name: code-reviewer');
  });

  it('should generate review command', () => {
    const result = generateReviewCommand();
    expect(result).toContain('review');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/templates/claude/claude_templates.test.ts`

**Step 3: Implement all Claude template files**

- `claude_md.ts`: Takes a `Framework` parameter, composes base rules + framework rules into CLAUDE.md format with sections: Project, Tech Stack, Conventions, Commands, Architecture
- `settings.ts`: Generates `.claude/settings.json` with empty permissions allow list
- `agents.ts`: Generates pr-reviewer.md and code-reviewer.md with YAML frontmatter. Adapted from fieldservice-app agents but made generic (remove Flutter/Fortytools specifics, keep the review structure)
- `commands.ts`: Generates review.md slash command

**Step 4: Run test to verify it passes**

**Step 5: Commit**

```bash
git add src/templates/claude/ tests/templates/claude/
git commit -m "feat: add Claude Code template files"
```

---

### Task 6: Cursor Recipe Templates

**Files:**
- Create: `src/templates/cursor/general_mdc.ts`
- Create: `src/templates/cursor/mcp_json.ts`
- Create: `src/templates/cursor/ignore_files.ts`
- Test: `tests/templates/cursor/cursor_templates.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/cursor/cursor_templates.test.ts
import { describe, it, expect } from 'vitest';
import { generateGeneralMdc, generateFrameworkMdc } from '../../../src/templates/cursor/general_mdc.js';
import { generateCursorMcpJson } from '../../../src/templates/cursor/mcp_json.js';
import { generateCursorIgnore, generateCursorIndexingIgnore } from '../../../src/templates/cursor/ignore_files.js';

describe('cursor templates', () => {
  it('should generate general.mdc with alwaysApply frontmatter', () => {
    const result = generateGeneralMdc();
    expect(result).toContain('---');
    expect(result).toContain('alwaysApply: true');
  });

  it('should generate framework mdc with globs', () => {
    const result = generateFrameworkMdc('flutter');
    expect(result).toContain('globs:');
    expect(result).toContain('Flutter');
  });

  it('should return null for general framework', () => {
    const result = generateFrameworkMdc('general');
    expect(result).toBeNull();
  });

  it('should generate mcp.json', () => {
    const result = generateCursorMcpJson();
    expect(JSON.parse(result)).toHaveProperty('mcpServers');
  });

  it('should generate .cursorignore', () => {
    const result = generateCursorIgnore();
    expect(result).toContain('node_modules');
  });

  it('should generate .cursorindexingignore', () => {
    const result = generateCursorIndexingIgnore();
    expect(result).toContain('dist');
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement Cursor templates**

- `general_mdc.ts`: Wraps base rules in `.mdc` format with `alwaysApply: true` YAML frontmatter
- Framework MDC: wraps framework rules with appropriate `globs` (e.g., `"*.dart,lib/**/*.dart"` for Flutter, `"*.tsx,*.ts,app/**/*"` for Next.js). Returns null for `general` framework
- `mcp_json.ts`: Empty `{ "mcpServers": {} }`
- `ignore_files.ts`: Standard ignore patterns

**Step 4: Run test to verify it passes**

**Step 5: Commit**

```bash
git add src/templates/cursor/ tests/templates/cursor/
git commit -m "feat: add Cursor template files"
```

---

### Task 7: Windsurf Recipe Templates

**Files:**
- Create: `src/templates/windsurf/general_md.ts`
- Create: `src/templates/windsurf/ignore_file.ts`
- Test: `tests/templates/windsurf/windsurf_templates.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/windsurf/windsurf_templates.test.ts
import { describe, it, expect } from 'vitest';
import { generateWindsurfGeneralMd, generateWindsurfFrameworkMd } from '../../../src/templates/windsurf/general_md.js';
import { generateCodeiumIgnore } from '../../../src/templates/windsurf/ignore_file.js';

describe('windsurf templates', () => {
  it('should generate general.md as plain markdown (no frontmatter)', () => {
    const result = generateWindsurfGeneralMd();
    expect(result).not.toMatch(/^---/);
    expect(result).toContain('## Basic Principles');
  });

  it('should generate framework md for flutter', () => {
    const result = generateWindsurfFrameworkMd('flutter');
    expect(result).toContain('Flutter');
  });

  it('should return null for general framework', () => {
    const result = generateWindsurfFrameworkMd('general');
    expect(result).toBeNull();
  });

  it('should generate .codeiumignore', () => {
    const result = generateCodeiumIgnore();
    expect(result).toContain('node_modules');
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement Windsurf templates**

- `general_md.ts`: Plain markdown, same base rules but NO YAML frontmatter (Windsurf format). Add a title header `# Coding Standards`.
- Framework MD: plain markdown with framework-specific rules. Returns null for `general`.
- `ignore_file.ts`: `.codeiumignore` content

**Step 4: Run test to verify it passes**

**Step 5: Commit**

```bash
git add src/templates/windsurf/ tests/templates/windsurf/
git commit -m "feat: add Windsurf template files"
```

---

### Task 8: Antigravity Recipe Templates

**Files:**
- Create: `src/templates/antigravity/gemini_md.ts`
- Create: `src/templates/antigravity/rules.ts`
- Create: `src/templates/antigravity/skills.ts`
- Create: `src/templates/antigravity/workflows.ts`
- Test: `tests/templates/antigravity/antigravity_templates.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/antigravity/antigravity_templates.test.ts
import { describe, it, expect } from 'vitest';
import { generateGeminiMd } from '../../../src/templates/antigravity/gemini_md.js';
import { generateCodingStyleRules } from '../../../src/templates/antigravity/rules.js';
import { generatePrReviewerSkill, generateCodeReviewerSkill } from '../../../src/templates/antigravity/skills.js';
import { generateReviewWorkflow } from '../../../src/templates/antigravity/workflows.js';

describe('antigravity templates', () => {
  it('should generate GEMINI.md with framework content', () => {
    const result = generateGeminiMd('flutter');
    expect(result).toContain('Flutter');
  });

  it('should generate coding-style.md rules', () => {
    const result = generateCodingStyleRules();
    expect(result).toContain('Nomenclature');
  });

  it('should generate pr-reviewer SKILL.md with YAML frontmatter', () => {
    const result = generatePrReviewerSkill();
    expect(result).toContain('---');
    expect(result).toContain('name: pr-reviewer');
  });

  it('should generate code-reviewer SKILL.md', () => {
    const result = generateCodeReviewerSkill();
    expect(result).toContain('name: code-reviewer');
  });

  it('should generate review workflow', () => {
    const result = generateReviewWorkflow();
    expect(result).toContain('review');
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement Antigravity templates**

- `gemini_md.ts`: Takes Framework, generates root GEMINI.md with base + framework rules. Plain markdown format.
- `rules.ts`: Generates `.agent/rules/coding-style.md` - condensed coding standards
- `skills.ts`: Generates SKILL.md files with YAML frontmatter (`name`, `description`). PR reviewer skill is a generic version of the fieldservice-app agent.
- `workflows.ts`: Generates `.agent/workflows/review.md` - simple review workflow

**Step 4: Run test to verify it passes**

**Step 5: Commit**

```bash
git add src/templates/antigravity/ tests/templates/antigravity/
git commit -m "feat: add Antigravity template files"
```

---

### Task 9: Shared Ignore and Gitignore Templates

**Files:**
- Create: `src/templates/shared/ignore_patterns.ts`
- Test: `tests/templates/shared/ignore_patterns.test.ts`

**Step 1: Write the test**

```typescript
// tests/templates/shared/ignore_patterns.test.ts
import { describe, it, expect } from 'vitest';
import { getCommonIgnorePatterns, getGitignoreAdditions } from '../../../src/templates/shared/ignore_patterns.js';

describe('ignore patterns', () => {
  it('should return common ignore patterns', () => {
    const patterns = getCommonIgnorePatterns();
    expect(patterns).toContain('node_modules/');
    expect(patterns).toContain('.env');
    expect(patterns).toContain('.DS_Store');
  });

  it('should return gitignore additions for AI IDE local files', () => {
    const additions = getGitignoreAdditions();
    expect(additions).toContain('.claude/settings.local.json');
  });
});
```

**Step 2: Run test, implement, run test, commit**

```bash
git add src/templates/shared/ignore_patterns.ts tests/templates/shared/ignore_patterns.test.ts
git commit -m "feat: add shared ignore pattern templates"
```

---

### Task 10: Recipe Implementations

**Files:**
- Create: `src/recipes/claude.recipe.ts`
- Create: `src/recipes/cursor.recipe.ts`
- Create: `src/recipes/windsurf.recipe.ts`
- Create: `src/recipes/antigravity.recipe.ts`
- Test: `tests/recipes/claude.recipe.test.ts`
- Test: `tests/recipes/cursor.recipe.test.ts`
- Test: `tests/recipes/windsurf.recipe.test.ts`
- Test: `tests/recipes/antigravity.recipe.test.ts`

**Step 1: Write Claude recipe test**

```typescript
// tests/recipes/claude.recipe.test.ts
import { describe, it, expect } from 'vitest';
import { ClaudeRecipe } from '../../src/recipes/claude.recipe.js';

describe('ClaudeRecipe', () => {
  const recipe = new ClaudeRecipe();

  it('should have name "claude"', () => {
    expect(recipe.name).toBe('claude');
  });

  it('should generate CLAUDE.md file', () => {
    const files = recipe.generateFiles({
      targetDir: '/tmp/test',
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    const paths = files.map(f => f.path);
    expect(paths).toContain('CLAUDE.md');
  });

  it('should generate .claude/settings.json', () => {
    const files = recipe.generateFiles({
      targetDir: '/tmp/test',
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    const paths = files.map(f => f.path);
    expect(paths).toContain('.claude/settings.json');
  });

  it('should generate agent files', () => {
    const files = recipe.generateFiles({
      targetDir: '/tmp/test',
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    const paths = files.map(f => f.path);
    expect(paths).toContain('.claude/agents/pr-reviewer.md');
    expect(paths).toContain('.claude/agents/code-reviewer.md');
  });

  it('should generate command files', () => {
    const files = recipe.generateFiles({
      targetDir: '/tmp/test',
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    const paths = files.map(f => f.path);
    expect(paths).toContain('.claude/commands/review.md');
  });

  it('should generate .mcp.json', () => {
    const files = recipe.generateFiles({
      targetDir: '/tmp/test',
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    const paths = files.map(f => f.path);
    expect(paths).toContain('.mcp.json');
  });

  it('should include framework-specific content for flutter', () => {
    const files = recipe.generateFiles({
      targetDir: '/tmp/test',
      ides: ['claude'],
      framework: 'flutter',
      force: false,
      dryRun: false,
    });
    const claudeMd = files.find(f => f.path === 'CLAUDE.md');
    expect(claudeMd?.content).toContain('Flutter');
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement ClaudeRecipe**

```typescript
// src/recipes/claude.recipe.ts
import type { Recipe, GeneratorOptions, FileEntry } from '../types.js';
import { generateClaudeMd } from '../templates/claude/claude_md.js';
import { generateClaudeSettings } from '../templates/claude/settings.js';
import { generatePrReviewerAgent, generateCodeReviewerAgent } from '../templates/claude/agents.js';
import { generateReviewCommand } from '../templates/claude/commands.js';

export class ClaudeRecipe implements Recipe {
  readonly name = 'claude' as const;

  generateFiles(options: GeneratorOptions): readonly FileEntry[] {
    return [
      { path: 'CLAUDE.md', content: generateClaudeMd(options.framework) },
      { path: '.claude/settings.json', content: generateClaudeSettings() },
      { path: '.claude/agents/pr-reviewer.md', content: generatePrReviewerAgent() },
      { path: '.claude/agents/code-reviewer.md', content: generateCodeReviewerAgent() },
      { path: '.claude/commands/review.md', content: generateReviewCommand() },
      { path: '.mcp.json', content: '{\n  "mcpServers": {}\n}\n' },
    ];
  }
}
```

**Step 4: Run test to verify it passes**

**Step 5: Repeat for Cursor, Windsurf, and Antigravity recipes**

Each recipe follows the same pattern: implements `Recipe` interface, returns array of `FileEntry` objects using the corresponding template functions.

- **CursorRecipe** generates: `.cursor/rules/general.mdc`, `.cursor/rules/{framework}.mdc` (if not general), `.cursor/mcp.json`, `.cursorignore`, `.cursorindexingignore`
- **WindsurfRecipe** generates: `.windsurf/rules/general.md`, `.windsurf/rules/{framework}.md` (if not general), `.codeiumignore`
- **AntigravityRecipe** generates: `GEMINI.md`, `.agent/rules/coding-style.md`, `.agent/skills/pr-reviewer/SKILL.md`, `.agent/skills/code-reviewer/SKILL.md`, `.agent/workflows/review.md`

**Step 6: Run all recipe tests**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/recipes/`

**Step 7: Commit**

```bash
git add src/recipes/ tests/recipes/
git commit -m "feat: add recipe implementations for all four IDEs"
```

---

### Task 11: Detector (Existing Config Detection)

**Files:**
- Create: `src/detector.ts`
- Test: `tests/detector.test.ts`

**Step 1: Write the test**

```typescript
// tests/detector.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { detectExistingFiles } from '../src/detector.js';

describe('detectExistingFiles', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-test-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should return empty array when no configs exist', async () => {
    const existing = await detectExistingFiles(tmpDir, ['CLAUDE.md', '.cursor/rules/general.mdc']);
    expect(existing).toEqual([]);
  });

  it('should detect existing files', async () => {
    await fs.writeFile(path.join(tmpDir, 'CLAUDE.md'), 'test');
    const existing = await detectExistingFiles(tmpDir, ['CLAUDE.md', '.cursor/rules/general.mdc']);
    expect(existing).toEqual(['CLAUDE.md']);
  });

  it('should detect existing files in subdirectories', async () => {
    await fs.ensureDir(path.join(tmpDir, '.claude'));
    await fs.writeFile(path.join(tmpDir, '.claude/settings.json'), '{}');
    const existing = await detectExistingFiles(tmpDir, ['.claude/settings.json']);
    expect(existing).toEqual(['.claude/settings.json']);
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement detector.ts**

```typescript
// src/detector.ts
import fs from 'fs-extra';
import path from 'path';

export async function detectExistingFiles(targetDir: string, filePaths: readonly string[]): Promise<string[]> {
  const existing: string[] = [];
  for (const filePath of filePaths) {
    const fullPath = path.join(targetDir, filePath);
    if (await fs.pathExists(fullPath)) {
      existing.push(filePath);
    }
  }
  return existing;
}
```

**Step 4: Run test to verify it passes**

**Step 5: Commit**

```bash
git add src/detector.ts tests/detector.test.ts
git commit -m "feat: add existing config file detector"
```

---

### Task 12: Generator (Orchestration)

**Files:**
- Create: `src/generator.ts`
- Test: `tests/generator.test.ts`

**Step 1: Write the test**

```typescript
// tests/generator.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { generateConfigs } from '../src/generator.js';

describe('generateConfigs', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-gen-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should generate all IDE files by default', async () => {
    const result = await generateConfigs({
      targetDir: tmpDir,
      ides: ['claude', 'cursor', 'windsurf', 'antigravity'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    expect(result.generated.length).toBeGreaterThan(0);
    expect(result.skipped).toEqual([]);
    expect(await fs.pathExists(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, 'GEMINI.md'))).toBe(true);
  });

  it('should skip existing files without --force', async () => {
    await fs.writeFile(path.join(tmpDir, 'CLAUDE.md'), 'existing');
    const result = await generateConfigs({
      targetDir: tmpDir,
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    expect(result.skipped).toContain('CLAUDE.md');
    const content = await fs.readFile(path.join(tmpDir, 'CLAUDE.md'), 'utf-8');
    expect(content).toBe('existing');
  });

  it('should overwrite existing files with --force', async () => {
    await fs.writeFile(path.join(tmpDir, 'CLAUDE.md'), 'existing');
    const result = await generateConfigs({
      targetDir: tmpDir,
      ides: ['claude'],
      framework: 'general',
      force: true,
      dryRun: false,
    });
    expect(result.generated).toContain('CLAUDE.md');
    const content = await fs.readFile(path.join(tmpDir, 'CLAUDE.md'), 'utf-8');
    expect(content).not.toBe('existing');
  });

  it('should not write files in dry-run mode', async () => {
    const result = await generateConfigs({
      targetDir: tmpDir,
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: true,
    });
    expect(result.generated.length).toBeGreaterThan(0);
    expect(await fs.pathExists(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });

  it('should only generate for specified IDEs', async () => {
    const result = await generateConfigs({
      targetDir: tmpDir,
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    expect(await fs.pathExists(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(await fs.pathExists(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(false);
    expect(await fs.pathExists(path.join(tmpDir, 'GEMINI.md'))).toBe(false);
  });

  it('should generate .gitignore.headchef', async () => {
    const result = await generateConfigs({
      targetDir: tmpDir,
      ides: ['claude'],
      framework: 'general',
      force: false,
      dryRun: false,
    });
    expect(await fs.pathExists(path.join(tmpDir, '.gitignore.headchef'))).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement generator.ts**

```typescript
// src/generator.ts
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
  // Always add .gitignore.headchef
  allFiles.push({ path: '.gitignore.headchef', content: getGitignoreAdditions() });
  const allPaths = allFiles.map(f => f.path);
  const existingPaths = options.force ? [] : await detectExistingFiles(options.targetDir, allPaths);
  const generated: string[] = [];
  const skipped: string[] = [...existingPaths];
  for (const file of allFiles) {
    if (existingPaths.includes(file.path)) continue;
    generated.push(file.path);
    if (!options.dryRun) {
      const fullPath = path.join(options.targetDir, file.path);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.content, 'utf-8');
    }
  }
  return { generated, skipped };
}
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/generator.test.ts`

**Step 5: Commit**

```bash
git add src/generator.ts tests/generator.test.ts
git commit -m "feat: add generator orchestration with collision detection"
```

---

### Task 13: CLI Entry Point

**Files:**
- Create: `src/index.ts`
- Test: `tests/index.test.ts` (integration test)

**Step 1: Write the integration test**

```typescript
// tests/index.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('CLI integration', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'headchef-cli-'));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it('should generate all configs with default options', () => {
    execSync(`npx tsx src/index.ts --target ${tmpDir}`, {
      cwd: '/Users/sercanyusuf/EventuallySolutions/cocktail',
    });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.windsurf/rules/general.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(true);
  });

  it('should only generate claude with --only claude', () => {
    execSync(`npx tsx src/index.ts --target ${tmpDir} --only claude`, {
      cwd: '/Users/sercanyusuf/EventuallySolutions/cocktail',
    });
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
    expect(fs.pathExistsSync(path.join(tmpDir, '.cursor/rules/general.mdc'))).toBe(false);
  });

  it('should show --list output', () => {
    const output = execSync(`npx tsx src/index.ts --list`, {
      cwd: '/Users/sercanyusuf/EventuallySolutions/cocktail',
      encoding: 'utf-8',
    });
    expect(output).toContain('claude');
    expect(output).toContain('cursor');
    expect(output).toContain('flutter');
  });

  it('should show dry-run output without writing', () => {
    const output = execSync(`npx tsx src/index.ts --target ${tmpDir} --dry-run`, {
      cwd: '/Users/sercanyusuf/EventuallySolutions/cocktail',
      encoding: 'utf-8',
    });
    expect(output).toContain('CLAUDE.md');
    expect(fs.pathExistsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(false);
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Implement src/index.ts**

```typescript
// src/index.ts
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
  .option('--target <dir>', 'Target directory (default: current directory)', process.cwd())
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
  let ides = [...IDE_TYPES];
  if (only) {
    ides = only.filter(isValidIdeType);
    if (ides.length === 0) {
      console.error(chalk.red(`Invalid IDE types. Available: ${IDE_TYPES.join(', ')}`));
      process.exit(1);
    }
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
}

program.parse();
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run tests/index.test.ts`

**Step 5: Commit**

```bash
git add src/index.ts tests/index.test.ts
git commit -m "feat: add CLI entry point with commander"
```

---

### Task 14: Build and Manual Test

**Files:**
- None (verification only)

**Step 1: Run all tests**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npx vitest run`
Expected: All tests pass

**Step 2: Build the project**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npm run build`
Expected: `dist/index.js` created with shebang

**Step 3: Test the built CLI manually**

Run: `cd /tmp && mkdir headchef-test && cd headchef-test && node /Users/sercanyusuf/EventuallySolutions/cocktail/dist/index.js`

Expected: All files generated in `/tmp/headchef-test/`

**Step 4: Test with flags**

Run: `node /Users/sercanyusuf/EventuallySolutions/cocktail/dist/index.js --only claude --framework flutter --target /tmp/headchef-test2`

**Step 5: Test --list**

Run: `node /Users/sercanyusuf/EventuallySolutions/cocktail/dist/index.js --list`

**Step 6: Test --dry-run**

Run: `node /Users/sercanyusuf/EventuallySolutions/cocktail/dist/index.js --dry-run --target /tmp/headchef-dry`

**Step 7: Test collision detection**

Run again in the same directory and verify files are skipped.

**Step 8: Commit final state**

```bash
git add -A
git commit -m "chore: verify build and all tests pass"
```

---

### Task 15: Link and Test as npx

**Files:**
- None (verification only)

**Step 1: Link the package locally**

Run: `cd /Users/sercanyusuf/EventuallySolutions/cocktail && npm link`

**Step 2: Test global command**

Run: `cd /tmp && mkdir headchef-link-test && create-headchef --target /tmp/headchef-link-test --framework nextjs`

**Step 3: Unlink when done testing**

Run: `npm unlink -g create-headchef`

**Step 4: Final commit**

```bash
cd /Users/sercanyusuf/EventuallySolutions/cocktail
git add -A
git commit -m "chore: ready for npm publish"
```

---

## Summary

| Task | What | Files | Est. Steps |
|------|------|-------|-----------|
| 1 | Project scaffolding | package.json, tsconfig, configs | 9 |
| 2 | Types and interfaces | types.ts + test | 5 |
| 3 | Base rules template | base_rules.ts + test | 5 |
| 4 | Framework rule templates | 4 framework files + test | 5 |
| 5 | Claude templates | 4 template files + test | 5 |
| 6 | Cursor templates | 3 template files + test | 5 |
| 7 | Windsurf templates | 2 template files + test | 5 |
| 8 | Antigravity templates | 4 template files + test | 5 |
| 9 | Ignore patterns | ignore_patterns.ts + test | 4 |
| 10 | Recipe implementations | 4 recipe files + 4 tests | 7 |
| 11 | Detector | detector.ts + test | 5 |
| 12 | Generator orchestration | generator.ts + test | 5 |
| 13 | CLI entry point | index.ts + integration test | 5 |
| 14 | Build and manual test | verification | 8 |
| 15 | Link and test as npx | verification | 4 |

**Total: 15 tasks, ~83 steps**

Build order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15

Dependencies flow bottom-up: types → templates → recipes → detector → generator → CLI
