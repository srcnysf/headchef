export function generateCursorMcpJson(): string {
  const config = {
    mcpServers: {},
  };
  return JSON.stringify(config, null, 2);
}
