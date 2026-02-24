export function generateCursorIgnore(): string {
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

export function generateCursorIndexingIgnore(): string {
  return `dist/
build/
coverage/
*.generated.*
*.min.js
`;
}
