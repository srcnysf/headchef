# headchef

Scaffold opinionated AI IDE configuration files for **10 AI code editors** in one command. Stop copy-pasting rules between projects — let headchef cook your perfect setup.

```bash
npx headchef create my-project
```

## Why?

Every AI-powered IDE uses its own config format. When you start a new project, you need to manually create `.claude/`, `.cursor/rules/`, `.windsurf/rules/`, `.agent/`, and more — each with its own syntax, frontmatter, and file structure.

**headchef** generates all of them at once with opinionated coding standards (SOLID principles, clean code, naming conventions, security) and rich agent/skill templates.

## Supported IDEs

| IDE | Config Location | Key |
|-----|----------------|-----|
| Claude Code | `.claude/`, `CLAUDE.md` | `claude` |
| OpenAI Codex | `.codex/` | `codex` |
| Cursor | `.cursor/rules/` | `cursor` |
| Windsurf | `.windsurf/rules/` | `windsurf` |
| Google Antigravity | `.agent/`, `GEMINI.md` | `antigravity` |
| GitHub Copilot | `.github/copilot-instructions.md` | `copilot` |
| Cline / Roo Code | `.clinerules`, `.roo/rules/` | `cline` |
| JetBrains AI | `.aiassistant/rules/` | `jetbrains` |
| Augment Code | `.augment/rules/` | `augment` |
| AGENTS.md | `AGENTS.md` (universal standard) | `agentsmd` |

## Quick Start

### Create a new project

```bash
npx headchef create my-project
```

Creates the `my-project/` directory and scaffolds all AI IDE configs into it. An interactive checkbox prompt lets you toggle individual IDEs on/off with **space**, then press **enter** to confirm.

### Initialize an existing project

```bash
cd my-project
npx headchef init
```

Scaffolds AI IDE configs into the current directory. Same interactive prompt as `create`.

### Non-interactive mode

```bash
npx headchef create my-project --no-interactive
npx headchef init --no-interactive
```

Generates configs for all IDEs with the `general` framework layer. Ideal for CI/CD pipelines and scripting.

## Installation

### Run directly with npx (no install)

```bash
npx headchef create my-project
```

### Install globally

```bash
npm install -g headchef
headchef create my-project
```

## Commands

### `headchef create <projectname>`

Create a new project directory and scaffold AI IDE configs into it.

```bash
headchef create my-app
headchef create my-app --framework flutter
headchef create my-app --only claude cursor
headchef create my-app --no-interactive
```

| Flag | Description | Example |
|------|-------------|---------|
| `--only <ides...>` | Only generate configs for specified IDEs | `--only claude cursor` |
| `--exclude <ides...>` | Exclude specified IDEs from generation | `--exclude jetbrains augment` |
| `--framework <name>` | Apply a framework-specific rules layer | `--framework flutter` |
| `--force` | Overwrite existing config files | `--force` |
| `--dry-run` | Preview which files would be created (no writes) | `--dry-run` |
| `--no-interactive` | Skip the interactive prompt (use all IDEs) | `--no-interactive` |

### `headchef init`

Scaffold AI IDE configs into the current directory (or a target directory).

```bash
headchef init
headchef init --framework nextjs
headchef init --only claude cursor windsurf
headchef init --target ./other-project
```

| Flag | Description | Example |
|------|-------------|---------|
| `--only <ides...>` | Only generate configs for specified IDEs | `--only claude cursor` |
| `--exclude <ides...>` | Exclude specified IDEs from generation | `--exclude jetbrains augment` |
| `--framework <name>` | Apply a framework-specific rules layer | `--framework flutter` |
| `--force` | Overwrite existing config files | `--force` |
| `--dry-run` | Preview which files would be created (no writes) | `--dry-run` |
| `--no-interactive` | Skip the interactive prompt (use all IDEs) | `--no-interactive` |
| `--target <dir>` | Target directory (defaults to current) | `--target ./my-project` |

### `headchef list`

List all available IDEs and frameworks.

```bash
headchef list
```

### Global Flags

| Flag | Description |
|------|-------------|
| `-V, --version` | Show version number |
| `-h, --help` | Show help |

## Usage Examples

### Create a Flutter project with all AI configs

```bash
npx headchef create my-flutter-app --framework flutter
```

### Initialize with only Claude and Cursor

```bash
npx headchef init --only claude cursor
```

### Create a project excluding JetBrains and Augment

```bash
npx headchef create my-app --exclude jetbrains augment
```

### Preview without writing files

```bash
npx headchef init --dry-run
```

### Force overwrite existing configs

```bash
npx headchef init --force
```

### Non-interactive with Next.js framework

```bash
npx headchef create my-nextjs-app --framework nextjs --no-interactive
```

## Framework Layers

Framework layers add technology-specific rules on top of the base coding standards.

| Framework | Key | Includes |
|-----------|-----|----------|
| General | `general` | SOLID, clean code, naming, testing, security |
| Flutter | `flutter` | Dart conventions, BLoC, Freezed, GetIt, Firebase |
| Next.js | `nextjs` | RSC, App Router, Shadcn UI, Zod, Firebase |
| React | `react` | Hooks, functional components, Testing Library |
| Python | `python` | PEP 8, type hints, pytest, FastAPI, Poetry |

## Generated Files

### Claude Code

```
CLAUDE.md
.claude/agents/code-reviewer.md
.claude/agents/test-writer.md
.claude/agents/bug-debugger.md
.claude/agents/architecture-planner.md
.claude/agents/docs-keeper.md
.claude/commands/review.md
```

### OpenAI Codex

```
.codex/config.toml
```

### Cursor

```
.cursor/rules/general.mdc
.cursor/rules/{framework}.mdc      # when framework != general
.cursorignore
.cursorindexingignore
```

### Windsurf

```
.windsurf/rules/general.md
.windsurf/rules/{framework}.md     # when framework != general
.codeiumignore
```

### Google Antigravity

```
GEMINI.md
.agent/skills/code-reviewer/SKILL.md
.agent/skills/test-writer/SKILL.md
.agent/skills/bug-debugger/SKILL.md
.agent/skills/architecture-planner/SKILL.md
.agent/skills/docs-keeper/SKILL.md
```

### GitHub Copilot

```
.github/copilot-instructions.md
```

### Cline / Roo Code

```
.clinerules
.roo/rules/general.md
.roo/rules/{framework}.md         # when framework != general
```

### JetBrains AI

```
.aiassistant/rules/general.md
```

### Augment Code

```
.augment/rules/general.md
```

### AGENTS.md

```
AGENTS.md
```

### Always Generated

```
.gitignore.headchef               # IDE config gitignore additions
```

## Agents & Skills

headchef includes 5 rich agent templates for IDEs that support them (Claude Code and Google Antigravity):

| Agent | Purpose |
|-------|---------|
| **Code Reviewer** | Reviews code for clean code, SOLID principles, and security best practices |
| **Test Writer** | Writes comprehensive, maintainable tests that validate behavior and prevent regressions |
| **Bug Debugger** | Performs systematic root cause analysis and reliable bug resolution |
| **Architecture Planner** | Designs scalable, maintainable systems using proven patterns and principles |
| **Docs Keeper** | Keeps project documentation accurate, complete, and accessible |

## Collision Detection

By default, headchef **skips** files that already exist in the target directory and shows a warning:

```
⚠ Existing configs detected (skipped):
  ├── CLAUDE.md
  ├── .cursor/rules/general.mdc

✓ Generated:
  ├── .windsurf/rules/general.md
  ├── GEMINI.md

Use --force to overwrite existing files.
```

Use `--force` to overwrite all existing config files.

In interactive mode, headchef shows a checkbox list of conflicting files so you can choose which ones to overwrite (all unchecked by default).

## Preferences (~/.headchefrc)

headchef remembers your IDE and framework selections in `~/.headchefrc`. On your next run, the interactive prompt pre-selects your previous choices instead of all IDEs.

```json
{
  "ides": ["claude", "cursor", "windsurf", "antigravity"],
  "framework": "flutter"
}
```

- Saved automatically after each interactive session
- First run (no RC file): all IDEs pre-selected
- `--no-interactive` ignores the RC file
- Delete `~/.headchefrc` to reset to defaults

## What's Inside the Rules?

The generated rules enforce opinionated coding standards:

- **Naming** — PascalCase for classes, camelCase for variables/functions, underscores for files
- **Functions** — Short (< 20 lines), single purpose, verb-first names, early returns
- **Data** — Prefer immutability, use `readonly` and `as const`, avoid primitives
- **Classes** — Follow SOLID, prefer composition over inheritance, < 200 lines
- **Testing** — Arrange-Act-Assert, clear variable names, test doubles
- **Security** — No hardcoded secrets, validate inputs, HTTPS only
- **Performance** — Profile before optimizing, cache expensive ops, lazy loading

## Tech Stack

- **Node.js 18+** with TypeScript and ESM modules
- **commander** for CLI argument parsing with subcommands
- **@inquirer/prompts** for interactive checkbox/select UI
- **chalk** for terminal colors
- **fs-extra** for file operations
- **vitest** for testing (241 tests)
- **tsup** for bundling

## Development

```bash
git clone https://github.com/EventuallySolutions/headchef.git
cd headchef
npm install
npm run dev       # watch mode build
npm test          # run tests
npm run build     # production build
npm run lint      # typecheck
```

## License

MIT
