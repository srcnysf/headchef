export function generateChangelogMd(projectName: string): string {
  const date = new Date().toISOString().split('T')[0];
  return `# ${projectName} — Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Added
- Initial project scaffolding with headchef (${date})

---

## Format

### Added
New features.

### Changed
Changes in existing functionality.

### Fixed
Bug fixes.

### Removed
Removed features.
`;
}
