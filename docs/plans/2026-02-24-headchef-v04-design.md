# headchef v0.4 Design — Settings Cleanup, RC File, Overwrite Prompt

## Context

v0.3 generates some JSON settings files that should not be overwritten by a scaffolding tool (users configure these themselves). Research also revealed inaccuracies in Codex and Antigravity recipes. Users want IDE selections remembered across projects and interactive overwrite control for existing files.

## Changes

### 1. Remove JSON Settings Files

Remove from generation (user-configured, not project rules):
- `.claude/settings.json` — from Claude recipe
- `.mcp.json` — from Claude recipe
- `.cursor/mcp.json` — from Cursor recipe

Keep all ignore files (`.cursorignore`, `.cursorindexingignore`, `.codeiumignore`).

Claude recipe: 9 → 7 files. Cursor recipe: 4-5 → 3-4 files.

### 2. Fix OpenAI Codex Recipe

Replace `.codex/instructions.md` with `.codex/config.toml` (official Codex project config).

Config sets `project_doc_fallback_filenames` to include `AGENTS.md` so Codex reads the standard AGENTS.md file natively.

### 3. Fix Antigravity Recipe

- Merge `.agent/rules/coding-style.md` content into `GEMINI.md` (official project context file)
- Remove `.agent/rules/` directory (not in official docs)
- Remove `.agent/workflows/review.md` (not in official docs)
- Keep `GEMINI.md` + `.agent/skills/` (5 SKILL.md files — verified format)
- Antigravity recipe: 8 → 6 files

### 4. ~/.headchefrc for Remembering Selections

JSON file at `~/.headchefrc`:
```json
{
  "ides": ["claude", "codex", "cursor", "windsurf", "antigravity"],
  "framework": "flutter"
}
```

Behavior:
- After interactive prompt completes, save selections to `~/.headchefrc`
- On next run, pre-select IDEs from RC file (not all IDEs)
- No RC file = all IDEs pre-selected (first-run default)
- `--no-interactive` ignores RC file, uses all IDEs
- New file: `src/rc.ts` with `loadRcConfig()` and `saveRcConfig()`

### 5. Interactive Overwrite Prompt

When conflicts detected in interactive mode:
- Show checkbox list of conflicting files (all unchecked by default)
- User checks files to overwrite, presses enter
- Unchecked files are skipped
- `--force` bypasses prompt, overwrites all
- `--no-interactive` skips prompt, skips all conflicts

New function: `promptOverwriteSelection()` in `src/prompt.ts`.

Generator refactored: returns conflict list separately, accepts approved overwrites list.

### 6. Files Changed

| File | Action |
|------|--------|
| `src/recipes/claude.recipe.ts` | Remove settings.json and .mcp.json |
| `src/recipes/cursor.recipe.ts` | Remove mcp.json |
| `src/templates/claude/settings.ts` | Delete |
| `src/templates/cursor/mcp_json.ts` | Delete |
| `src/recipes/codex.recipe.ts` | Replace instructions.md with config.toml |
| `src/templates/codex/instructions.ts` | Rename/rewrite to config_toml.ts |
| `src/recipes/antigravity.recipe.ts` | Remove rules + workflows, merge into GEMINI.md |
| `src/templates/antigravity/gemini_md.ts` | Expand with coding-style content |
| `src/templates/antigravity/rules.ts` | Delete |
| `src/templates/antigravity/workflows.ts` | Delete |
| `src/rc.ts` | New — loadRcConfig, saveRcConfig |
| `src/prompt.ts` | Add promptOverwriteSelection |
| `src/generator.ts` | Refactor to return conflicts, accept overwrites |
| `src/commands/shared.ts` | Integrate RC load/save + overwrite prompt |
| `src/index.ts` | No changes needed |
| `package.json` | Bump to 0.4.0 |
| `README.md` | Update file listings, add RC file docs |
| `CLAUDE.md` | Update |
| Tests | Update for removed files, add RC + overwrite tests |
