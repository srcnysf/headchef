export function generateReviewWorkflow(): string {
  return `# Code Review Workflow

1. Run tests: \`npm test\`
2. Check types: \`npm run lint\`
3. Review recent changes: \`git diff HEAD~1\`
4. Analyze code quality and patterns
5. Report findings organized by severity
`;
}
