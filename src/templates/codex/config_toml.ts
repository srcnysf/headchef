export function generateCodexConfig(): string {
  return `# Codex CLI — Project Configuration
# See: https://developers.openai.com/codex/config-basic/

model = "o4-mini"

[history]
persistence = true
max_entries = 1000

[project_doc]
max_bytes = 65536
fallback_filenames = ["AGENTS.md", "README.md"]
`;
}
