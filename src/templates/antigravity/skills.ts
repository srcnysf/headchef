export function generatePrReviewerSkill(): string {
  return `---
name: pr-reviewer
description: Use when reviewing pull requests. Performs comprehensive code review including pattern consistency, architecture adherence, and bug detection.
---

# PR Review Skill

## Instructions
1. Analyze all changes in the current PR
2. Check pattern consistency with existing codebase
3. Review code quality (SOLID, DRY, clean code)
4. Detect potential bugs and security issues
5. Verify test coverage

## Output
Provide structured review with Critical/Major/Minor categories.
`;
}

export function generateCodeReviewerSkill(): string {
  return `---
name: code-reviewer
description: Use when reviewing code quality. Checks clean code principles, SOLID adherence, and best practices.
---

# Code Review Skill

## Instructions
1. Check function size (< 20 lines)
2. Verify naming conventions
3. Validate SOLID principles
4. Review error handling
5. Check for security issues

## Checklist
- [ ] Functions small and focused
- [ ] Clear naming conventions
- [ ] SOLID principles followed
- [ ] Proper error handling
- [ ] No hardcoded secrets
- [ ] Types properly declared
`;
}
