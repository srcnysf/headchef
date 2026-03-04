# headchef

Scaffold AI IDE configs, agents, and skills for **10 code editors** in one command.

```bash
npx headchef create my-project
```

## Supported IDEs

| IDE | Key | Config |
|-----|-----|--------|
| Claude Code | `claude` | `CLAUDE.md`, `.claude/agents/`, `.claude/commands/` |
| OpenAI Codex | `codex` | `.codex/config.toml` |
| Cursor | `cursor` | `.cursor/rules/` |
| Windsurf | `windsurf` | `.windsurf/rules/` |
| Google Antigravity | `antigravity` | `GEMINI.md`, `.agent/skills/` |
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

### `headchef create [name]`

Create a new project directory with AI IDE configs, agents, and project scaffolding.

```bash
headchef create my-app
headchef create my-app --framework flutter
headchef create my-app --only claude cursor
headchef create --no-brain              # skip brain integration
```

Interactive mode prompts for project name, IDE selection, framework, agent categories, and Obsidian brain path.

### `headchef init`

Add AI IDE configs to an existing project.

```bash
headchef init
headchef init --framework nextjs
headchef init --only claude cursor windsurf
headchef init --target ./other-project
```

### `headchef list`

Show all available IDEs, frameworks, and agent categories with counts.

## Options

| Flag | Description |
|------|-------------|
| `--only <ides...>` | Generate only for specified IDEs |
| `--exclude <ides...>` | Skip specified IDEs |
| `--framework <name>` | Apply framework-specific rules |
| `--force` | Overwrite existing files |
| `--dry-run` | Preview without writing |
| `--no-interactive` | Skip prompts, use all IDEs |
| `--no-brain` | Skip Obsidian brain integration |
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

headchef ships **55+ agents** across 10 categories. Select which categories to include during setup.

| Category | Agents | Examples |
|----------|--------|----------|
| Core | 6 | Orchestrator, Code Reviewer, Test Writer, Bug Debugger, Architecture Planner, Docs Keeper |
| Engineering | 7 | Frontend Developer, Backend Architect, AI Engineer, DevOps Automator, Mobile App Builder |
| Design | 7 | UI Designer, UX Researcher, Brand Guardian, Visual Storyteller |
| Marketing | 8 | Growth Hacker, Content Creator, TikTok Strategist, App Store Optimizer |
| Product | 3 | Sprint Prioritizer, Trend Researcher, Feedback Synthesizer |
| Project Management | 5 | Studio Producer, Project Shepherd, Senior Project Manager |
| Testing | 7 | Evidence Collector, Reality Checker, Performance Benchmarker, API Tester |
| Support | 6 | Support Responder, Analytics Reporter, Legal Compliance Checker |
| Spatial Computing | 6 | XR Developer, Vision Pro Specialist, WebXR Engineer |
| Specialized | 6 | Data Analytics Reporter, LSP Engineer, Agents Orchestrator |

Core agents are always included. Other categories are opt-in via interactive prompt.

IDEs that support discrete agent files (Claude Code, Antigravity) get one file per agent. Other IDEs get a condensed agent summary in their rules file.

## Skills

15 built-in skills are generated as slash commands for Claude Code (`.claude/commands/`):

code-review, commit-message, unit-test, regex-generator, security-audit, accessibility-audit, architecture-design, code-converter, prompt-enhancer, diagram-generator, tech-review, sql-terminal, logic-builder, data-visualizer, domain-name-generator

## Brain Integration

headchef optionally integrates with an [Obsidian](https://obsidian.md) vault for project documentation:

- Creates a project directory in `{brainPath}/Projects/Active/{project}/`
- Generates an `Overview.md` in the brain
- Symlinks `docs/` from the project to the brain directory
- Creates `docs/plans/` for architecture plans
- Generates `CHECKLIST.md` and `CHANGELOG.md`

Brain path is saved to `~/.headchefrc` after first entry. Use `--no-brain` to skip.

## Generated File Structure

A typical project created with `headchef create my-app` (Claude + core agents):

```
my-app/
  CLAUDE.md              # Rules + coding standards + available agents
  CHECKLIST.md           # Task tracking
  CHANGELOG.md           # Change history
  docs/ -> brain/        # Symlink to Obsidian vault (if configured)
    plans/               # Architecture plans
  .claude/
    agents/              # One .md per agent
      headchef-orchestrator.md
      code-reviewer.md
      test-writer.md
      bug-debugger.md
      architecture-planner.md
      docs-keeper.md
    commands/            # One .md per skill
      code-review.md
      commit-message.md
      ...
```

## Collision Handling

By default, existing files are **skipped**. In interactive mode, a checkbox prompt lets you pick which files to overwrite. Use `--force` to overwrite everything.

## Preferences

headchef saves your selections to `~/.headchefrc` so the next run pre-selects your previous choices.

```json
{
  "ides": ["claude", "cursor", "windsurf"],
  "framework": "flutter",
  "agentCategories": ["core", "engineering", "testing"],
  "brainPath": "/path/to/obsidian-vault"
}
```

Delete `~/.headchefrc` to reset. `--no-interactive` ignores it.

## Development

```bash
git clone https://github.com/EventuallySolutions/headchef.git
cd headchef
npm install
npm run dev       # watch mode
npm test          # 207 tests
npm run build     # production build
```

## License

MIT
