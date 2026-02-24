export function generateClaudeSettings(): string {
  const settings = {
    permissions: {
      allow: [],
    },
  };
  return JSON.stringify(settings, null, 2);
}
