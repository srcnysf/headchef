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
