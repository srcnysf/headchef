export function generateReviewCommand(): string {
  return `---
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
description: Run a code review on recent changes
---

Review the recent changes in this project:
1. Run \`git diff HEAD~1\` to see recent changes
2. Analyze code quality, patterns, and potential issues
3. Report findings organized by severity
`;
}
