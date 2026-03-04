export function generateChecklistMd(projectName: string): string {
  const date = new Date().toISOString().split('T')[0];
  return `# ${projectName} — Checklist

> Track tasks, progress, and priorities.

---

## In Progress

- [ ] Initial project setup

## Up Next

- [ ] Define architecture
- [ ] Set up CI/CD

## Done

- [x] Scaffolded AI IDE configs (${date})

---

## Notes

Use this file to track what needs doing. Update it as tasks move through stages.
`;
}
