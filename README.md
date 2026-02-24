# headchef

Scaffold AI IDE configs for **10 code editors** in one command.

```bash
npx headchef create my-project
```

## Supported IDEs

| IDE | Key | Config |
|-----|-----|--------|
| Claude Code | `claude` | `CLAUDE.md`, `.claude/` |
| OpenAI Codex | `codex` | `.codex/config.toml` |
| Cursor | `cursor` | `.cursor/rules/` |
| Windsurf | `windsurf` | `.windsurf/rules/` |
| Google Antigravity | `antigravity` | `GEMINI.md`, `.agent/` |
| GitHub Copilot | `copilot` | `.github/copilot-instructions.md` |
| Cline / Roo Code | `cline` | `.clinerules`, `.roo/rules/` |
| JetBrains AI | `jetbrains` | `.aiassistant/rules/` |
| Augment Code | `augment` | `.augment/rules/` |
| AGENTS.md | `agentsmd` | `AGENTS.md` |

## Install

```bash
# Run directly (no install)
npx headchef create my-project

# Or install globally
npm install -g headchef
```

## Commands

### `headchef create <name>`

Create a new project directory with AI IDE configs.

```bash
headchef create my-app
headchef create my-app --framework flutter
headchef create my-app --only claude cursor
```

### `headchef init`

Add AI IDE configs to an existing project.

```bash
headchef init
headchef init --framework nextjs
headchef init --only claude cursor windsurf
headchef init --target ./other-project
```

### `headchef list`

Show all available IDEs and frameworks.

## Options

| Flag | Description |
|------|-------------|
| `--only <ides...>` | Generate only for specified IDEs |
| `--exclude <ides...>` | Skip specified IDEs |
| `--framework <name>` | Apply framework-specific rules |
| `--force` | Overwrite existing files |
| `--dry-run` | Preview without writing |
| `--no-interactive` | Skip prompts, use all IDEs |
| `--target <dir>` | Target directory (`init` only) |

## Frameworks

| Framework | Key | Highlights |
|-----------|-----|------------|
| General | `general` | SOLID, clean code, naming, testing, security |
| Flutter | `flutter` | Dart, BLoC, Freezed, GetIt, Firebase |
| Next.js | `nextjs` | RSC, App Router, Shadcn UI, Zod |
| React | `react` | Hooks, functional components, Testing Library |
| Python | `python` | PEP 8, type hints, pytest, FastAPI |

## Agents

IDEs that support agents (Claude Code, Antigravity) get 5 starter templates:

| Agent | Purpose |
|-------|---------|
| Code Reviewer | Clean code, SOLID, security review |
| Test Writer | Comprehensive tests with best practices |
| Bug Debugger | Systematic root cause analysis |
| Architecture Planner | Scalable system design |
| Docs Keeper | Documentation accuracy and completeness |

## Collision Handling

By default, existing files are **skipped**. In interactive mode, a checkbox prompt lets you pick which files to overwrite. Use `--force` to overwrite everything.

## Preferences

headchef saves your selections to `~/.headchefrc` so the next run pre-selects your previous choices.

```json
{
  "ides": ["claude", "cursor", "windsurf"],
  "framework": "flutter"
}
```

Delete `~/.headchefrc` to reset. `--no-interactive` ignores it.

## Development

```bash
git clone https://github.com/EventuallySolutions/headchef.git
cd headchef
npm install
npm run dev       # watch mode
npm test          # 241 tests
npm run build     # production build
```

## License

MIT
