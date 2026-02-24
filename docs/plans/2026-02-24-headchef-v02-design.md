# Design: create-headchef v0.2

**Date:** 2026-02-24
**Status:** Approved
**Author:** Sercan Yusuf + Claude

## Summary

Upgrade `create-headchef` from 4 IDEs to 14 IDEs, add 5 rich agent templates (adapted from hallucinated project), and replace the flags-only CLI with an interactive checkbox prompt where all IDEs are pre-selected and the user can deselect with space or press enter to continue.

## Changes from v0.1

### 1. Interactive Checkbox UI

**New dependency:** `@inquirer/prompts`

When user runs `npx create-headchef` with no `--only`/`--exclude` flags, show interactive prompts:

```
🍸 headchef - Mixing your AI IDE configs...

? Select AI IDEs to configure: (space to toggle, enter to confirm)
 ◉ Claude Code          (.claude/, CLAUDE.md)
 ◉ Cursor               (.cursor/rules/)
 ◉ Windsurf             (.windsurf/rules/)
 ◉ Google Antigravity   (.agent/, GEMINI.md)
 ◉ GitHub Copilot       (.github/copilot-instructions.md)
 ◉ Cline / Roo Code     (.clinerules, .roo/rules/)
 ◉ Continue.dev         (.continue/rules/)
 ◉ Amazon Q Developer   (.amazonq/rules/)
 ◉ JetBrains AI         (.aiassistant/rules/)
 ◉ Aider                (.aider.conf.yml, CONVENTIONS.md)
 ◉ Trae                 (.trae/rules/)
 ◉ Augment Code         (.augment/rules/)
 ◉ OpenAI Codex         (.codex/)
 ◉ AGENTS.md            (AGENTS.md - universal)

? Select framework: (arrow keys, enter)
❯ general
  flutter
  nextjs
  react
  python
```

All IDEs pre-selected by default. User presses space to deselect, enter to confirm.

**Flag behavior (skips interactive mode):**
- `--only claude cursor` — skip prompts, only specified IDEs
- `--exclude windsurf` — skip prompts, all except specified
- `--no-interactive` — skip prompts, use all IDEs (CI/CD usage)
- `--framework flutter` — skip framework prompt, use specified

### 2. Ten New IDE Recipes

| IDE | Identifier | Files Generated | Format |
|-----|-----------|----------------|--------|
| GitHub Copilot | `copilot` | `.github/copilot-instructions.md` | Plain MD |
| Cline / Roo Code | `cline` | `.clinerules`, `.roo/rules/general.md`, `.roo/rules/{framework}.md` | Plain MD |
| Continue.dev | `continuedev` | `.continue/rules/general.md` | MD + YAML frontmatter |
| Amazon Q Developer | `amazonq` | `.amazonq/rules/general.md` | Plain MD |
| JetBrains AI | `jetbrains` | `.aiassistant/rules/general.md` | Plain MD |
| Aider | `aider` | `.aider.conf.yml`, `CONVENTIONS.md` | YAML + MD |
| Trae (ByteDance) | `trae` | `.trae/rules/general.md` | MD + YAML frontmatter |
| Augment Code | `augment` | `.augment/rules/general.md` | MD + YAML frontmatter |
| OpenAI Codex | `codex` | `.codex/instructions.md` | Plain MD |
| AGENTS.md | `agentsmd` | `AGENTS.md` | Plain MD (universal) |

### 3. Five Rich Agent Templates

Adapted from hallucinated project's agents, made generic (no project-specific references). Each agent is ~80-120 lines with YAML frontmatter, detailed process, output format, and anti-patterns.

| Agent | Claude Path | Antigravity Path |
|-------|-------------|-----------------|
| code-reviewer | `.claude/agents/code-reviewer.md` | `.agent/skills/code-reviewer/SKILL.md` |
| test-writer | `.claude/agents/test-writer.md` | `.agent/skills/test-writer/SKILL.md` |
| bug-debugger | `.claude/agents/bug-debugger.md` | `.agent/skills/bug-debugger/SKILL.md` |
| architecture-planner | `.claude/agents/architecture-planner.md` | `.agent/skills/architecture-planner/SKILL.md` |
| docs-keeper | `.claude/agents/docs-keeper.md` | `.agent/skills/docs-keeper/SKILL.md` |

**Agent frontmatter format (Claude):**
```yaml
---
name: {agent-slug}
description: {when to use, with examples}
model: inherit
---
```

**Skill frontmatter format (Antigravity):**
```yaml
---
name: {skill-slug}
description: {when to trigger}
---
```

### 4. Updated Types

```typescript
export const IDE_TYPES = [
  'claude', 'cursor', 'windsurf', 'antigravity',
  'copilot', 'cline', 'continuedev', 'amazonq',
  'jetbrains', 'aider', 'trae', 'augment',
  'codex', 'agentsmd'
] as const;
```

### 5. IDE Display Metadata

For the interactive prompt, each IDE needs a display name and description:

```typescript
export const IDE_METADATA: Record<IdeType, { displayName: string; description: string }> = {
  claude: { displayName: 'Claude Code', description: '.claude/, CLAUDE.md' },
  cursor: { displayName: 'Cursor', description: '.cursor/rules/' },
  windsurf: { displayName: 'Windsurf', description: '.windsurf/rules/' },
  antigravity: { displayName: 'Google Antigravity', description: '.agent/, GEMINI.md' },
  copilot: { displayName: 'GitHub Copilot', description: '.github/copilot-instructions.md' },
  cline: { displayName: 'Cline / Roo Code', description: '.clinerules, .roo/rules/' },
  continuedev: { displayName: 'Continue.dev', description: '.continue/rules/' },
  amazonq: { displayName: 'Amazon Q Developer', description: '.amazonq/rules/' },
  jetbrains: { displayName: 'JetBrains AI', description: '.aiassistant/rules/' },
  aider: { displayName: 'Aider', description: '.aider.conf.yml, CONVENTIONS.md' },
  trae: { displayName: 'Trae', description: '.trae/rules/' },
  augment: { displayName: 'Augment Code', description: '.augment/rules/' },
  codex: { displayName: 'OpenAI Codex', description: '.codex/' },
  agentsmd: { displayName: 'AGENTS.md', description: 'AGENTS.md - universal standard' },
};
```

### 6. Updated File Structure

```
src/
├── index.ts                          # CLI with interactive prompts
├── prompt.ts                         # NEW: Interactive prompt logic
├── generator.ts                      # Updated to handle 14 IDEs
├── detector.ts                       # Unchanged
├── types.ts                          # Updated with 14 IDE types + metadata
├── recipes/
│   ├── claude.recipe.ts              # Updated: 5 agents, remove pr-reviewer
│   ├── cursor.recipe.ts              # Unchanged
│   ├── windsurf.recipe.ts            # Unchanged
│   ├── antigravity.recipe.ts         # Updated: 5 skills, remove pr-reviewer
│   ├── copilot.recipe.ts             # NEW
│   ├── cline.recipe.ts               # NEW
│   ├── continue_dev.recipe.ts        # NEW
│   ├── amazon_q.recipe.ts            # NEW
│   ├── jetbrains.recipe.ts           # NEW
│   ├── aider.recipe.ts               # NEW
│   ├── trae.recipe.ts                # NEW
│   ├── augment.recipe.ts             # NEW
│   ├── codex.recipe.ts               # NEW
│   └── agents_md.recipe.ts           # NEW
└── templates/
    ├── shared/                        # Unchanged
    ├── claude/
    │   ├── claude_md.ts               # Unchanged
    │   ├── settings.ts                # Unchanged
    │   ├── agents.ts                  # Updated: 5 agents
    │   └── commands.ts                # Unchanged
    ├── cursor/                        # Unchanged
    ├── windsurf/                      # Unchanged
    ├── antigravity/
    │   ├── gemini_md.ts               # Unchanged
    │   ├── rules.ts                   # Unchanged
    │   ├── skills.ts                  # Updated: 5 skills
    │   └── workflows.ts              # Unchanged
    ├── agents/                        # NEW: shared agent content
    │   ├── code_reviewer.ts           # Generic code-reviewer content
    │   ├── test_writer.ts             # Generic test-writer content
    │   ├── bug_debugger.ts            # Generic bug-debugger content
    │   ├── architecture_planner.ts    # Generic architecture-planner content
    │   └── docs_keeper.ts            # Generic docs-keeper content
    ├── copilot/                       # NEW
    │   └── instructions.ts
    ├── cline/                         # NEW
    │   └── rules.ts
    ├── continue_dev/                  # NEW
    │   └── rules.ts
    ├── amazon_q/                      # NEW
    │   └── rules.ts
    ├── jetbrains/                     # NEW
    │   └── rules.ts
    ├── aider/                         # NEW
    │   ├── config.ts
    │   └── conventions.ts
    ├── trae/                          # NEW
    │   └── rules.ts
    ├── augment/                       # NEW
    │   └── rules.ts
    ├── codex/                         # NEW
    │   └── instructions.ts
    └── agents_md/                     # NEW
        └── agents_md.ts
```

### 7. New IDE Recipe Details

#### GitHub Copilot (`copilot`)
- `.github/copilot-instructions.md` — Plain markdown with base rules + framework rules

#### Cline / Roo Code (`cline`)
- `.clinerules` — Plain markdown, single file with base rules
- `.roo/rules/general.md` — Base rules
- `.roo/rules/{framework}.md` — Framework rules (if not general)

#### Continue.dev (`continuedev`)
- `.continue/rules/general.md` — MD with YAML frontmatter:
  ```yaml
  ---
  name: coding-standards
  globs: "**/*"
  ---
  ```

#### Amazon Q Developer (`amazonq`)
- `.amazonq/rules/general.md` — Plain markdown with base rules

#### JetBrains AI (`jetbrains`)
- `.aiassistant/rules/general.md` — Plain markdown with base rules

#### Aider (`aider`)
- `.aider.conf.yml` — YAML config:
  ```yaml
  read:
    - CONVENTIONS.md
  lint-cmd: npm run lint
  auto-commits: true
  ```
- `CONVENTIONS.md` — Plain markdown with base rules + framework rules

#### Trae (`trae`)
- `.trae/rules/general.md` — MD with YAML frontmatter:
  ```yaml
  ---
  description: "Coding standards and conventions"
  globs: "**/*"
  alwaysApply: true
  ---
  ```

#### Augment Code (`augment`)
- `.augment/rules/general.md` — MD with YAML frontmatter:
  ```yaml
  ---
  description: "Coding standards and conventions"
  globs: "**/*"
  ---
  ```

#### OpenAI Codex (`codex`)
- `.codex/instructions.md` — Plain markdown with base rules + framework rules

#### AGENTS.md (`agentsmd`)
- `AGENTS.md` — Plain markdown, universal format:
  ```markdown
  # AGENTS.md

  ## Build & Test Commands
  [commands]

  ## Code Style & Conventions
  [base rules]

  ## Framework Guidelines
  [framework rules if applicable]

  ## Don'ts
  [boundaries]
  ```

### 8. Dependencies Update

**Add:** `@inquirer/prompts`
**Keep:** `commander`, `chalk`, `fs-extra`
