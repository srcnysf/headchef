# headchef

CLI tool that scaffolds AI IDE configuration files for 10 code editors (Claude Code, OpenAI Codex, Cursor, Windsurf, Google Antigravity, GitHub Copilot, Cline, JetBrains AI, Augment Code, AGENTS.md).

## Tech Stack
- Node.js 18+, TypeScript, ESM modules
- commander (CLI with subcommands), chalk (colors), fs-extra (file ops)
- @inquirer/prompts (interactive checkbox/select UI)
- vitest (testing), tsup (bundling)

## Commands
- `npm run build` - Build with tsup
- `npm run dev` - Watch mode build
- `npm test` - Run vitest
- `npm run lint` - TypeScript check

## CLI Subcommands
- `headchef create <projectname>` - Create new project dir and scaffold configs
- `headchef init` - Scaffold configs into current directory
- `headchef list` - List available IDEs and frameworks

## Architecture
- `src/index.ts` - CLI entry point (commander subcommands: create, init, list)
- `src/commands/shared.ts` - Shared orchestration (executeGeneration, resolveIdes, printResult, attachSharedOptions)
- `src/types.ts` - Shared types (IdeType, Framework, GeneratorOptions, FileEntry)
- `src/prompt.ts` - Interactive IDE/framework selection prompts
- `src/detector.ts` - Detects existing IDE config files
- `src/generator.ts` - Orchestrates recipe execution and file writing
- `src/recipes/` - One Recipe per IDE (10 total)
- `src/templates/` - Template content as template literal functions
- `src/templates/agents/` - 5 shared agent templates
- `src/templates/shared/` - Base rules, framework rules, ignore patterns

## Conventions
- One export per file
- camelCase for functions/variables, PascalCase for types/interfaces
- underscores_case for file names
- Verb-first function names
- < 20 lines per function
- Arrange-Act-Assert for tests
