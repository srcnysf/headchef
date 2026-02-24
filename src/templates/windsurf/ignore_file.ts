export function generateCodeiumIgnore(): string {
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
