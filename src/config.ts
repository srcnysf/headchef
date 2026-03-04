import path from 'path';
import type { RcConfig } from './rc.js';

export function resolveBrainPath(rc: RcConfig | null): string | null {
  return rc?.brainPath ?? null;
}

export function resolveProjectsRoot(rc: RcConfig | null): string {
  return rc?.projectsRoot ?? process.cwd();
}

export function resolveDefaultIde(rc: RcConfig | null): string {
  return rc?.defaultIde ?? 'cursor';
}

export function resolveProjectPath(name: string, projectsRoot: string): string {
  if (path.isAbsolute(name) || name.startsWith('.') || name.includes('/')) {
    return path.resolve(name);
  }
  return path.join(projectsRoot, name);
}
