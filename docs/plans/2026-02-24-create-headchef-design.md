# Design: create-headchef

**Date:** 2026-02-24
**Status:** Approved
**Author:** Sercan Yusuf + Claude

## Summary

`create-headchef` is a Node.js + TypeScript CLI tool that scaffolds AI IDE configuration files for Claude Code, Cursor, Windsurf, and Google Antigravity in any project. It ships opinionated coding rules (SOLID, clean code, naming conventions) with framework-specific layers, plus starter agents and commands.

## Goals

1. One command to set up all four AI IDEs with correct file formats
2. Opinionated defaults based on proven rules from EventuallySolutions projects
3. Framework-specific rule layers (Flutter, Next.js, React, Python)
4. Starter agents for PR review and code review (Claude + Antigravity)
5. Skip existing configs safely, overwrite only with `--force`
6. Works with both npm and bun

## Non-Goals

- Plugin architecture (4 IDEs don't justify it)
- Remote template fetching
- Interactive prompts (flags-only interface)
- IDE-specific settings beyond rules/agents (no editor themes, keybindings)

## CLI Interface

```bash
# Default: generate all IDE configs with base rules
npx create-headchef

# Filter by IDE
npx create-headchef --only claude cursor
npx create-headchef --exclude antigravity

# Framework-specific rules layer
npx create-headchef --framework flutter
npx create-headchef --framework nextjs

# Options
npx create-headchef --force          # overwrite existing configs
npx create-headchef --dry-run        # preview files without writing
npx create-headchef --list           # list available IDEs & frameworks

# Global install alternative
npm install -g create-headchef
create-headchef --framework flutter
```

**IDE identifiers:** `claude`, `cursor`, `windsurf`, `antigravity`
**Framework identifiers:** `flutter`, `nextjs`, `react`, `python`, `general` (default)

## Generated File Structure

```
target-project/
├── CLAUDE.md                          # Claude Code project memory
├── GEMINI.md                          # Antigravity/Gemini CLI rules
├── .mcp.json                          # Claude MCP servers config
│
├── .claude/
│   ├── settings.json                  # Team-shared permissions & settings
│   ├── agents/
│   │   ├── pr-reviewer.md             # PR review agent
│   │   └── code-reviewer.md           # Code quality agent
│   └── commands/
│       └── review.md                  # /project:review slash command
│
├── .cursor/
│   ├── rules/
│   │   ├── general.mdc               # Base rules (alwaysApply: true)
│   │   └── {framework}.mdc           # Framework rules (glob-attached)
│   ├── mcp.json                       # Cursor MCP servers
│
├── .windsurf/
│   └── rules/
│       ├── general.md                 # Base rules (plain markdown)
│       └── {framework}.md             # Framework rules
│
├── .agent/                            # Google Antigravity
│   ├── rules/
│   │   └── coding-style.md            # Coding standards
│   ├── skills/
│   │   └── pr-reviewer/
│   │       └── SKILL.md               # PR review skill
│   └── workflows/
│       └── review.md                  # Review workflow
│
├── .cursorignore                      # Files invisible to Cursor
├── .cursorindexingignore              # Files excluded from Cursor indexing
├── .codeiumignore                     # Files excluded from Windsurf indexing
└── .gitignore.headchef                # Suggested .gitignore additions
```

## Rules Content Strategy

### Base Rules (applied to all frameworks)

Derived from EventuallySolutions General Rules.md:

- **Nomenclature:** PascalCase classes, camelCase variables/functions, underscores_case files
- **Functions:** < 20 instructions, single purpose, verb-first naming, early returns
- **SOLID principles:** Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **Design patterns:** Repository, Factory, Strategy, Observer
- **Testing:** Arrange-Act-Assert, test doubles, unit + acceptance tests
- **Security:** No hardcoded secrets, env vars for config, input validation
- **Data:** Prefer immutability, readonly, as const, composite types over primitives
- **Code style:** English for code, no blank lines within functions, one export per file

### Framework Layers

Each framework adds domain-specific rules on top of the base:

| Framework | Key Additions |
|-----------|--------------|
| `flutter` | Widget patterns, Dart conventions, state management (BLoC/Cubit/Stacked), Firebase integration, const constructors, dispose |
| `nextjs` | React Server Components, App Router, TypeScript strict, Zod validation, server actions, metadata API |
| `react` | Functional components, hooks patterns, state management, JSX conventions |
| `python` | PEP 8, type hints, pytest, FastAPI patterns, virtual environments, dataclasses |
| `general` | Base rules only (default) |

### Format Adaptation Per IDE

The same conceptual rules are formatted differently per IDE:

| IDE | Format | Key Differences |
|-----|--------|----------------|
| Claude | Markdown (`CLAUDE.md`) | Sections: Tech Stack, Conventions, Commands, Architecture |
| Cursor | `.mdc` with YAML frontmatter | `alwaysApply: true` for base, `globs` for framework-specific |
| Windsurf | Plain `.md` | No frontmatter, plain markdown sections |
| Antigravity | `.md` in `.agent/rules/` + `GEMINI.md` | Root GEMINI.md for global, rules dir for detailed |

## Starter Agents

Based on fieldservice-app agents, adapted per IDE's agent system:

### PR Reviewer Agent

- **Claude:** `.claude/agents/pr-reviewer.md` with YAML frontmatter (name, description, model: inherit)
- **Antigravity:** `.agent/skills/pr-reviewer/SKILL.md` with YAML frontmatter (name, description)
- **Cursor/Windsurf:** No native agent system; equivalent guidance baked into rules

### Code Reviewer Agent

- **Claude:** `.claude/agents/code-reviewer.md`
- **Antigravity:** `.agent/skills/code-reviewer/SKILL.md`

### Review Command/Workflow

- **Claude:** `.claude/commands/review.md` (invoked via `/project:review`)
- **Antigravity:** `.agent/workflows/review.md` (invoked via `/review`)

## Ignore Files

Common patterns across all ignore files:

```
node_modules/
.env
.env.*
dist/
build/
*.min.js
coverage/
.DS_Store
```

## MCP Server Config

`.mcp.json` (Claude) and `.cursor/mcp.json` (Cursor) get placeholder configs:

```json
{
  "mcpServers": {}
}
```

Empty by default — users add their own servers. No secrets shipped.

## Collision Detection

On execution, the tool:

1. Scans target directory for existing IDE config files/directories
2. For each file that would be generated:
   - If exists and `--force` not set: skip with warning
   - If exists and `--force` set: overwrite
   - If not exists: create
3. Output summary of skipped/generated files

Example output:
```
🍸 headchef - Mixing your AI IDE configs...

⚠ Existing configs detected (skipped):
  ├── .claude/
  └── CLAUDE.md

✓ Generated:
  ├── .cursor/rules/general.mdc
  ├── .cursor/rules/flutter.mdc
  ├── .windsurf/rules/general.md
  ├── .windsurf/rules/flutter.md
  ├── .agent/skills/pr-reviewer/SKILL.md
  ├── GEMINI.md
  ├── .cursorignore
  ├── .cursorindexingignore
  └── .codeiumignore

Use --force to overwrite existing files.
```

## Project Structure

```
create-headchef/
├── src/
│   ├── index.ts                       # Entry point + CLI parsing (commander)
│   ├── generator.ts                   # Orchestrates file generation
│   ├── detector.ts                    # Detects existing configs
│   ├── types.ts                       # Shared types (IdeType, Framework, GeneratorOptions)
│   ├── recipes/                       # One recipe per IDE
│   │   ├── recipe.interface.ts        # Recipe contract
│   │   ├── claude.recipe.ts
│   │   ├── cursor.recipe.ts
│   │   ├── windsurf.recipe.ts
│   │   └── antigravity.recipe.ts
│   └── templates/                     # Template content as TypeScript template literals
│       ├── shared/
│       │   ├── base-rules.ts          # Base SOLID/clean code rules
│       │   ├── flutter-rules.ts       # Flutter framework rules
│       │   ├── nextjs-rules.ts        # Next.js framework rules
│       │   ├── react-rules.ts         # React framework rules
│       │   └── python-rules.ts        # Python framework rules
│       ├── claude/
│       │   ├── claude-md.ts           # CLAUDE.md template
│       │   ├── settings.ts            # .claude/settings.json template
│       │   ├── agents.ts              # Agent file templates
│       │   └── commands.ts            # Command file templates
│       ├── cursor/
│       │   ├── general-mdc.ts         # general.mdc template
│       │   ├── mcp-json.ts            # mcp.json template
│       │   └── ignore-files.ts        # .cursorignore templates
│       ├── windsurf/
│       │   ├── general-md.ts          # general.md template
│       │   └── ignore-file.ts         # .codeiumignore template
│       └── antigravity/
│           ├── gemini-md.ts           # GEMINI.md template
│           ├── rules.ts               # .agent/rules/ templates
│           ├── skills.ts              # SKILL.md templates
│           └── workflows.ts           # Workflow templates
├── tests/
│   ├── generator.test.ts
│   ├── detector.test.ts
│   └── recipes/
│       ├── claude.recipe.test.ts
│       ├── cursor.recipe.test.ts
│       ├── windsurf.recipe.test.ts
│       └── antigravity.recipe.test.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── CLAUDE.md
└── README.md
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `commander` | CLI argument parsing |
| `chalk` | Terminal colors |
| `fs-extra` | File system operations |
| `vitest` | Testing (dev) |
| `typescript` | Build (dev) |
| `tsup` | Bundling (dev) |

## Package Configuration

```json
{
  "name": "create-headchef",
  "version": "0.1.0",
  "bin": {
    "create-headchef": "./dist/index.js"
  },
  "type": "module",
  "engines": {
    "node": ">=18"
  }
}
```

Supports both `npx create-headchef` and `npm install -g create-headchef` + `create-headchef`.

## .gitignore Additions

The `.gitignore.headchef` file suggests lines to add to `.gitignore`:

```
# AI IDE local settings (never commit)
.claude/settings.local.json
.claude/CLAUDE.local.md
```

## Future Considerations (Not in v1)

- `headchef update` command to update existing configs to latest templates
- `headchef add claude` to add a single IDE to existing project
- Custom template directory (`--templates ./my-templates`)
- Plugin system if IDE count exceeds 6+
- Config file (`.headchefrc`) for project defaults
