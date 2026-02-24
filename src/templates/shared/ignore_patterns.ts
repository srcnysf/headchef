export function getCommonIgnorePatterns(): string {
  return `node_modules/
.env
.env.*
dist/
build/
*.min.js
coverage/
.DS_Store
`;
}

export function getGitignoreAdditions(): string {
  return `# AI IDE local settings (never commit)
.claude/settings.local.json
.claude/CLAUDE.local.md
`;
}
