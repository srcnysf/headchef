export function generateOverviewMd(projectName: string): string {
  const date = new Date().toISOString().split('T')[0];
  return `# ${projectName}

> Brief description of the project

---

## Overview

| Field | Value |
|-------|-------|
| **Status** | Active |
| **Type** | Flutter / Web / API |
| **Start Date** | ${date} |
| **Tech Stack** | |

---

## Goals

- [ ] Goal 1

---

## Links

| Resource | Link |
|----------|------|
| **GitHub** | |
| **Figma** | |
| **Live App** | |

---

## Architecture

\`\`\`
${projectName}/
├──
└──
\`\`\`

---

## Notes

### Key Decisions

### Known Issues

---
`;
}
